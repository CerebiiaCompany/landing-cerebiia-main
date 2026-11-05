import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, CheckCircle2, Copy, Download, Loader2 } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { submitQuote } from "@/lib/leads.functions";
import { quoteSchema } from "@/lib/leads.schemas";
import {
  BUDGET_RANGES,
  INTEGRATIONS,
  PLATFORMS,
  PROJECT_TYPES,
  SCOPE_MODULES,
  URGENCIES,
  buildBriefText,
  calculateEstimate,
  formatCOP,
} from "@/lib/estimate";

export const Route = createFileRoute("/cotizar")({
  head: () => ({
    meta: [
      { title: "Cotizador de proyectos — Cerebiia S.A.S" },
      {
        name: "description",
        content:
          "Cotice su proyecto de software en línea: elija alcance, plataformas e integraciones y reciba un rango aproximado de inversión y tiempo en pesos colombianos.",
      },
      { property: "og:title", content: "Cotizador de proyectos — Cerebiia S.A.S" },
      {
        property: "og:description",
        content: "Estimación aproximada y guía de proyecto lista para su equipo, en minutos.",
      },
      { property: "og:url", content: "/cotizar" },
    ],
    links: [{ rel: "canonical", href: "/cotizar" }],
  }),
  component: CotizarPage,
});

const STEPS = ["Proyecto", "Alcance", "Plataformas", "Integraciones", "Brief", "Contacto"];

const inputClass =
  "w-full rounded-xl border border-border bg-surface/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-brand-cyan focus:outline-none";

function Chip({
  active,
  onClick,
  title,
  description,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  description?: string | undefined;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-2xl border p-4 text-left transition-colors ${
        active
          ? "border-brand-cyan bg-brand-cyan/10"
          : "border-border bg-surface/50 hover:border-brand-magenta/60"
      }`}
    >
      <span className="block text-sm font-semibold">{title}</span>
      {description ? (
        <span className="mt-1 block text-xs text-muted-foreground">{description}</span>
      ) : null}
    </button>
  );
}

function CotizarPage() {
  const submit = useServerFn(submitQuote);
  const [step, setStep] = useState(0);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const [projectType, setProjectType] = useState("software-medida");
  const [scopeModules, setScopeModules] = useState<string[]>([]);
  const [platforms, setPlatforms] = useState<string[]>(["web"]);
  const [integrations, setIntegrations] = useState<string[]>([]);
  const [urgency, setUrgency] = useState("normal");
  const [budgetRange, setBudgetRange] = useState("por-definir");
  const [brief, setBrief] = useState({
    objective: "",
    users: "",
    mustHaves: "",
    references: "",
    deliverables: "",
  });
  const [contact, setContact] = useState({ fullName: "", company: "", email: "", phone: "" });

  const estimate = useMemo(
    () => calculateEstimate({ projectType, scopeModules, platforms, integrations, urgency }),
    [projectType, scopeModules, platforms, integrations, urgency],
  );

  const briefText = useMemo(
    () => buildBriefText({ contact, selection: { projectType, scopeModules, platforms, integrations, urgency }, budget: budgetRange, brief, estimate }),
    [contact, projectType, scopeModules, platforms, integrations, urgency, budgetRange, brief, estimate],
  );

  const toggle = (list: string[], setList: (value: string[]) => void, id: string) =>
    setList(list.includes(id) ? list.filter((item) => item !== id) : [...list, id]);

  async function handleSubmit() {
    const parsed = quoteSchema.safeParse({
      ...contact,
      projectType,
      scopeModules,
      platforms,
      integrations,
      urgency,
      budgetRange,
      brief,
    });

    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Revise los datos del formulario");
      return;
    }

    setSending(true);
    try {
      await submit({ data: parsed.data });
      setDone(true);
      toast.success("Solicitud enviada. Le escribiremos muy pronto.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "No pudimos enviar la solicitud");
    } finally {
      setSending(false);
    }
  }

  function downloadBrief() {
    const blob = new Blob([briefText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "guia-proyecto-cerebiia.txt";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-5 py-14 md:py-20">
        <h1 className="text-3xl font-extrabold md:text-5xl">
          Cotice su proyecto <span className="brand-gradient-text">paso a paso</span>
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Cada respuesta ajusta la estimación en tiempo real. Al final puede descargar la guía de su
          proyecto y enviarnos la solicitud.
        </p>

        {done ? (
          <div className="bento mt-10 p-8 text-center">
            <CheckCircle2 className="mx-auto size-12 text-brand-cyan" aria-hidden />
            <h2 className="mt-4 text-2xl font-bold">Recibimos su solicitud</h2>
            <p className="mt-3 text-muted-foreground">
              Estimación registrada entre {formatCOP(estimate.min)} y {formatCOP(estimate.max)}.
              {estimate.priority === "alta"
                ? " Por su tamaño, la marcamos como prioridad alta para la dirección de desarrollo."
                : " Un consultor le escribirá para revisar el alcance."}
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={downloadBrief}
                className="btn-solid inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground"
              >
                <Download className="size-4" aria-hidden /> Descargar mi guía
              </button>
              <a
                href="/agendar"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold hover:bg-secondary"
              >
                Agendar una sesión
              </a>
            </div>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_340px]">
            <section className="bento p-6 md:p-8">
              <ol className="flex flex-wrap gap-2 text-xs">
                {STEPS.map((label, index) => (
                  <li
                    key={label}
                    className={`rounded-full border px-3 py-1 ${
                      index === step
                        ? "border-brand-cyan text-brand-cyan"
                        : index < step
                          ? "border-border text-muted-foreground"
                          : "border-border/60 text-muted-foreground/60"
                    }`}
                  >
                    {index + 1}. {label}
                  </li>
                ))}
              </ol>

              <div className="mt-8 space-y-5">
                {step === 0 && (
                  <>
                    <h2 className="text-xl font-semibold">¿Qué necesita construir?</h2>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {PROJECT_TYPES.map((option) => (
                        <Chip
                          key={option.id}
                          active={projectType === option.id}
                          onClick={() => setProjectType(option.id)}
                          title={option.label}
                          description={option.description}
                        />
                      ))}
                    </div>
                    <h3 className="pt-4 text-sm font-semibold text-muted-foreground">Urgencia</h3>
                    <div className="grid gap-3 sm:grid-cols-3">
                      {URGENCIES.map((option) => (
                        <Chip
                          key={option.id}
                          active={urgency === option.id}
                          onClick={() => setUrgency(option.id)}
                          title={option.label}
                          description={option.description}
                        />
                      ))}
                    </div>
                  </>
                )}

                {step === 1 && (
                  <>
                    <h2 className="text-xl font-semibold">Módulos que espera incluir</h2>
                    <p className="text-sm text-muted-foreground">Seleccione todos los que apliquen.</p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {SCOPE_MODULES.map((option) => (
                        <Chip
                          key={option.id}
                          active={scopeModules.includes(option.id)}
                          onClick={() => toggle(scopeModules, setScopeModules, option.id)}
                          title={option.label}
                        />
                      ))}
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <h2 className="text-xl font-semibold">Plataformas</h2>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {PLATFORMS.map((option) => (
                        <Chip
                          key={option.id}
                          active={platforms.includes(option.id)}
                          onClick={() => toggle(platforms, setPlatforms, option.id)}
                          title={option.label}
                        />
                      ))}
                    </div>
                    <h3 className="pt-4 text-sm font-semibold text-muted-foreground">
                      Presupuesto estimado
                    </h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {BUDGET_RANGES.map((option) => (
                        <Chip
                          key={option.id}
                          active={budgetRange === option.id}
                          onClick={() => setBudgetRange(option.id)}
                          title={option.label}
                        />
                      ))}
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <h2 className="text-xl font-semibold">Integraciones necesarias</h2>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {INTEGRATIONS.map((option) => (
                        <Chip
                          key={option.id}
                          active={integrations.includes(option.id)}
                          onClick={() => toggle(integrations, setIntegrations, option.id)}
                          title={option.label}
                        />
                      ))}
                    </div>
                  </>
                )}

                {step === 4 && (
                  <>
                    <h2 className="text-xl font-semibold">Cuéntenos su caso</h2>
                    {(
                      [
                        ["objective", "Objetivo del proyecto", "¿Qué problema quiere resolver?"],
                        ["users", "Usuarios", "¿Quién usará la solución y cuántos son?"],
                        ["mustHaves", "Funciones imprescindibles", "Lo que no puede faltar"],
                        ["references", "Referencias", "Sistemas o productos que le gustan"],
                        ["deliverables", "Entregables esperados", "Qué espera recibir y cuándo"],
                      ] as const
                    ).map(([key, label, placeholder]) => (
                      <label key={key} className="block">
                        <span className="text-sm font-medium">{label}</span>
                        <textarea
                          value={brief[key]}
                          onChange={(event) =>
                            setBrief((prev) => ({ ...prev, [key]: event.target.value }))
                          }
                          rows={3}
                          maxLength={2000}
                          placeholder={placeholder}
                          className={`mt-2 ${inputClass}`}
                        />
                      </label>
                    ))}
                  </>
                )}

                {step === 5 && (
                  <>
                    <h2 className="text-xl font-semibold">¿A quién contactamos?</h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {(
                        [
                          ["fullName", "Nombre completo *", "text"],
                          ["company", "Empresa", "text"],
                          ["email", "Correo corporativo *", "email"],
                          ["phone", "Teléfono / WhatsApp", "tel"],
                        ] as const
                      ).map(([key, label, type]) => (
                        <label key={key} className="block">
                          <span className="text-sm font-medium">{label}</span>
                          <input
                            type={type}
                            value={contact[key]}
                            maxLength={255}
                            onChange={(event) =>
                              setContact((prev) => ({ ...prev, [key]: event.target.value }))
                            }
                            className={`mt-2 ${inputClass}`}
                          />
                        </label>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        void navigator.clipboard.writeText(briefText);
                        toast.success("Guía copiada al portapapeles");
                      }}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-brand-cyan hover:underline"
                    >
                      <Copy className="size-4" aria-hidden /> Copiar la guía del proyecto
                    </button>
                  </>
                )}
              </div>

              <div className="mt-9 flex items-center justify-between gap-3">
                <button
                  type="button"
                  disabled={step === 0}
                  onClick={() => setStep((value) => Math.max(0, value - 1))}
                  className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold disabled:opacity-40"
                >
                  <ArrowLeft className="size-4" aria-hidden /> Atrás
                </button>

                {step < STEPS.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep((value) => Math.min(STEPS.length - 1, value + 1))}
                    className="btn-solid inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-primary-foreground"
                  >
                    Siguiente <ArrowRight className="size-4" aria-hidden />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={sending}
                    className="btn-solid inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-60"
                  >
                    {sending ? <Loader2 className="size-4 animate-spin" aria-hidden /> : null}
                    Enviar solicitud
                  </button>
                )}
              </div>
            </section>

            <aside className="bento glow-cyan h-fit p-6 lg:sticky lg:top-24">
              <h2 className="text-sm font-semibold text-muted-foreground">Estimación aproximada</h2>
              <p className="brand-gradient-text mt-3 text-2xl font-extrabold">
                {formatCOP(estimate.min)}
              </p>
              <p className="text-sm text-muted-foreground">hasta {formatCOP(estimate.max)}</p>

              <dl className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Tiempo</dt>
                  <dd className="font-semibold">
                    {estimate.weeksMin}–{estimate.weeksMax} semanas
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Módulos</dt>
                  <dd className="font-semibold">{scopeModules.length}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Prioridad</dt>
                  <dd
                    className={
                      estimate.priority === "alta"
                        ? "font-semibold text-brand-magenta"
                        : "font-semibold"
                    }
                  >
                    {estimate.priority === "alta" ? "Alta" : "Normal"}
                  </dd>
                </div>
              </dl>

              {estimate.priority === "alta" ? (
                <p className="mt-5 rounded-xl border border-brand-magenta/40 bg-brand-magenta/10 p-3 text-xs text-muted-foreground">
                  Por su tamaño, esta solicitud se enruta directamente a la dirección de desarrollo.
                </p>
              ) : null}

              <p className="mt-5 text-xs text-muted-foreground">
                Valores en COP, sin IVA. Es un rango aproximado que se precisa tras la sesión de
                descubrimiento.
              </p>
            </aside>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
