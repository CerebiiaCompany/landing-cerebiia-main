// Lógica de estimación aproximada para el cotizador de Cerebiia.
// Valores en pesos colombianos (COP). Reglas transparentes y compartidas
// entre el formulario y el resumen del brief.

export type Option = {
  id: string;
  label: string;
  description?: string;
  base?: number;
  weeks?: number;
  factor?: number;
};

export const PROJECT_TYPES: Option[] = [
  {
    id: "web-corporativa",
    label: "Sitio web corporativo",
    description: "Presencia digital, contenido y captación de clientes.",
    base: 6_500_000,
    weeks: 3,
  },
  {
    id: "software-medida",
    label: "Software a la medida",
    description: "Sistema interno diseñado para su operación.",
    base: 28_000_000,
    weeks: 10,
  },
  {
    id: "ecommerce",
    label: "Tienda en línea",
    description: "Catálogo, pagos y logística.",
    base: 18_000_000,
    weeks: 7,
  },
  {
    id: "app-movil",
    label: "Aplicación móvil",
    description: "iOS y Android con backend propio.",
    base: 32_000_000,
    weeks: 12,
  },
  {
    id: "ia-automatizacion",
    label: "IA y automatización",
    description: "Agentes, procesamiento de documentos, chatbots.",
    base: 22_000_000,
    weeks: 8,
  },
  {
    id: "integraciones",
    label: "Integraciones y APIs",
    description: "Conectar sistemas existentes (ERP, CRM, facturación).",
    base: 14_000_000,
    weeks: 5,
  },
];

export const SCOPE_MODULES: Option[] = [
  { id: "auth", label: "Usuarios y roles", base: 3_200_000, weeks: 1 },
  { id: "dashboard", label: "Panel con indicadores", base: 4_500_000, weeks: 2 },
  { id: "pagos", label: "Pagos en línea", base: 5_200_000, weeks: 2 },
  { id: "facturacion", label: "Facturación electrónica", base: 7_800_000, weeks: 3 },
  { id: "inventario", label: "Inventario / bodegas", base: 6_400_000, weeks: 2 },
  { id: "crm", label: "CRM y seguimiento comercial", base: 5_600_000, weeks: 2 },
  { id: "reportes", label: "Reportes y exportables", base: 3_400_000, weeks: 1 },
  { id: "notificaciones", label: "Notificaciones (correo / WhatsApp)", base: 2_800_000, weeks: 1 },
  { id: "ia", label: "Módulo con inteligencia artificial", base: 9_500_000, weeks: 3 },
  { id: "multiempresa", label: "Multiempresa / multisede", base: 6_800_000, weeks: 2 },
];

export const PLATFORMS: Option[] = [
  { id: "web", label: "Web", factor: 1 },
  { id: "ios", label: "iOS", factor: 1.18 },
  { id: "android", label: "Android", factor: 1.18 },
  { id: "escritorio", label: "Escritorio", factor: 1.12 },
];

export const INTEGRATIONS: Option[] = [
  { id: "erp", label: "ERP (SAP, Siigo, World Office)", base: 5_500_000, weeks: 2 },
  { id: "dian", label: "DIAN / facturación", base: 6_200_000, weeks: 2 },
  { id: "pasarela", label: "Pasarela de pagos", base: 3_800_000, weeks: 1 },
  { id: "whatsapp", label: "WhatsApp Business", base: 3_400_000, weeks: 1 },
  { id: "logistica", label: "Transportadoras / logística", base: 4_200_000, weeks: 1 },
  { id: "otros", label: "Otros servicios externos", base: 3_000_000, weeks: 1 },
];

export const URGENCIES: Option[] = [
  { id: "flexible", label: "Flexible", description: "Podemos planear con calma", factor: 0.95 },
  { id: "normal", label: "Normal", description: "Arrancar en las próximas semanas", factor: 1 },
  { id: "urgente", label: "Urgente", description: "Necesitamos acelerar el equipo", factor: 1.25 },
];

export const BUDGET_RANGES: Option[] = [
  { id: "menos-10", label: "Menos de $10 millones" },
  { id: "10-30", label: "$10 a $30 millones" },
  { id: "30-80", label: "$30 a $80 millones" },
  { id: "mas-80", label: "Más de $80 millones" },
  { id: "por-definir", label: "Por definir" },
];

export const TIME_SLOTS: Option[] = [
  { id: "08-10", label: "8:00 – 10:00 a.m." },
  { id: "10-12", label: "10:00 a.m. – 12:00 m." },
  { id: "14-16", label: "2:00 – 4:00 p.m." },
  { id: "16-18", label: "4:00 – 6:00 p.m." },
];

export const CHANNELS: Option[] = [
  { id: "video", label: "Videollamada" },
  { id: "llamada", label: "Llamada telefónica" },
  { id: "presencial", label: "Presencial" },
];

export type QuoteSelection = {
  projectType: string;
  scopeModules: string[];
  platforms: string[];
  integrations: string[];
  urgency: string;
};

export type Estimate = {
  min: number;
  max: number;
  weeksMin: number;
  weeksMax: number;
  priority: "normal" | "alta";
};

function find(list: Option[], id: string) {
  return list.find((option) => option.id === id);
}

export function calculateEstimate(selection: QuoteSelection): Estimate {
  const type = find(PROJECT_TYPES, selection.projectType);
  let base = type?.base ?? 8_000_000;
  let weeks = type?.weeks ?? 4;

  for (const id of selection.scopeModules) {
    const module = find(SCOPE_MODULES, id);
    base += module?.base ?? 0;
    weeks += module?.weeks ?? 0;
  }

  for (const id of selection.integrations) {
    const integration = find(INTEGRATIONS, id);
    base += integration?.base ?? 0;
    weeks += integration?.weeks ?? 0;
  }

  const platformFactor = selection.platforms.reduce((acc, id) => {
    const platform = find(PLATFORMS, id);
    return acc * (platform?.factor ?? 1);
  }, 1);

  const urgencyFactor = find(URGENCIES, selection.urgency)?.factor ?? 1;

  const center = base * platformFactor * urgencyFactor;
  const min = Math.round((center * 0.85) / 100_000) * 100_000;
  const max = Math.round((center * 1.25) / 100_000) * 100_000;
  const weeksTotal = Math.max(2, Math.round(weeks * Math.min(platformFactor, 1.4)));

  return {
    min,
    max,
    weeksMin: weeksTotal,
    weeksMax: weeksTotal + Math.max(2, Math.round(weeksTotal * 0.35)),
    priority: max >= 60_000_000 || weeksTotal >= 14 ? "alta" : "normal",
  };
}

export function formatCOP(value: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
}

export function labelsFor(list: Option[], ids: string[]): string[] {
  return ids.map((id) => find(list, id)?.label ?? id);
}

export type Brief = {
  objective: string;
  users: string;
  mustHaves: string;
  references: string;
  deliverables: string;
};

export function buildBriefText(input: {
  contact: { fullName: string; company: string; email: string; phone: string };
  selection: QuoteSelection;
  budget: string;
  brief: Brief;
  estimate: Estimate;
}): string {
  const { contact, selection, brief, estimate, budget } = input;
  return [
    "GUÍA DE PROYECTO — CEREBIIA S.A.S",
    "",
    `Contacto: ${contact.fullName}${contact.company ? ` (${contact.company})` : ""}`,
    `Correo: ${contact.email}${contact.phone ? ` · Teléfono: ${contact.phone}` : ""}`,
    "",
    `Tipo de proyecto: ${find(PROJECT_TYPES, selection.projectType)?.label ?? "-"}`,
    `Módulos: ${labelsFor(SCOPE_MODULES, selection.scopeModules).join(", ") || "-"}`,
    `Plataformas: ${labelsFor(PLATFORMS, selection.platforms).join(", ") || "-"}`,
    `Integraciones: ${labelsFor(INTEGRATIONS, selection.integrations).join(", ") || "-"}`,
    `Urgencia: ${find(URGENCIES, selection.urgency)?.label ?? "-"}`,
    `Presupuesto indicado: ${find(BUDGET_RANGES, budget)?.label ?? "-"}`,
    "",
    "BRIEF",
    `Objetivo: ${brief.objective || "-"}`,
    `Usuarios: ${brief.users || "-"}`,
    `Funciones imprescindibles: ${brief.mustHaves || "-"}`,
    `Referencias: ${brief.references || "-"}`,
    `Entregables esperados: ${brief.deliverables || "-"}`,
    "",
    "ESTIMACIÓN APROXIMADA",
    `Inversión: ${formatCOP(estimate.min)} – ${formatCOP(estimate.max)}`,
    `Tiempo: ${estimate.weeksMin} a ${estimate.weeksMax} semanas`,
    `Prioridad: ${estimate.priority === "alta" ? "Alta — dirección de desarrollo" : "Normal"}`,
    "",
    "Esta estimación es aproximada y se ajusta tras la sesión de descubrimiento.",
  ].join("\n");
}
