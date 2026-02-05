-- Add credits column to profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS credits INTEGER NOT NULL DEFAULT 1;

-- Update existing profiles to have credits
UPDATE public.profiles SET credits = 1 WHERE credits IS NULL;

-- Update the handle_new_user_registration function to include credits
CREATE OR REPLACE FUNCTION public.handle_new_user_registration()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  INSERT INTO public.users (id, email, name, avatar_url, subscription_status, preferences, created_at)
  VALUES (
    NEW.id, 
    NEW.email, 
    NEW.raw_user_meta_data->>'full_name', 
    NEW.raw_user_meta_data->>'avatar_url', 
    'free', 
    '{}', 
    NOW()
  )
  ON CONFLICT (id) DO NOTHING;
  
  INSERT INTO public.profiles (user_id, full_name, username, credits, created_at)
  VALUES (
    NEW.id, 
    NEW.raw_user_meta_data->>'full_name', 
    NULL,
    1,
    NOW()
  )
  ON CONFLICT (user_id) DO UPDATE
  SET full_name = EXCLUDED.full_name,
      credits = COALESCE(public.profiles.credits, 1);
  
  INSERT INTO public.romance_by_me_subscriptions (
    user_id,
    plan,
    stories_remaining,
    stories_total,
    start_date,
    end_date,
    auto_renew,
    status,
    stripe_subscription_id,
    created_at
  )
  VALUES (
    NEW.id,
    'free',
    1,
    1,
    NOW(),
    NULL,
    false,
    'active',
    NULL,
    NOW()
  )
  ON CONFLICT (user_id) DO NOTHING;
  
  RETURN NEW;
END;
$$;