-- Create campaigns table to store generated D&D campaigns
CREATE TABLE public.campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  num_players INTEGER NOT NULL,
  party_composition JSONB NOT NULL,
  story_type TEXT NOT NULL,
  include_riddles BOOLEAN NOT NULL DEFAULT false,
  additional_notes TEXT,
  deepwriter_project_id TEXT,
  deepwriter_job_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  content TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;

-- Users can view their own campaigns
CREATE POLICY "Users can view their own campaigns"
ON public.campaigns
FOR SELECT
USING (auth.uid() = user_id);

-- Users can create their own campaigns
CREATE POLICY "Users can create their own campaigns"
ON public.campaigns
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own campaigns
CREATE POLICY "Users can update their own campaigns"
ON public.campaigns
FOR UPDATE
USING (auth.uid() = user_id);

-- Users can delete their own campaigns
CREATE POLICY "Users can delete their own campaigns"
ON public.campaigns
FOR DELETE
USING (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE TRIGGER update_campaigns_updated_at
BEFORE UPDATE ON public.campaigns
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();