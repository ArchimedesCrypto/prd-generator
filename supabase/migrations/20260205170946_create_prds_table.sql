-- Create prds table to store generated PRDs
CREATE TABLE public.prds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  product_idea TEXT,
  content TEXT, -- Markdown/HTML content
  status TEXT NOT NULL DEFAULT 'draft',
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.prds ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own PRDs" ON public.prds FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own PRDs" ON public.prds FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own PRDs" ON public.prds FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own PRDs" ON public.prds FOR DELETE USING (auth.uid() = user_id);

-- Create transactions table
CREATE TABLE public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  status TEXT NOT NULL DEFAULT 'pending',
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own transactions" ON public.transactions FOR SELECT USING (auth.uid() = user_id);

-- Updated at trigger
CREATE TRIGGER update_prds_updated_at BEFORE UPDATE ON public.prds FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
