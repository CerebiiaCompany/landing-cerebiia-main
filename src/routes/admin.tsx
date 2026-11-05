import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { LogOut, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/site/SiteHeader";
import { listLeads, updateLeadStatus } from "@/lib/leads.functions";
import { formatCOP } from "@/lib/estimate";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Panel de solicitudes — Cerebiia S.A.S" },
      {
        name: "description",
        content: "Panel interno de Cerebiia S.A.S para revisar cotizaciones y citas recibidas.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Panel de solicitudes — Cerebiia S.A.S" },
      { property: "og:description", content: "Panel interno de cotizaciones y citas." },
      { property: "og:url", content: "/admin" },
    ],
    links: [{ rel: "canonical", href: "/admin" }],
  }),
  component: AdminPage,
});

const QUOTE_STATUSES = ["nuevo", "contactado", "en_propuesta", "cerrado", "descartado"] as const;
const APPOINTMENT_STATUSES = ["solicitada", "confirmada", "realizada", "cancelada"] as const;

function AdminPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fetchLeads = useServerFn(listLeads);
  const setStatus = useServerFn(updateLeadStatus);

  const { data, isPending, isError, refetch, isFetching } = useQuery({
    queryKey: ["leads"],
    queryFn: () => fetchLeads(),
    retry: false,
  });

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  async function changeStatus(kind: "quote" | "appointment", id: string, status: string) {
    try {
      await setStatus({ data: { id, status: status as never, kind } });
      toast.success("Estado actualizado");
      void refetch();
    } catch {
      toast.error("No pudimos actualizar el estado");
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto max-w-7xl px-5 py-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold">Solicitudes</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Cotizaciones y citas recibidas desde la página.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => void refetch()}
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:bg-secondary"
            >
              <RefreshCw className={`size-4 ${isFetching ? "animate-spin" : ""}`} aria-hidden />
              Actualizar
            </button>
            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:bg-secondary"
            >
              <LogOut className="size-4" aria-hidden /> Salir
            </button>
          </div>
        </div>

        {isPending ? (
          <p className="mt-10 text-sm text-muted-foreground">Cargando solicitudes…</p>
        ) : isError ? (
          <div className="bento mt-10 p-8">
            <h2 className="text-lg font-semibold">Acceso restringido</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Debe iniciar sesión con una cuenta autorizada del equipo para ver las solicitudes.
            </p>
            <Link
              to="/auth"
              className="btn-solid mt-6 inline-flex rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground"
            >
              Ir al acceso interno
            </Link>
          </div>
        ) : (
          <div className="mt-10 space-y-12">
            <section>
              <h2 className="text-xl font-bold">
                Cotizaciones <span className="text-muted-foreground">({data.quotes.length})</span>
              </h2>
              <div className="mt-4 grid gap-4 lg:grid-cols-2">
                {data.quotes.map((quote) => (
                  <article key={quote.id} className="bento p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold">{quote.full_name}</h3>
                        <p className="text-xs text-muted-foreground">
                          {quote.company || "Sin empresa"} · {quote.email}
                        </p>
                      </div>
                      {quote.priority === "alta" ? (
                        <span className="rounded-full border border-brand-magenta/50 bg-brand-magenta/10 px-3 py-1 text-xs font-semibold text-brand-magenta">
                          Prioridad alta
                        </span>
                      ) : null}
                    </div>

                    <p className="mt-4 text-sm">
                      <span className="text-muted-foreground">Proyecto:</span> {quote.project_type} ·{" "}
                      {quote.urgency}
                    </p>
                    <p className="text-sm">
                      <span className="text-muted-foreground">Estimado:</span>{" "}
                      {formatCOP(quote.estimate_min)} – {formatCOP(quote.estimate_max)} (
                      {quote.estimate_weeks_min}–{quote.estimate_weeks_max} sem.)
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Módulos: {quote.scope_modules.join(", ") || "-"} · Integraciones:{" "}
                      {quote.integrations.join(", ") || "-"}
                    </p>

                    <select
                      value={quote.status}
                      onChange={(event) => void changeStatus("quote", quote.id, event.target.value)}
                      className="mt-4 rounded-xl border border-border bg-surface/60 px-3 py-2 text-sm"
                    >
                      {QUOTE_STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </article>
                ))}
                {data.quotes.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Aún no hay cotizaciones.</p>
                ) : null}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold">
                Citas <span className="text-muted-foreground">({data.appointments.length})</span>
              </h2>
              <div className="mt-4 grid gap-4 lg:grid-cols-2">
                {data.appointments.map((appointment) => (
                  <article key={appointment.id} className="bento p-6">
                    <h3 className="font-semibold">{appointment.full_name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {appointment.company || "Sin empresa"} · {appointment.email}
                    </p>
                    <p className="mt-3 text-sm">
                      {appointment.preferred_date} · {appointment.time_slot} ·{" "}
                      {appointment.channel}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">{appointment.topic}</p>

                    <select
                      value={appointment.status}
                      onChange={(event) =>
                        void changeStatus("appointment", appointment.id, event.target.value)
                      }
                      className="mt-4 rounded-xl border border-border bg-surface/60 px-3 py-2 text-sm"
                    >
                      {APPOINTMENT_STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </article>
                ))}
                {data.appointments.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Aún no hay citas.</p>
                ) : null}
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
