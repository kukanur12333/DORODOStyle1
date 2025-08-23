/*
# [Feature] Daily Login Streak Rewards
This migration introduces a daily login rewards system to encourage user engagement. It adds the necessary columns to the profiles table to track login streaks and creates a serverless function to handle the logic of updating streaks and awarding points securely.

## Query Description:
This script will:
1.  Add `last_login_at` and `login_streak` columns to your existing `profiles` table. It assumes you have a `profiles` table with a `loyalty_points` column. If not, you may need to adjust the script.
2.  Create a new database function `handle_login()` that automatically calculates login streaks and awards points. This function is designed to be called from your application frontend every time a user logs in or starts a new session.
3.  There is no risk of data loss, as this script only adds new columns and a new function. However, backing up your database before applying any migration is always a best practice.

## Metadata:
- Schema-Category: "Structural"
- Impact-Level: "Low"
- Requires-Backup: false
- Reversible: true (Columns and function can be dropped)

## Structure Details:
- **Table Modified:** `public.profiles`
  - **Column Added:** `last_login_at` (TIMESTAMPTZ) - Stores the timestamp of the user's last login.
  - **Column Added:** `login_streak` (INT) - Tracks the number of consecutive daily logins.
- **Function Created:** `public.handle_login()` - The core logic for the rewards system.

## Security Implications:
- RLS Status: Assumed to be Enabled on `profiles`.
- Policy Changes: No direct policy changes. The `handle_login` function uses `SECURITY DEFINER` to safely update user profiles.
- Auth Requirements: The function can only be executed by authenticated users.

## Performance Impact:
- Indexes: None added. The function operates on the currently authenticated user, which is a fast operation.
- Triggers: None.
- Estimated Impact: Negligible performance impact. The function is lightweight and runs once per user session.
*/

-- 1. Add columns to the profiles table
-- This assumes you have a 'profiles' table. If not, you'll need to create it first.
-- It also assumes a 'loyalty_points' column exists.
alter table public.profiles
add column if not exists last_login_at timestamptz,
add column if not exists login_streak integer not null default 0;


-- 2. Create the function to handle login streaks and rewards
create or replace function public.handle_login()
returns table (points_awarded int, new_streak int)
language plpgsql
security definer
set search_path = public
as $$
declare
  last_login timestamptz;
  current_streak int;
  user_id uuid;
  points_to_add int := 0;
  streak_rewards int[] := array[10, 20, 30, 40, 50, 60, 100]; -- Points for day 1, 2, 3... 7+
begin
  -- Get the current user's ID
  user_id := auth.uid();

  -- Get the user's last login and current streak
  select
    p.last_login_at,
    p.login_streak
  into
    last_login,
    current_streak
  from public.profiles p
  where p.id = user_id;

  -- Logic to update streak
  if last_login is null or now()::date - last_login::date > 1 then
    -- First login ever or streak broken
    current_streak := 1;
  elsif now()::date - last_login::date = 1 then
    -- Consecutive day login
    current_streak := current_streak + 1;
  else
    -- Same day login, do not increment streak or award points
    return query select 0, current_streak;
    return;
  end if;

  -- Calculate points to award based on the new streak
  -- Day 1: 10, Day 2: 20, ..., Day 7 (and beyond): 100
  points_to_add := streak_rewards[least(current_streak, array_length(streak_rewards, 1))];

  -- Update the user's profile
  update public.profiles
  set
    last_login_at = now(),
    login_streak = current_streak,
    loyalty_points = loyalty_points + points_to_add
  where id = user_id;

  -- Return the points awarded and the new streak count
  return query select points_to_add, current_streak;
end;
$$;


-- 3. Grant execute permission to authenticated users
grant execute on function public.handle_login() to authenticated;
