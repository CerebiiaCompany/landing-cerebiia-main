# Cerebiia S.A.S — Landing page interactiva

Nueva landing page (reemplaza la página placeholder en `/`) para Cerebiia S.A.S, software a la medida, con dos herramientas interactivas: **cotizador aproximado** y **agenda de citas**, ambas guardando en base de datos con panel interno.

## Dirección visual

- Paleta "Cerebiia Neón" tomada del logo: fondo `#0a0a1a`, superficie `#0e1b3d`, acento primario cian `#2dd4f5`, acento secundario magenta `#b026ff`. Degradado de marca cian → azul → magenta siguiendo el círculo cromático (análogos cian/azul + acento magenta como complemento visual de alto contraste).
- Tipografía: **Sora** para titulares, **Manrope** para texto, cargadas por `<link>` en la raíz.
- Estructura **bento grid**: módulos de distintos tamaños con superficies de vidrio, bordes sutiles y glow del acento. Movimiento contenido (reveal al hacer scroll, hover con elevación de glow).
- Logo de Cerebiia como asset CDN, usado en nav, footer y favicon.

## Secciones

1. **Hero** — degradado de marca, titular de propuesta de valor, un solo CTA hacia el cotizador.
2. **Bento de servicios** — desarrollo a medida, integraciones/APIs, IA y automatización, apps móviles, datos, mantenimiento; tarjetas de tamaños mixtos.
3. **Cómo trabajamos** — proceso en pasos compactos dentro del grid.
4. **Cotizador interactivo (`/cotizar`)** — asistente por pasos: tipo de proyecto, alcance/módulos, plataformas, integraciones, urgencia, presupuesto estimado y datos de contacto. Calcula un **rango aproximado en COP/USD** en el cliente con reglas transparentes y lo muestra al instante junto con un resumen del brief.
5. **Constructor de brief/guía** — dentro del mismo flujo: campos guiados (objetivo, usuarios, funciones imprescindibles, referencias, entregables) que producen un documento resumen descargable, para que el cliente deje su guía sin reuniones previas.
6. **Agendar cita (`/agendar`)** — formulario con fecha, franja horaria, canal (video/llamada/presencial), tema y datos de contacto.
7. **Priorización automática** — si el proyecto estimado supera un umbral de tamaño/presupuesto, la solicitud se marca `prioridad: alta / jefe de desarrollo` y aparece destacada en el panel interno.
8. **Contacto y footer** — datos de Cerebiia, WhatsApp/email, redes.
9. **Panel interno (`/admin`, protegido)** — lista de cotizaciones y citas con estado, filtro por prioridad y detalle del brief.

## Detalles técnicos

- Se activa **Lovable Cloud** para base de datos y autenticación del panel.
- Tablas: `quote_requests` (datos de contacto, respuestas del asistente en JSONB, rango estimado, prioridad, estado) y `appointments` (contacto, fecha/franja, canal, tema, estado). Ambas con GRANTs explícitos, RLS activo: `INSERT` público (anon) para los formularios, `SELECT/UPDATE` solo para administradores.
- Roles en tabla aparte `user_roles` + función `has_role` (security definer); el panel valida el rol en el servidor, nunca en el cliente.
- Escrituras vía server functions con validación Zod (largos máximos, email válido, sanitización); el panel lee bajo la sesión autenticada.
- Rutas TanStack: `/`, `/cotizar`, `/agendar`, `/admin` bajo el layout autenticado. Cada ruta con su propio `head()` (title, description, og, canonical) y JSON-LD de Organization en la raíz.
- Sin emails por ahora; queda listo para añadir notificación al jefe de desarrollo después.
- Página responsive, accesible (contraste verificado sobre fondo oscuro), contenido en español de Colombia.
