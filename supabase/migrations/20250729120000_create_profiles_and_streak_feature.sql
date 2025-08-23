/*
          # Create Profiles Table and Login Streak Feature
          This migration creates the user profiles table, links it to Supabase auth, and sets up the entire daily login streak rewards system.

          ## Query Description: This script is foundational and sets up user data management.
          1. Creates the `profiles` table to store user data.
          2. Creates a trigger to automatically add a new profile when a user signs up.
          3. Implements Row Level Security (RLS) for data protection.
          4. Creates the database function to handle login streak logic and reward points.
          
          This operation is safe to run on a new project. If you have an existing `profiles` table, you should review this script carefully.

          ## Metadata:
          - Schema-Category: "Structural"
          - Impact-Level: "High"
          - Requires-Backup: false
          - Reversible: false

          ## Structure Details:
          - Tables Created: `public.profiles`
          - Functions Created: `public.handle_new_user`, `public.update_login_streak`
          - Triggers Created: `on_auth_user_created` on `auth.users`

          ## Security Implications:
          - RLS Status: Enabled on `public.profiles`.
          - Policy Changes: Yes, new policies are created for the profiles table.
          - Auth Requirements: Policies are based on `auth.uid()`.

          ## Performance Impact:
          - Indexes: A primary key index is created on `profiles.id`.
          - Triggers: An `AFTER INSERT` trigger is added to `auth.users`.
          - Estimated Impact: Low. The trigger is lightweight and only runs on new user creation.
          */

-- 1. Create the profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  updated_at TIMESTAMPTZ,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  website TEXT,
  last_login_at TIMESTAMPTZ,
  login_streak INTEGER DEFAULT 0 NOT NULL,
  total_points INTEGER DEFAULT 0 NOT NULL,

  CONSTRAINT username_length CHECK (char_length(username) >= 3)
);

-- 2. Set up Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile." ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile." ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- 3. Create a trigger to automatically create a profile for new users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  RETURN new;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 4. Create the function to update login streak and award points
CREATE OR REPLACE FUNCTION public.update_login_streak()
RETURNS TABLE(streak_increased BOOLEAN, points_awarded INTEGER, current_streak INTEGER)
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  user_id UUID := auth.uid();
  last_login TIMESTAMPTZ;
  streak INT;
  points INT;
  points_to_add INT;
BEGIN
  -- Get current user data
  SELECT last_login_at, login_streak, total_points
  INTO last_login, streak, points
  FROM public.profiles
  WHERE id = user_id;

  -- Check if it's a new day for a login streak
  IF last_login IS NULL OR last_login < (NOW() - INTERVAL '24 hours') THEN
    -- If the last login was more than 48 hours ago, reset the streak
    IF last_login IS NOT NULL AND last_login < (NOW() - INTERVAL '48 hours') THEN
      streak := 1;
    ELSE
      -- Otherwise, increment the streak
      streak := COALESCE(streak, 0) + 1;
    END IF;

    -- Award points based on streak (Day 1: 10, Day 2: 20, etc., max 50)
    points_to_add := LEAST(streak * 10, 50);
    
    -- Bonus for Day 5
    IF streak = 5 THEN
      points_to_add := points_to_add + 50; -- 50 base + 50 bonus
    END IF;

    -- Update the profile
    UPDATE public.profiles
    SET
      last_login_at = NOW(),
      login_streak = streak,
      total_points = COALESCE(total_points, 0) + points_to_add
    WHERE id = user_id;

    -- Return the results
    RETURN QUERY SELECT true, points_to_add, streak;
  ELSE
    -- Not a new day for a streak, return current state
    RETURN QUERY SELECT false, 0, COALESCE(streak, 0);
  END IF;
END;
$$;
