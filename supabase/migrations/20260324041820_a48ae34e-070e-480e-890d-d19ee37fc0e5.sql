ALTER TABLE public.scenarios
  ADD COLUMN IF NOT EXISTS urgency_level text DEFAULT 'medium',
  ADD COLUMN IF NOT EXISTS actions_now jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS actions_24h jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS actions_week jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS what_to_prepare jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS who_to_contact jsonb DEFAULT '[]'::jsonb;