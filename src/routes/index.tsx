import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BrainCircuit,
  CalendarClock,
  Code2,
  Cpu,
  Database,
  Gauge,
  Plug,
  ShieldCheck,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import logoStacked from "@/assets/cerebiia-logo-stacked.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cerebiia S.A.S — Software a la medida en Colombia" },
      {
        name: "description",
        content:
          "Cerebiia S.A.S construye software a la medida, integraciones e IA para empresas colombianas. Cotice su proyecto en línea y agende una sesión con el equipo.",
      },
      { property: "og:title", content: "Cerebiia S.A.S — Software a la medida en Colombia" },
      {
        property: "og:description",
        content:
          "Cotizador interactivo, brief guiado y agenda directa con el equipo de desarrollo de Cerebiia.",
      },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Cerebiia S.A.S — Software a la medida" },
      {
        name: "twitter:description",
        content: "Cotice su proyecto de software en minutos y agende con el equipo de Cerebiia.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const SERVICES = [
  {
    icon: Code2,
    title: "Software a la medida",
    text: "Plataformas internas que se ajustan a su operación real, no al revés.",
    span: "md:col-span-2",
  },
  {
    icon: Plug,
    title: "Integraciones y APIs",
    text: "ERP, facturación electrónica, pasarelas y logística conectados sin fricción.",
    span: "",
  },
  {
    icon: BrainCircuit,
    title: "IA aplicada",
    text: "Agentes, lectura de documentos y automatización con modelos actuales.",
    span: "",
  },
  {
    icon: Smartphone,
    title: "Apps móviles",
    text: "iOS y Android con backend propio y despliegue continuo.",
    span: "",
  },
  {
    icon: Database,
    title: "Datos y tableros",
    text: "Indicadores confiables para decidir con evidencia.",
    span: "",
  },
  {
    icon: ShieldCheck,
    title: "Soporte y evolución",
    text: "Mantenimiento, seguridad y mejoras continuas con acuerdos claros.",
    span: "md:col-span-2",
  },
];

const PROCESS = [
  { step: "01", title: "Descubrimiento", text: "Entendemos su operación y definimos el alcance mínimo viable." },
  { step: "02", title: "Diseño y arquitectura", text: "Prototipo navegable y decisiones técnicas sobre la mesa." },
  { step: "03", title: "Construcción por sprints", text: "Entregas cada dos semanas, con demo y ajustes." },
  { step: "04", title: "Operación", text: "Despliegue, capacitación, monitoreo y evolución." },
];

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="aurora opacity-70" aria-hidden />
          <div className="grid-lines absolute inset-0 opacity-40" aria-hidden />
          <div className="relative mx-auto max-w-7xl px-5 py-20 md:py-28">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 px-4 py-1.5 text-xs text-muted-foreground">
              <Sparkles className="size-3.5 text-brand-cyan" aria-hidden />
              Fábrica de software colombiana
            </span>

            <h1 className="mt-6 max-w-4xl text-4xl leading-tight font-extrabold md:text-6xl">
              Software a la medida que <span className="brand-gradient-text">piensa como su empresa</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              En Cerebiia S.A.S diseñamos, construimos y operamos plataformas para compañías que ya
              no caben en una hoja de cálculo. Cotice en línea, deje su guía de proyecto y hable con
              el equipo que lo va a construir.
            </p>

            <div className="mt-9">
              <Link
                to="/cotizar"
                className="btn-solid group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-base font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
              >
                Cotizar mi proyecto en 2 minutos
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            </div>

            <dl className="mt-14 grid gap-4 sm:grid-cols-3">
              {[
                { k: "Estimación inmediata", v: "Rango de inversión y tiempo al instante" },
                { k: "Brief guiado", v: "Deje su guía sin reuniones previas" },
                { k: "Ruta directa", v: "Los casos grandes llegan a dirección de desarrollo" },
              ].map((item) => (
                <div key={item.k} className="bento p-5">
                  <dt className="text-sm font-semibold text-brand-cyan">{item.k}</dt>
                  <dd className="mt-2 text-sm text-muted-foreground">{item.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Bento de servicios */}
        <section className="mx-auto max-w-7xl px-5 py-16 md:py-24">
          <h2 className="text-3xl font-bold md:text-4xl">Lo que construimos</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Un equipo, varias capacidades. Combinamos producto, ingeniería y datos según lo que su
            negocio necesita mover este trimestre.
          </p>

          <div className="mt-10 grid auto-rows-[minmax(150px,auto)] gap-4 md:grid-cols-4">
            {SERVICES.map((service) => (
              <article key={service.title} className={`bento flex flex-col p-6 ${service.span}`}>
                <service.icon className="size-7 text-brand-cyan" aria-hidden />
                <h3 className="mt-4 text-xl font-semibold">{service.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{service.text}</p>
              </article>
            ))}
          </div>

          <div className="mt-6">
            <Link
              to="/servicios"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-cyan hover:underline"
            >
              Ver el detalle de cada servicio <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </section>

        {/* Herramientas interactivas */}
        <section className="mx-auto max-w-7xl px-5 pb-16 md:pb-24">
          <div className="grid gap-4 md:grid-cols-5">
            <article className="bento glow-cyan relative flex flex-col justify-between p-8 md:col-span-3">
              <div>
                <Gauge className="size-8 text-brand-cyan" aria-hidden />
                <h2 className="mt-4 text-2xl font-bold md:text-3xl">
                  Cotizador interactivo + brief guiado
                </h2>
                <p className="mt-3 text-muted-foreground">
                  Responda seis pasos sobre su caso: tipo de proyecto, módulos, plataformas,
                  integraciones y urgencia. Verá un rango aproximado de inversión y tiempo, y podrá
                  descargar la guía del proyecto para su equipo.
                </p>
              </div>
              <Link
                to="/cotizar"
                className="btn-solid mt-8 inline-flex w-fit items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground"
              >
                Empezar mi cotización <ArrowRight className="size-4" aria-hidden />
              </Link>
            </article>

            <article className="bento glow-magenta flex flex-col justify-between p-8 md:col-span-2">
              <div>
                <CalendarClock className="size-8 text-brand-magenta" aria-hidden />
                <h2 className="mt-4 text-2xl font-bold">Agende una sesión</h2>
                <p className="mt-3 text-muted-foreground">
                  Escoja día, franja y canal. Si su proyecto es grande, la solicitud se marca como
                  prioridad alta y llega directo a la dirección de desarrollo.
                </p>
              </div>
              <Link
                to="/agendar"
                className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold hover:bg-secondary"
              >
                Reservar cita <ArrowRight className="size-4" aria-hidden />
              </Link>
            </article>
          </div>
        </section>

        {/* Proceso */}
        <section className="mx-auto max-w-7xl px-5 pb-16 md:pb-24">
          <h2 className="text-3xl font-bold md:text-4xl">Cómo trabajamos</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {PROCESS.map((item) => (
              <article key={item.step} className="bento p-6">
                <span className="brand-gradient-text text-3xl font-extrabold">{item.step}</span>
                <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Cierre */}
        <section className="mx-auto max-w-7xl px-5 pb-20">
          <div className="bento relative overflow-hidden p-8 md:p-14">
            <div className="aurora opacity-60" aria-hidden />
            <div className="relative grid items-center gap-10 md:grid-cols-[1fr_auto]">
              <div>
                <Cpu className="size-8 text-brand-cyan" aria-hidden />
                <h2 className="mt-4 text-3xl font-bold md:text-4xl">
                  Cuéntenos su caso. Nosotros traemos la ingeniería.
                </h2>
                <p className="mt-4 max-w-xl text-muted-foreground">
                  Una descripción clara de su necesidad nos ahorra semanas. Use el cotizador para
                  dejar su guía o agende directamente con el equipo.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    to="/cotizar"
                    className="btn-solid inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground"
                  >
                    Cotizar ahora
                  </Link>
                  <a
                    href="mailto:contacto@cerebiia.com"
                    className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold hover:bg-secondary"
                  >
                    Escribirnos
                  </a>
                </div>
              </div>
              <img
                src={logoStacked.url}
                alt="Marca de Cerebiia S.A.S"
                className="mx-auto hidden w-48 md:block"
                loading="lazy"
              />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
