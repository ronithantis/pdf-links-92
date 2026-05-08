ALTER TABLE public.knowledge_resources
  ADD COLUMN IF NOT EXISTS presentation_category text,
  ADD COLUMN IF NOT EXISTS tags jsonb;