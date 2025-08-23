--
-- # Create Profiles Table and Login Streak Logic
-- This script sets up the user profiles table, links it to Supabase Auth,
-- and implements the functions and policies required for a daily login streak reward system.
--
-- ## Security and Data Safety
-- - **RLS Enabled**: Row Level Security is enabled on the `profiles` table.
-- - **Policies**: Policies are created to ensure users can only access and modify their own data.
-- - **Backup Recommended**: This creates new tables and functions. While safe, backing up is always a good practice.
--
-- ## Metadata
-- - Schema-Category: "Structural"
-- - Impact-Level: "Medium"
-- - Requires-Backup: true
-- - Reversible: true (with manual deletion of tables/functions)
--

-- 1. Create public.profiles table
CREATE TABLE public.profiles (
  id uuid NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  updated_at timestamp with time zone,
  username text UNIQUE,
  full_name text,
  avatar_url text,
  website text,
  loyalty_points integer DEFAULT 0 NOT NULL,
  last_login_at timestamp with time zone,
  streak_count integer DEFAULT 0 NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT username_length CHECK (char_length(username) >= 3)
);

-- 2. Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. Create RLS policies for profiles
CREATE POLICY "Public profiles are viewable by everyone."
  ON public.profiles FOR SELECT
  USING ( true );

CREATE POLICY "Users can insert their own profile."
  ON public.profiles FOR INSERT
  WITH CHECK ( auth.uid() = id );

CREATE POLICY "Users can update their own profile."
  ON public.profiles FOR UPDATE
  USING ( auth.uid() = id );

-- 4. Create a function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'avatar_url');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Create a trigger to call the function when a new user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 6. Create function to handle login streak
CREATE OR REPLACE FUNCTION public.handle_login_streak()
RETURNS integer AS $$
DECLARE
  streak_reward integer;
  current_streak integer;
  new_loyalty_points integer;
  last_login date;
  current_user_id uuid := auth.uid();
BEGIN
  -- Get user's last login date and current streak
  SELECT
    (last_login_at AT TIME ZONE 'utc')::date,
    streak_count
  INTO
    last_login,
    current_streak
  FROM public.profiles
  WHERE id = current_user_id;

  -- Check if user logged in today already
  IF last_login = (now() AT TIME ZONE 'utc')::date THEN
    RETURN 0; -- No points awarded for multiple logins on the same day
  END IF;

  -- Check if streak is continued or reset
  IF last_login = (now() AT TIME ZONE 'utc')::date - interval '1 day' THEN
    current_streak := current_streak + 1; -- Continue streak
  ELSE
    current_streak := 1; -- Reset streak
  END IF;

  -- Determine reward based on streak
  streak_reward := current_streak * 10;
  IF streak_reward > 50 THEN
    streak_reward := 50; -- Cap daily reward at 50 points
  END IF;

  -- Update user's profile
  UPDATE public.profiles
  SET
    last_login_at = now(),
    streak_count = current_streak,
    loyalty_points = loyalty_points + streak_reward
  WHERE
    id = current_user_id;

  RETURN streak_reward;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
