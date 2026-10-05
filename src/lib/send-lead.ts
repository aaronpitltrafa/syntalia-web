import { createServerFn } from "@tanstack/react-start";
import { asunto, sanear, texto } from "@/lib/lead-saneado";
import { legalData } from "@/lib/legal-data";

export type LeadPayload = {
  name: string;
  email: string;
  phone: string;
  message?: string;
  source: string;
  // Diagnóstico estratégico — campos adicionales, opcionales para no romper
  // los formularios más simples (LeadForm, ContactForm) que no los envían.
  role?: string;
  company?: string;
  sector?: string;
  revenue?: string;
  employees?: string;
  website?: string;
  challenge?: string;
  areas?: string[];
  marketingConsent?: boolean;
  /** Campo trampa: invisible para personas. Si llega relleno, es un bot. */
  honeypot?: string;
};

/**
 * Sin JavaScript, el formulario del cierre de la home se envía como un
 * formulario HTML normal a la URL de esta misma función (sin endpoint
 * nuevo) y llega como FormData. Se traduce a los mismos campos que manda
 * la versión con JS, con el campo trampa incluido (`url`). `volverA` es la
 * página a la que se redirige después, porque quien envía sin JS tiene que
 * ver una página y no una respuesta JSON.
 */
type Entrada = Record<string, unknown> & { volverA?: string };

function desdeFormulario(f: FormData): Entrada {
  const campo = (k: string) => {
    const v = f.get(k);
    return typeof v === "string" ? v : "";
  };
  const volverA = campo("volverA");
  return {
    name: campo("name"),
    company: campo("company"),
    phone: campo("phone"),
    email: campo("email"),
    message: campo("message"),
    // Opciones marcadas del formulario de /diagnostico (la home no las manda).
    areas: f.getAll("areas").filter((v): v is string => typeof v === "string"),
    honeypot: campo("url"),
    source: campo("source"),
    // Solo rutas de esta web, nunca una URL de fuera.
    volverA: volverA.startsWith("/") && !volverA.startsWith("//") ? volverA : "/",
  };
}

/** El mismo mensaje que ya da el formulario cuando falla, sin más detalle. */
const ERROR_ENVIO = "No se pudo enviar el formulario.";

/** Redirección 303: el navegador vuelve a la página con un GET. */
function volver(destino: string, envio: "ok" | "error") {
  const [ruta, ancla] = destino.split("#");
  const url = `${ruta}${ruta.includes("?") ? "&" : "?"}envio=${envio}${ancla ? `#${ancla}` : ""}`;
  return new Response(null, { status: 303, headers: { Location: url } });
}

// `vite dev` runs TanStack Start server functions in a plain Node module
// runner, not inside the Cloudflare Worker simulation — so `.dev.vars` is
// never loaded into `process.env` automatically. We parse it ourselves as a
// local-dev convenience. In production (real Cloudflare deploy), this file
// won't exist, `existsSync` returns false, and `process.env` is populated
// for real by Wrangler secrets, per Cloudflare's documented nodejs_compat behavior.
let devVarsLoaded = false;
async function loadDevVarsOnce() {
  if (devVarsLoaded || process.env.RESEND_API_KEY) return;
  devVarsLoaded = true;
  try {
    const { existsSync, readFileSync } = await import("node:fs");
    const { join } = await import("node:path");
    const path = join(process.cwd(), ".dev.vars");
    if (!existsSync(path)) return;
    const content = readFileSync(path, "utf-8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      let value = trimmed.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (!(key in process.env)) process.env[key] = value;
    }
  } catch {
    // Not available in this runtime — fine, production relies on real secrets.
  }
}

async function getEnvVar(name: string): Promise<string | undefined> {
  await loadDevVarsOnce();
  return process.env[name];
}

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );
}

// strict.input en false: el tipo de entrada es LeadPayload | FormData, y
// Start solo acepta FormData en la validación si es el único tipo.
export const sendLead = createServerFn({ method: "POST", strict: { input: false } })
  .validator((data: LeadPayload | FormData): Entrada =>
    data instanceof FormData
      ? desdeFormulario(data)
      : typeof data === "object" && data !== null
        ? { ...(data as Record<string, unknown>), volverA: undefined }
        : {},
  )
  .handler(async ({ data }) => {
    // Con JS (la de siempre): un error se lanza y el formulario enseña su
    // mensaje. Sin JS: de vuelta a la página con ?envio=ok o ?envio=error.
    const { volverA } = data;
    if (!volverA) return enviar(data);
    try {
      await enviar(data);
      return volver(volverA, "ok");
    } catch {
      return volver(volverA, "error");
    }
  });

async function enviar(entrada: Record<string, unknown>) {
  // Un bot que rellena el campo trampa recibe un "ok" y no se envía nada:
  // así no aprende que lo hemos descartado.
  if (texto(entrada.honeypot)) return { ok: true as const };

  const data = sanear(entrada);
  if (!data) throw new Error(ERROR_ENVIO);

  const apiKey = await getEnvVar("RESEND_API_KEY");
  if (!apiKey) {
    console.error("RESEND_API_KEY no está configurada.");
    throw new Error("El envío no está disponible ahora mismo.");
  }

  const to = (await getEnvVar("LEAD_NOTIFICATION_EMAIL")) || legalData.email;
  const from = (await getEnvVar("LEAD_FROM_EMAIL")) || "Syntalia Vértice <onboarding@resend.dev>";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: data.email,
      subject: asunto(data),
      html: `
          <h2>Nuevo contacto desde: ${escapeHtml(data.source)}</h2>
          <p><strong>Nombre:</strong> ${escapeHtml(data.name)}</p>
          ${data.role ? `<p><strong>Cargo:</strong> ${escapeHtml(data.role)}</p>` : ""}
          <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
          <p><strong>Teléfono:</strong> ${escapeHtml(data.phone)}</p>
          ${data.company ? `<p><strong>Empresa:</strong> ${escapeHtml(data.company)}</p>` : ""}
          ${data.sector ? `<p><strong>Sector:</strong> ${escapeHtml(data.sector)}</p>` : ""}
          ${data.revenue ? `<p><strong>Facturación aproximada:</strong> ${escapeHtml(data.revenue)}</p>` : ""}
          ${data.employees ? `<p><strong>Número de empleados:</strong> ${escapeHtml(data.employees)}</p>` : ""}
          ${data.website ? `<p><strong>Web / perfil:</strong> ${escapeHtml(data.website)}</p>` : ""}
          ${data.challenge ? `<p><strong>Principal reto:</strong><br>${escapeHtml(data.challenge).replace(/\n/g, "<br>")}</p>` : ""}
          ${data.areas?.length ? `<p><strong>Áreas de interés:</strong> ${escapeHtml(data.areas.join(", "))}</p>` : ""}
          ${data.message ? `<p><strong>Mensaje:</strong><br>${escapeHtml(data.message).replace(/\n/g, "<br>")}</p>` : ""}
          <p><strong>Comunicaciones comerciales:</strong> ${data.marketingConsent ? "Sí, ha dado su consentimiento" : "No"}</p>
        `,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Resend error:", response.status, errorText);
    throw new Error("No se pudo enviar el formulario.");
  }

  return { ok: true as const };
}
