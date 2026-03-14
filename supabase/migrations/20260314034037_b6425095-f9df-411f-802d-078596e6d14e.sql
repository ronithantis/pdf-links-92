
-- Enum for categories
CREATE TYPE public.knowledge_category AS ENUM ('forms', 'presentations', 'videos', 'other');

-- Knowledge resources table
CREATE TABLE public.knowledge_resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category knowledge_category NOT NULL,
  title text NOT NULL,
  description text,
  resource_type text NOT NULL DEFAULT 'link',
  url text,
  subcategory text,
  icon_name text,
  sort_order integer DEFAULT 0,
  is_published boolean DEFAULT true,
  scenario_tags text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Scenarios table
CREATE TABLE public.scenarios (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  trigger_phrases text[] DEFAULT '{}',
  questions jsonb DEFAULT '[]',
  recommended_actions jsonb DEFAULT '[]',
  tags text[] DEFAULT '{}',
  is_published boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- User roles
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

-- Enable RLS
ALTER TABLE public.knowledge_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scenarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- has_role function
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

-- Public read policies
CREATE POLICY "Public read published resources" ON public.knowledge_resources FOR SELECT USING (is_published = true);
CREATE POLICY "Public read published scenarios" ON public.scenarios FOR SELECT USING (is_published = true);

-- Admin write policies for knowledge_resources
CREATE POLICY "Admin insert resources" ON public.knowledge_resources FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin update resources" ON public.knowledge_resources FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin delete resources" ON public.knowledge_resources FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Admin write policies for scenarios
CREATE POLICY "Admin insert scenarios" ON public.scenarios FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin update scenarios" ON public.scenarios FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin delete scenarios" ON public.scenarios FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Admin read policy for user_roles (admin can see roles)
CREATE POLICY "Admin read roles" ON public.user_roles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin') OR user_id = auth.uid());

-- Storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('knowledge-files', 'knowledge-files', true);
CREATE POLICY "Public read storage" ON storage.objects FOR SELECT USING (bucket_id = 'knowledge-files');
CREATE POLICY "Admin upload storage" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'knowledge-files' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin delete storage" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'knowledge-files' AND public.has_role(auth.uid(), 'admin'));
