
CREATE TYPE public.listing_type AS ENUM ('donate', 'request');
CREATE TYPE public.listing_status AS ENUM ('active', 'closed');

CREATE TABLE public.donation_listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type listing_type NOT NULL,
  title text NOT NULL,
  category text NOT NULL,
  other_category text,
  description text,
  region text NOT NULL,
  contact_email text NOT NULL,
  contact_phone text,
  shipping_available boolean DEFAULT false,
  item_size text,
  status listing_status DEFAULT 'active',
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.donation_listings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read active" ON public.donation_listings
  FOR SELECT USING (status = 'active');

CREATE POLICY "Authenticated insert" ON public.donation_listings
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Owner update" ON public.donation_listings
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Owner delete" ON public.donation_listings
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Admin all" ON public.donation_listings
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));
