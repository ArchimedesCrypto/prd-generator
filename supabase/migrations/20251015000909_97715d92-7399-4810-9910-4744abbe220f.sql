-- Fix critical RLS and security issues for D&D Campaign Generator

-- 1. Enable RLS on critical tables (campaigns already has policies)
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- 2. Fix SECURITY DEFINER functions to include search_path protection
CREATE OR REPLACE FUNCTION public.check_api_usage_limit()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
    IF NEW.subscription_tier = 'free' AND NEW.calls_count > 250000 THEN
        RAISE EXCEPTION 'Free tier usage limit (250,000 calls) exceeded';
    ELSIF NEW.subscription_tier = 'paid' AND NEW.calls_count > 8000000 THEN
        RAISE EXCEPTION 'Paid tier usage limit (8,000,000 calls) exceeded';
    END IF;
    RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.handle_new_user_registration()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
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
  
  INSERT INTO public.profiles (user_id, full_name, username, created_at)
  VALUES (
    NEW.id, 
    NEW.raw_user_meta_data->>'full_name', 
    NULL, 
    NOW()
  )
  ON CONFLICT (user_id) DO NOTHING;
  
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
$function$;

CREATE OR REPLACE FUNCTION public.update_story_rating_stats()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  UPDATE romance_by_me_stories
  SET 
    rating_average = (
      SELECT AVG(rating)
      FROM romance_by_me_ratings
      WHERE story_id = NEW.story_id
    ),
    rating_count = (
      SELECT COUNT(*)
      FROM romance_by_me_ratings
      WHERE story_id = NEW.story_id
    )
  WHERE id = NEW.story_id;
  
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_timestamp()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
begin
  new.updated_at = now();
  return new;
end;
$function$;