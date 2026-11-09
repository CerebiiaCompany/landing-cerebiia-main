import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};
const PARTNERS = [
  { id: 1, name: "EnConcreto", image: "/enconcreto.png" },
  { id: 2, name: "Norte Aventuras", image: "/norte-aventuras.png" },
  { id: 3, name: "CENS", image: "/cens.png" },
  { id: 4, name: "Happy BPO", image: "/happy-bpo.png" },
  { id: 5, name: "ASCONFIT", image: "/asconfit.png" },
  { id: 6, name: "ZERO BIKES", image: "/zero-bikes.png" },
];

const PROJECTS = [
  {
    title: "Diseño y Desarrollo Web de EnConcreto",
    description: "EnConcreto Bienes & Servicios es una empresa Norte Santandereana dedicada a la fabricación de productos prefabricados en concreto.",
    color: "bg-brand-cyan/10",
    image: "/Web_EnConcreto.png",
  },
  {
    title: "Videojuego Educativo - Norte de Aventuras",
    description: "Aventúrate con Kra, y conocerás de la historia, cultura, flora y fauna de Norte de Santander.",
    color: "bg-brand-magenta/10",
    image: "/Videojuego_Norte de Aventuras.png",
  },
  {
    title: "Plataforma Web y Videojuego de Cuidamundos",
    description: "Experiencia gamificada de aventura y aprendizaje sobre los CuidaMundos de CENS. ¡Conviértete en Purita, Jirol o Félix y asume el reto!",
    color: "bg-brand-blue/10",
    image: "/Cuidamundos.png",
  },
  {
    title: "Landing Page para Directores de Happy BPO",
    description: "En Happify combinan automatización inteligente con agentes motivados para brindar una atención al cliente humana, ágil y medible.",
    color: "bg-brand-cyan/10",
    image: "/Landing Happy BPO.png",
  },
  {
    title: "Diseño y Desarrollo Web de ASCONFIT",
    description: "ASCONFIT es la primera firma certificada en Cúcuta, ante la Junta Central de Contadores. Con más de 30 años de experiencia y promotora de la Ley ZESE.",
    color: "bg-brand-magenta/10",
    image: "/Web de ASCONFIT.png",
  },
  {
    title: "Desarrollo de la Tienda Virtual de ZERO BIKES",
    description: "Empresa dedicada a fomentar el deporte, la salud y el transporte, amigable con el medio ambiente.",
    color: "bg-brand-blue/10",
    image: "/Tienda Virtual de ZERO BIKES.png",
  },
];

export function ProjectsSection() {
  const [showProjects, setShowProjects] = useState(false);

  return (
    <section className="mx-auto max-w-7xl px-5 pb-16 md:pb-24 overflow-hidden">
      
      {/* SECCIÓN SUPERIOR: Aliados */}
      <div className="grid gap-12 md:grid-cols-2 items-center">
        {/* Izquierda: Texto y Botón */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="max-w-md"
        >
          <motion.h2 variants={fadeUp} className="text-5xl font-extrabold tracking-tight text-foreground md:text-6xl">
            +50 Aliados
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Trabajamos con empresas, instituciones, emprendimientos y organizaciones
            que han confiado en nuestra visión para llevar sus ideas al siguiente nivel. Nos
            comprometemos con relaciones a largo plazo y proyectos que generan
            impacto real.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8">
            <button
              onClick={() => setShowProjects(!showProjects)}
              className="inline-flex items-center justify-center rounded-xl bg-brand-blue/10 px-8 py-3 text-sm font-semibold text-brand-blue transition-colors hover:bg-brand-blue/20 dark:bg-brand-blue/20 dark:text-white dark:hover:bg-brand-blue/30"
            >
              {showProjects ? "Ocultar Proyectos" : "Proyectos"}
            </button>
          </motion.div>
        </motion.div>

       {/* Derecha: Cuadrícula de 6 Logos */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid grid-cols-3 gap-3 md:gap-4"
        >
          {PARTNERS.map((partner) => (
            <motion.div
              variants={fadeUp}
              key={partner.id}
              // Cambiamos p-4 a p-2 para dar más espacio interno
              className="aspect-square flex flex-col items-center justify-center rounded-2xl bg-brand-blue/5 dark:bg-brand-blue/10 p-2 md:p-3 transition-transform hover:scale-105 border border-border/50"
            >
              <img 
                src={partner.image} 
                alt={`Logo de ${partner.name}`} 
                // Aumentamos el tamaño al máximo ancho y alto proporcional
                className="w-[85%] h-[75%] object-contain mb-1" 
                loading="lazy"
              />
              <span className="text-[11px] font-semibold text-brand-blue dark:text-white/80 text-center leading-tight">
                {partner.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* SECCIÓN INFERIOR: Proyectos (Se despliega al hacer clic) */}
      <AnimatePresence>
        {showProjects && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 80 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            className="overflow-hidden"
          >
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {/* Encabezado de Proyectos */}
              <div className="mb-12 max-w-4xl">
                <motion.span variants={fadeUp} className="inline-flex rounded-md bg-secondary px-3 py-1 text-sm font-semibold text-foreground">
                  Tecnología. Estrategia. Propósito.
                </motion.span>
                <motion.h2 variants={fadeUp} className="mt-6 text-4xl font-bold leading-tight md:text-5xl">
                  Proyectos Desarrollados con <span className="text-brand-blue">Empresas</span> que Confían en Nuestra Visión
                </motion.h2>
                <motion.p variants={fadeUp} className="mt-6 text-lg text-muted-foreground leading-relaxed">
                  En CEREBIIA desarrollamos soluciones tecnológicas que responden a necesidades reales de empresas, instituciones y organizaciones. Cada proyecto refleja nuestra filosofía: entender profundamente el problema, diseñar experiencias intuitivas y construir tecnología que potencie procesos, decisiones y resultados.
                </motion.p>
              </div>

              {/* Cuadrícula de Proyectos */}
              <motion.div variants={staggerContainer} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {PROJECTS.map((project, idx) => (
                  <motion.article variants={fadeUp} key={idx} className="bento flex flex-col overflow-hidden bg-card">
                    <div className={`aspect-[16/10] w-full ${project.color} overflow-hidden border-b border-border/50`}>
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105" 
                        loading="lazy"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-xl font-bold leading-tight text-foreground">{project.title}</h3>
                      <p className="mt-3 flex-1 text-sm text-muted-foreground">{project.description}</p>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}