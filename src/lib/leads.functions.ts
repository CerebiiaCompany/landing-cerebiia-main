import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { appointmentSchema, quoteSchema, statusSchema } from "@/lib/leads.schemas";
import { calculateEstimate } from "@/lib/estimate";
import { assertStaff, createPublicServerClient } from "@/lib/leads.server";

export const submitQuote = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => quoteSchema.parse(input))
  .handler(async ({ data }) => {
    const estimate = calculateEstimate({
      projectType: data.projectType,
      scopeModules: data.scopeModules,
      platforms: data.platforms,
      integrations: data.integrations,
      urgency: data.urgency,
    });

    const supabase = createPublicServerClient();
    const { error } = await supabase.from("quote_requests").insert({
      full_name: data.fullName,
      company: data.company || null,
      email: data.email,
      phone: data.phone || null,
      project_type: data.projectType,
      scope_modules: data.scopeModules,
      platforms: data.platforms,
      integrations: data.integrations,
      urgency: data.urgency,
      budget_range: data.budgetRange || null,
      brief: data.brief,
      estimate_min: estimate.min,
      estimate_max: estimate.max,
      estimate_weeks_min: estimate.weeksMin,
      estimate_weeks_max: estimate.weeksMax,
      priority: estimate.priority,
    });

    if (error) {
      console.error("[quote_requests] insert failed", error.message);
      throw new Error("No pudimos registrar la solicitud. Intente de nuevo.");
    }

    return { ok: true, estimate };
  });

export const submitAppointment = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => appointmentSchema.parse(input))
  .handler(async ({ data }) => {
    const supabase = createPublicServerClient();
    const { error } = await supabase.from("appointments").insert({
      full_name: data.fullName,
      company: data.company || null,
      email: data.email,
      phone: data.phone || null,
      preferred_date: data.preferredDate,
      time_slot: data.timeSlot,
      channel: data.channel,
      topic: data.topic,
      notes: data.notes || null,
    });

    if (error) {
      console.error("[appointments] insert failed", error.message);
      throw new Error("No pudimos registrar la cita. Intente de nuevo.");
    }

    return { ok: true };
  });

export const listLeads = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertStaff(context.supabase, context.userId);

    const [quotes, appointments] = await Promise.all([
      context.supabase
        .from("quote_requests")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(200),
      context.supabase
        .from("appointments")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(200),
    ]);

    if (quotes.error || appointments.error) {
      throw new Error("No pudimos cargar las solicitudes.");
    }

    return { quotes: quotes.data ?? [], appointments: appointments.data ?? [] };
  });

export const updateLeadStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => statusSchema.parse(input))
  .handler(async ({ data, context }) => {
    await assertStaff(context.supabase, context.userId);

    const table = data.kind === "quote" ? "quote_requests" : "appointments";
    const { error } = await context.supabase
      .from(table)
      .update({ status: data.status })
      .eq("id", data.id);

    if (error) throw new Error("No pudimos actualizar el estado.");
    return { ok: true };
  });
