-- Replace has_role() usage in policies with direct owner-scoped checks on user_roles,
-- then revoke direct execution of the SECURITY DEFINER function from signed-in users.

DROP POLICY IF EXISTS "admins_read_quotes" ON public.quote_requests;
DROP POLICY IF EXISTS "admins_update_quotes" ON public.quote_requests;
DROP POLICY IF EXISTS "admins_read_appointments" ON public.appointments;
DROP POLICY IF EXISTS "admins_update_appointments" ON public.appointments;

CREATE POLICY "staff_read_quotes" ON public.quote_requests
  FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM public.user_roles ur
            WHERE ur.user_id = auth.uid() AND ur.role IN ('admin','staff'))
  );

CREATE POLICY "staff_update_quotes" ON public.quote_requests
  FOR UPDATE TO authenticated USING (
    EXISTS (SELECT 1 FROM public.user_roles ur
            WHERE ur.user_id = auth.uid() AND ur.role IN ('admin','staff'))
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM public.user_roles ur
            WHERE ur.user_id = auth.uid() AND ur.role IN ('admin','staff'))
  );

CREATE POLICY "staff_read_appointments" ON public.appointments
  FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM public.user_roles ur
            WHERE ur.user_id = auth.uid() AND ur.role IN ('admin','staff'))
  );

CREATE POLICY "staff_update_appointments" ON public.appointments
  FOR UPDATE TO authenticated USING (
    EXISTS (SELECT 1 FROM public.user_roles ur
            WHERE ur.user_id = auth.uid() AND ur.role IN ('admin','staff'))
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM public.user_roles ur
            WHERE ur.user_id = auth.uid() AND ur.role IN ('admin','staff'))
  );

REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;