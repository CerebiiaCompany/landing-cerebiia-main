import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BrainCircuit, Code2, Database, Plug, ShieldCheck, Smartphone } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/servicios")({
  head: () => ({
    meta: [
      { title: "Servicios de desarrollo — Cerebiia S.A.S" },
      {
        name: "description",
        content:
          "Desarrollo de software a la medida, integraciones con ERP y facturación, IA aplicada, apps móviles, datos y soporte continuo para empresas en Colombia.",
      },
      { property: "og:title", content: "Servicios de desarrollo — Cerebiia S.A.S" },
      {
        property: "og:description",
        content:
          "Capacidades de Cerebiia: software a la medida, integraciones, IA aplicada, móvil, datos y soporte.",
      },
      { property: "og:url", content: "/servicios" },
    ],
    links: [{ rel: "canonical", href: "/servicios" }],
  }),
  component: ServiciosPage,
});

const SERVICES = [
  {
    icon: Code2,
    title: "Software a la medida",
    text: "Sistemas de gestión, portales de clientes, operaciones internas y flujos que ningún producto genérico resuelve.",
    bullets: ["Descubrimiento y arquitectura", "Entregas por sprints", "Documentación y traspaso"],
  },
  {
    icon: Plug,
    title: "Integraciones y APIs",
    text: "Conectamos su ecosistema: ERP, contabilidad, facturación electrónica, pasarelas de pago y transportadoras.",
    bullets: ["APIs REST propias", "Sincronizaciones programadas", "Trazabilidad de errores"],
  },
  {
    icon: BrainCircuit,
    title: "IA aplicada",
    text: "Asistentes internos, lectura automática de documentos, clasificación y automatización de tareas repetitivas.",
    bullets: ["Casos de uso medibles", "Datos bajo su control", "Costos por uso claros"],
  },
  {
    icon: Smartphone,
    title: "Aplicaciones móviles",
    text: "Apps para operación en campo, fuerza comercial o clientes finales, con backend propio.",
    bullets: ["iOS y Android", "Modo con conexión intermitente", "Publicación en tiendas"],
  },
  {
    icon: Database,
    title: "Datos y tableros",
    text: "Modelos de datos confiables e indicadores que la gerencia puede consultar sin pedir reportes.",
    bullets: ["Bodega de datos", "Tableros en vivo", "Alertas por umbrales"],
  },
  {
    icon: ShieldCheck,
    title: "Soporte y evolución",
    text: "Acompañamiento posterior con acuerdos de servicio, monitoreo y mejoras planificadas.",
    bullets: ["Tiempos de respuesta definidos", "Monitoreo y respaldos", "Roadmap trimestral"],
  },
];

function ServiciosPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto max-w-7xl px-5 py-16 md:py-24">
        <h1 className="max-w-3xl text-4xl font-extrabold md:text-5xl">
          Capacidades de <span className="brand-gradient-text">Cerebiia</span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
          Trabajamos por resultados de negocio: menos trabajo manual, procesos trazables y
          decisiones con datos. Estas son las líneas con las que llegamos a cada proyecto.
        </p>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {SERVICES.map((service) => (
            <article key={service.title} className="bento flex flex-col p-6">
              <service.icon className="size-7 text-brand-cyan" aria-hidden />
              <h2 className="mt-4 text-xl font-semibold">{service.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{service.text}</p>
              <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                {service.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-magenta" aria-hidden />
                    {bullet}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="bento mt-12 flex flex-col items-start gap-6 p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold">¿No sabe por dónde empezar?</h2>
            <p className="mt-2 text-muted-foreground">
              El cotizador lo guía paso a paso y le entrega un rango de inversión aproximado.
            </p>
          </div>
          <Link
            to="/cotizar"
            className="btn-solid inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground"
          >
            Ir al cotizador <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
