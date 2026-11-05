CREATE TYPE public.app_role AS ENUM ('admin', 'staff', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_read_own_roles" ON public.user_roles
  FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TABLE public.quote_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  company text,
  email text NOT NULL,
  phone text,
  project_type text NOT NULL,
  scope_modules text[] NOT NULL DEFAULT '{}',
  platforms text[] NOT NULL DEFAULT '{}',
  integrations text[] NOT NULL DEFAULT '{}',
  urgency text NOT NULL DEFAULT 'normal',
  budget_range text,
  brief jsonb NOT NULL DEFAULT '{}'::jsonb,
  estimate_min integer NOT NULL DEFAULT 0,
  estimate_max integer NOT NULL DEFAULT 0,
  estimate_weeks_min integer NOT NULL DEFAULT 0,
  estimate_weeks_max integer NOT NULL DEFAULT 0,
  priority text NOT NULL DEFAULT 'normal',
  status text NOT NULL DEFAULT 'nuevo',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.quote_requests TO anon;
GRANT SELECT, INSERT, UPDATE ON public.quote_requests TO authenticated;
GRANT ALL ON public.quote_requests TO service_role;
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone_can_submit_quote" ON public.quote_requests
  FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "admins_read_quotes" ON public.quote_requests
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'));
CREATE POLICY "admins_update_quotes" ON public.quote_requests
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'))
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'));

CREATE TRIGGER quote_requests_updated_at BEFORE UPDATE ON public.quote_requests
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  company text,
  email text NOT NULL,
  phone text,
  preferred_date date NOT NULL,
  time_slot text NOT NULL,
  channel text NOT NULL DEFAULT 'video',
  topic text NOT NULL,
  notes text,
  status text NOT NULL DEFAULT 'solicitada',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.appointments TO anon;
GRANT SELECT, INSERT, UPDATE ON public.appointments TO authenticated;
GRANT ALL ON public.appointments TO service_role;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone_can_request_appointment" ON public.appointments
  FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "admins_read_appointments" ON public.appointments
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'));
CREATE POLICY "admins_update_appointments" ON public.appointments
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'))
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'));

CREATE TRIGGER appointments_updated_at BEFORE UPDATE ON public.appointments
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX quote_requests_created_at_idx ON public.quote_requests (created_at DESC);
CREATE INDEX appointments_created_at_idx ON public.appointments (created_at DESC);