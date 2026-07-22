import { createServerFn } from "@tanstack/react-start";

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
};

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

export const sendLead = createServerFn({ method: "POST" })
  .validator((data: LeadPayload) => data)
  .handler(async ({ data }) => {
    const apiKey = await getEnvVar("RESEND_API_KEY");
    if (!apiKey) {
      console.error("RESEND_API_KEY no está configurada.");
      throw new Error("El envío no está disponible ahora mismo.");
    }

    const to = (await getEnvVar("LEAD_NOTIFICATION_EMAIL")) || "vertice@syntalia.es";
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
        subject: `Nuevo lead — ${data.source} — ${data.name}`,
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
  });
