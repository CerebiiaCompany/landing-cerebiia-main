import { z } from "zod";

const shortText = z.string().trim().max(200);
const longText = z.string().trim().max(2000);

export const quoteSchema = z.object({
  fullName: z.string().trim().min(2, "Escriba su nombre").max(120),
  company: shortText.optional().default(""),
  email: z.string().trim().email("Correo inválido").max(255),
  phone: shortText.optional().default(""),
  projectType: z.string().trim().min(1).max(60),
  scopeModules: z.array(z.string().trim().max(60)).max(30).default([]),
  platforms: z.array(z.string().trim().max(60)).max(10).default([]),
  integrations: z.array(z.string().trim().max(60)).max(20).default([]),
  urgency: z.string().trim().min(1).max(40),
  budgetRange: shortText.optional().default(""),
  brief: z.object({
    objective: longText.default(""),
    users: longText.default(""),
    mustHaves: longText.default(""),
    references: longText.default(""),
    deliverables: longText.default(""),
  }),
});

export type QuoteInput = z.infer<typeof quoteSchema>;

export const appointmentSchema = z.object({
  fullName: z.string().trim().min(2, "Escriba su nombre").max(120),
  company: shortText.optional().default(""),
  email: z.string().trim().email("Correo inválido").max(255),
  phone: shortText.optional().default(""),
  preferredDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Seleccione una fecha"),
  timeSlot: z.string().trim().min(1).max(40),
  channel: z.string().trim().min(1).max(40),
  topic: z.string().trim().min(4, "Cuéntenos el tema").max(300),
  notes: longText.optional().default(""),
});

export type AppointmentInput = z.infer<typeof appointmentSchema>;

export const statusSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["nuevo", "contactado", "en_propuesta", "cerrado", "descartado", "solicitada", "confirmada", "realizada", "cancelada"]),
  kind: z.enum(["quote", "appointment"]),
});
