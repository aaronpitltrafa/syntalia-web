import type { LeadPayload } from "./send-lead";

/* ------------------------------------------------------------------ */
/* Validación de servidor: un solo sitio para las dos vías (con JS y   */
/* sin JS). No se fía del tipo de nada de lo que llega.                */
/* ------------------------------------------------------------------ */

/** Orígenes conocidos (el `source` de cada formulario). Cualquier otro valor
 *  se cambia por ORIGEN_DESCONOCIDO. Si se añade un formulario o cambia el
 *  título de una página de servicio, hay que añadirlo aquí. */
const ORIGENES = new Set([
  "Home · Cuéntanos tu proyecto",
  "Diagnóstico estratégico gratuito",
  "Contacto",
  "Formulario de contacto",
  ...[
    "Branding Completo",
    "Sistema de Captación de Clientes",
    "Estrategias de Contenido",
    "Desarrollo Web y Optimización",
    "Email Marketing y Automatización",
    "Grabación de Contenido",
    "Gestión de Redes Sociales",
    "SEO para empresas agroalimentarias",
    "Social Ads",
  ].map((t) => `Servicio: ${t}`),
]);
const ORIGEN_DESCONOCIDO = "Web";

const CORTO = 200;
const LARGO = 5000;
const MAX_AREAS = 20;

/** Texto recortado a `max` caracteres; cualquier cosa que no sea texto, "". */
export function texto(v: unknown, max = CORTO) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

/** Una sola línea: sin saltos ni caracteres de control (para el asunto). */
function unaLinea(v: string, max: number) {
  return (
    v
      // eslint-disable-next-line no-control-regex -- quitar caracteres de control es justo lo que se busca
      .replace(/[\u0000-\u001f\u007f]+/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, max)
  );
}

const FORMA_DE_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Lo que llega, limpio y con límites. Si falta lo imprescindible, null. */
export function sanear(d: Record<string, unknown>): LeadPayload | null {
  const lead: LeadPayload = {
    name: texto(d.name),
    email: texto(d.email),
    phone: texto(d.phone),
    message: texto(d.message, LARGO),
    source: ORIGENES.has(texto(d.source)) ? texto(d.source) : ORIGEN_DESCONOCIDO,
    role: texto(d.role),
    company: texto(d.company),
    sector: texto(d.sector),
    revenue: texto(d.revenue),
    employees: texto(d.employees),
    website: texto(d.website),
    challenge: texto(d.challenge, LARGO),
    areas: Array.isArray(d.areas)
      ? d.areas
          .slice(0, MAX_AREAS)
          .map((a) => texto(a))
          .filter(Boolean)
      : [],
    marketingConsent: d.marketingConsent === true,
    honeypot: texto(d.honeypot),
  };
  if (!lead.name || !FORMA_DE_CORREO.test(lead.email)) return null;
  return lead;
}

/** Asunto del correo: el origen ya es de la lista cerrada; el nombre va en
 *  una línea y corto. Si no queda nada, un texto fijo. */
export function asunto(lead: LeadPayload) {
  return unaLinea(`Nuevo lead — ${lead.source} — ${unaLinea(lead.name, 80)}`, 160) || "Nuevo lead";
}
