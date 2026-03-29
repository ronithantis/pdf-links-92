
-- Create suppliers table
CREATE TABLE public.suppliers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  business_name TEXT,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  id_number TEXT NOT NULL,
  business_number TEXT,
  service_type TEXT[] NOT NULL DEFAULT '{}',
  region TEXT[] NOT NULL DEFAULT '{}',
  description TEXT,
  services_detail TEXT,
  years_experience TEXT,
  has_insurance TEXT,
  unhappy_client_policy TEXT,
  digital_presence TEXT[] DEFAULT '{}',
  digital_link TEXT,
  referral_1_name TEXT NOT NULL,
  referral_1_phone TEXT NOT NULL,
  referral_2_name TEXT NOT NULL,
  referral_2_phone TEXT NOT NULL,
  referral_verification_consent BOOLEAN NOT NULL DEFAULT false,
  price_list JSONB DEFAULT '[]',
  has_insurance_declaration BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'pending',
  trust_score INTEGER DEFAULT 0,
  admin_checklist JSONB DEFAULT '{"google_search": false, "net_hamishpat": false, "business_registry": false, "referral_1_verified": false, "referral_2_verified": false}'
);

-- Enable RLS
ALTER TABLE public.suppliers ENABLE ROW LEVEL SECURITY;

-- Public can read only approved suppliers
CREATE POLICY "Public read approved suppliers"
ON public.suppliers
FOR SELECT
TO public
USING (status = 'approved');

-- Authenticated users can insert (register as supplier)
CREATE POLICY "Authenticated insert suppliers"
ON public.suppliers
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Allow anonymous insert for non-logged-in registration
CREATE POLICY "Anon insert suppliers"
ON public.suppliers
FOR INSERT
TO anon
WITH CHECK (user_id IS NULL);

-- Admin full access
CREATE POLICY "Admin all suppliers"
ON public.suppliers
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Owner can read own supplier record regardless of status
CREATE POLICY "Owner read own supplier"
ON public.suppliers
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);
