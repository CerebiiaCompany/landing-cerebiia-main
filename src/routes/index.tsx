import { ProjectsSection } from "@/components/site/ProjectsSection";
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
import { motion, Variants } from "framer-motion";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

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

// --- Animaciones ---
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

function Index() {
  return (
    <div className="min-h-screen bg-background ">
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="aurora opacity-70" aria-hidden />
          <div className="grid-lines absolute inset-0 opacity-40" aria-hidden />
          
          <motion.div 
            className="relative mx-auto max-w-7xl px-5 py-20 md:py-28"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.span variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 px-4 py-1.5 text-xs text-muted-foreground">
              <Sparkles className="size-3.5 text-brand-cyan" aria-hidden />
              Fábrica de software colombiana
            </motion.span>

            <motion.h1 variants={fadeUp} className="mt-6 max-w-4xl text-4xl leading-tight font-extrabold md:text-6xl">
              Software a la medida que <span className="brand-gradient-text">piensa como su empresa</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-lg text-muted-foreground">
              En Cerebiia S.A.S diseñamos, construimos y operamos plataformas para compañías que ya
              no caben en una hoja de cálculo. Cotice en línea, deje su guía de proyecto y hable con
              el equipo que lo va a construir.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-9">
              <Link
                to="/cotizar"
                className="btn-solid group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-base font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
              >
                Cotizar mi proyecto en 2 minutos
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            </motion.div>

            <motion.dl variants={staggerContainer} className="mt-14 grid gap-4 sm:grid-cols-3">
              {[
                { k: "Estimación inmediata", v: "Rango de inversión y tiempo al instante" },
                { k: "Brief guiado", v: "Deje su guía sin reuniones previas" },
                { k: "Ruta directa", v: "Los casos grandes llegan a dirección de desarrollo" },
              ].map((item) => (
                <motion.div variants={fadeUp} key={item.k} className="bento p-5">
                  <dt className="text-sm font-semibold text-brand-cyan">{item.k}</dt>
                  <dd className="mt-2 text-sm text-muted-foreground">{item.v}</dd>
                </motion.div>
              ))}
            </motion.dl>
          </motion.div>
        </section>

        {/* Bento de servicios */}
        <section className="mx-auto max-w-7xl px-5 py-16 md:py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeUp} className="text-3xl font-bold md:text-4xl">Lo que construimos</motion.h2>
            <motion.p variants={fadeUp} className="mt-3 max-w-2xl text-muted-foreground">
              Un equipo, varias capacidades. Combinamos producto, ingeniería y datos según lo que su
              negocio necesita mover este trimestre.
            </motion.p>

            <motion.div variants={staggerContainer} className="mt-10 grid auto-rows-[minmax(150px,auto)] gap-4 md:grid-cols-4">
              {SERVICES.map((service) => (
                <motion.article variants={fadeUp} key={service.title} className={`bento flex flex-col p-6 ${service.span}`}>
                  <service.icon className="size-7 text-brand-cyan" aria-hidden />
                  <h3 className="mt-4 text-xl font-semibold">{service.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{service.text}</p>
                </motion.article>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="mt-6">
              <Link
                to="/servicios"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-cyan hover:underline"
              >
                Ver el detalle de cada servicio <ArrowRight className="size-4" aria-hidden />
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* Herramientas interactivas */}
        <section className="mx-auto max-w-7xl px-5 pb-16 md:pb-24">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid gap-4 md:grid-cols-5"
          >
            <motion.article variants={fadeUp} className="bento glow-cyan relative flex flex-col justify-between p-8 md:col-span-3">
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
            </motion.article>

            <motion.article variants={fadeUp} className="bento glow-magenta flex flex-col justify-between p-8 md:col-span-2">
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
            </motion.article>
          </motion.div>
        </section>
        
        {/* Proyectos y Aliados */}
        <ProjectsSection />
        
        {/* Proceso */}
        <section className="mx-auto max-w-7xl px-5 pb-16 md:pb-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeUp} className="text-3xl font-bold md:text-4xl">Cómo trabajamos</motion.h2>
            <motion.div variants={staggerContainer} className="mt-10 grid gap-4 md:grid-cols-4">
              {PROCESS.map((item) => (
                <motion.article variants={fadeUp} key={item.step} className="bento p-6">
                  <span className="brand-gradient-text text-3xl font-extrabold">{item.step}</span>
                  <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
                </motion.article>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Cierre */}
        <section className="mx-auto max-w-7xl px-5 pb-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            className="bento relative overflow-hidden p-8 md:p-14"
          >
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
                    className="btn-solid inline-flex items-center gap-2 rounded-full border border-border bg-transparent px-6 py-3 text-sm font-semibold text-foreground hover:bg-secondary"
                  >
                    Escribirnos
                  </a>
                </div>
              </div>
              <img
                src="/logo.png"
                alt="Marca de Cerebiia S.A.S"
                className="mx-auto hidden w-48 md:block"
                loading="lazy"
              />
            </div>
          </motion.div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}