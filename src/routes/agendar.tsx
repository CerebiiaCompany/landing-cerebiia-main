import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { CalendarClock, CheckCircle2, Loader2 } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { submitAppointment } from "@/lib/leads.functions";
import { appointmentSchema } from "@/lib/leads.schemas";
import { CHANNELS, TIME_SLOTS } from "@/lib/estimate";

export const Route = createFileRoute("/agendar")({
  head: () => ({
    meta: [
      { title: "Agendar una sesión — Cerebiia S.A.S" },
      {
        name: "description",
        content:
          "Reserve una sesión con el equipo de Cerebiia S.A.S: elija fecha, franja horaria y canal. Los proyectos grandes llegan directo a la dirección de desarrollo.",
      },
      { property: "og:title", content: "Agendar una sesión — Cerebiia S.A.S" },
      {
        property: "og:description",
        content: "Escoja día, franja y canal para hablar con el equipo de desarrollo de Cerebiia.",
      },
      { property: "og:url", content: "/agendar" },
    ],
    links: [{ rel: "canonical", href: "/agendar" }],
  }),
  component: AgendarPage,
});

const inputClass =
  "w-full rounded-xl border border-border bg-surface/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-brand-cyan focus:outline-none";

function AgendarPage() {
  const submit = useServerFn(submitAppointment);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    company: "",
    email: "",
    phone: "",
    preferredDate: "",
    timeSlot: TIME_SLOTS[0]?.id ?? "08-10",
    channel: "video",
    topic: "",
    notes: "",
  });

  const set = (key: keyof typeof form) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const parsed = appointmentSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Revise los datos del formulario");
      return;
    }

    setSending(true);
    try {
      await submit({ data: parsed.data });
      setDone(true);
      toast.success("Cita solicitada. Confirmamos por correo.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "No pudimos registrar la cita");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto max-w-5xl px-5 py-14 md:py-20">
        <h1 className="text-3xl font-extrabold md:text-5xl">
          Agende una sesión con <span className="brand-gradient-text">el equipo</span>
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Treinta minutos para entender su caso, aclarar dudas técnicas y definir siguientes pasos.
          Sin costo y sin compromiso.
        </p>

        {done ? (
          <div className="bento mt-10 p-8 text-center">
            <CheckCircle2 className="mx-auto size-12 text-brand-cyan" aria-hidden />
            <h2 className="mt-4 text-2xl font-bold">Solicitud registrada</h2>
            <p className="mt-3 text-muted-foreground">
              Le confirmaremos la cita al correo {form.email} con el enlace o la dirección según el
              canal elegido.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bento mt-10 space-y-6 p-6 md:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium">Nombre completo *</span>
                <input
                  className={`mt-2 ${inputClass}`}
                  value={form.fullName}
                  maxLength={120}
                  onChange={(event) => set("fullName")(event.target.value)}
                  required
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium">Empresa</span>
                <input
                  className={`mt-2 ${inputClass}`}
                  value={form.company}
                  maxLength={200}
                  onChange={(event) => set("company")(event.target.value)}
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium">Correo *</span>
                <input
                  type="email"
                  className={`mt-2 ${inputClass}`}
                  value={form.email}
                  maxLength={255}
                  onChange={(event) => set("email")(event.target.value)}
                  required
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium">Teléfono / WhatsApp</span>
                <input
                  type="tel"
                  className={`mt-2 ${inputClass}`}
                  value={form.phone}
                  maxLength={40}
                  onChange={(event) => set("phone")(event.target.value)}
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium">Fecha preferida *</span>
                <input
                  type="date"
                  className={`mt-2 ${inputClass}`}
                  value={form.preferredDate}
                  onChange={(event) => set("preferredDate")(event.target.value)}
                  required
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium">Franja horaria *</span>
                <select
                  className={`mt-2 ${inputClass}`}
                  value={form.timeSlot}
                  onChange={(event) => set("timeSlot")(event.target.value)}
                >
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot.id} value={slot.id}>
                      {slot.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <fieldset>
              <legend className="text-sm font-medium">Canal de la reunión</legend>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {CHANNELS.map((channel) => (
                  <button
                    key={channel.id}
                    type="button"
                    aria-pressed={form.channel === channel.id}
                    onClick={() => set("channel")(channel.id)}
                    className={`rounded-2xl border p-4 text-sm font-semibold transition-colors ${
                      form.channel === channel.id
                        ? "border-brand-cyan bg-brand-cyan/10"
                        : "border-border bg-surface/50 hover:border-brand-magenta/60"
                    }`}
                  >
                    {channel.label}
                  </button>
                ))}
              </div>
            </fieldset>

            <label className="block">
              <span className="text-sm font-medium">Tema a tratar *</span>
              <input
                className={`mt-2 ${inputClass}`}
                value={form.topic}
                maxLength={300}
                placeholder="Ej: automatizar el proceso de facturación"
                onChange={(event) => set("topic")(event.target.value)}
                required
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium">Notas adicionales</span>
              <textarea
                rows={4}
                maxLength={2000}
                className={`mt-2 ${inputClass}`}
                value={form.notes}
                onChange={(event) => set("notes")(event.target.value)}
              />
            </label>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={sending}
                className="btn-solid inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60"
              >
                {sending ? (
                  <Loader2 className="size-4 animate-spin" aria-hidden />
                ) : (
                  <CalendarClock className="size-4" aria-hidden />
                )}
                Solicitar cita
              </button>
              <p className="text-xs text-muted-foreground">
                Confirmamos por correo dentro del siguiente día hábil.
              </p>
            </div>
          </form>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
