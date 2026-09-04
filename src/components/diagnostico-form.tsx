import { useId, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { sendLead } from "@/lib/send-lead";
import { PrivacyNotice } from "@/components/privacy-notice";

const REVENUE_OPTIONS = [
  "Menos de 100.000 €",
  "100.000 € – 500.000 €",
  "500.000 € – 1 M €",
  "1 M € – 5 M €",
  "Más de 5 M €",
];

const EMPLOYEES_OPTIONS = ["1-5", "6-20", "21-50", "51-200", "Más de 200"];

const AREA_OPTIONS = [
  "Posicionamiento",
  "Página web",
  "Captación de clientes",
  "Redes sociales",
  "Contenido",
  "Automatización y sistemas",
  "Publicidad",
  "Otro",
];

const labelClass = "text-xs font-bold uppercase tracking-widest text-muted-foreground";
const inputClass =
  "mt-2 w-full rounded-2xl border border-border bg-background px-5 py-3.5 text-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30";

/**
 * Full diagnostic-request form for /diagnostico. Reuses the same `sendLead`
 * server function as the simpler home/contact forms — the extra fields are
 * all optional on `LeadPayload` so those callers keep working unchanged.
 */
export function DiagnosticoForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [areas, setAreas] = useState<string[]>([]);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [areasError, setAreasError] = useState(false);

  const nameId = useId();
  const roleId = useId();
  const emailId = useId();
  const phoneId = useId();
  const companyId = useId();
  const sectorId = useId();
  const revenueId = useId();
  const employeesId = useId();
  const websiteId = useId();
  const challengeId = useId();

  if (status === "sent") {
    return (
      <div className="flex scroll-mt-28 flex-col items-center justify-center gap-3 rounded-3xl border border-gold/30 bg-gold/10 px-6 py-16 text-center">
        <CheckCircle2 className="h-10 w-10 text-gold" />
        <p className="text-lg font-semibold text-cream">Hemos recibido tu solicitud.</p>
        <p className="max-w-sm text-sm text-foreground/70">
          Revisaremos tu empresa y nos pondremos en contacto contigo.
        </p>
      </div>
    );
  }

  function toggleArea(area: string) {
    setAreas((prev) => (prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]));
    setAreasError(false);
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        if (areas.length === 0) {
          setAreasError(true);
          return;
        }

        const formData = new FormData(e.currentTarget);
        setStatus("sending");
        try {
          await sendLead({
            data: {
              name: String(formData.get("name") || ""),
              email: String(formData.get("email") || ""),
              phone: String(formData.get("phone") || ""),
              role: String(formData.get("role") || ""),
              company: String(formData.get("company") || ""),
              sector: String(formData.get("sector") || ""),
              revenue: String(formData.get("revenue") || ""),
              employees: String(formData.get("employees") || ""),
              website: String(formData.get("website") || ""),
              challenge: String(formData.get("challenge") || ""),
              areas,
              marketingConsent,
              source: "Diagnóstico estratégico gratuito",
            },
          });
          setStatus("sent");
        } catch {
          setStatus("error");
        }
      }}
      className="grid gap-10"
    >
      {/* 01 — Datos personales */}
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold-light">
          01 · Datos personales
        </p>
        <div className="mt-5 grid gap-4">
          <div>
            <label htmlFor={nameId} className={labelClass}>
              Nombre y apellidos *
            </label>
            <input
              id={nameId}
              name="name"
              type="text"
              required
              placeholder="¿Cómo te llamas?"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor={roleId} className={labelClass}>
              Cargo o puesto *
            </label>
            <input
              id={roleId}
              name="role"
              type="text"
              required
              placeholder="Ej. Dirección general"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor={emailId} className={labelClass}>
              Correo electrónico *
            </label>
            <input
              id={emailId}
              name="email"
              type="email"
              required
              placeholder="tunombre@empresa.com"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor={phoneId} className={labelClass}>
              Teléfono *
            </label>
            <input
              id={phoneId}
              name="phone"
              type="tel"
              required
              placeholder="600 000 000"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* 02 — Sobre tu empresa */}
      <div className="border-t border-border pt-8">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold-light">
          02 · Sobre tu empresa
        </p>
        <div className="mt-5 grid gap-4">
          <div>
            <label htmlFor={companyId} className={labelClass}>
              Nombre de la empresa *
            </label>
            <input id={companyId} name="company" type="text" required className={inputClass} />
          </div>
          <div>
            <label htmlFor={sectorId} className={labelClass}>
              Sector *
            </label>
            <input id={sectorId} name="sector" type="text" required className={inputClass} />
          </div>
          <div>
            <label htmlFor={revenueId} className={labelClass}>
              Facturación aproximada anual *
            </label>
            <select id={revenueId} name="revenue" required defaultValue="" className={inputClass}>
              <option value="" disabled>
                Selecciona un rango
              </option>
              {REVENUE_OPTIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor={employeesId} className={labelClass}>
              Número de empleados *
            </label>
            <select
              id={employeesId}
              name="employees"
              required
              defaultValue=""
              className={inputClass}
            >
              <option value="" disabled>
                Selecciona un rango
              </option>
              {EMPLOYEES_OPTIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor={websiteId} className={labelClass}>
              Web o perfil principal (opcional)
            </label>
            <input
              id={websiteId}
              name="website"
              type="text"
              placeholder="tuempresa.com"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* 03 — Situación actual */}
      <div className="border-t border-border pt-8">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold-light">
          03 · Situación actual
        </p>
        <div className="mt-5 grid gap-5">
          <div>
            <label htmlFor={challengeId} className={labelClass}>
              ¿Cuál es el principal reto de tu empresa ahora mismo? *
            </label>
            <textarea id={challengeId} name="challenge" required rows={4} className={inputClass} />
          </div>

          <div>
            <p className={labelClass}>¿En qué áreas necesitas ayuda? *</p>
            <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {AREA_OPTIONS.map((area) => {
                const checked = areas.includes(area);
                return (
                  <label
                    key={area}
                    className={cn(
                      "flex cursor-pointer items-center gap-2.5 rounded-xl border px-4 py-3 text-sm transition-colors",
                      checked
                        ? "border-gold bg-gold/10 text-cream"
                        : "border-border text-foreground/70 hover:border-gold/40",
                    )}
                  >
                    <input
                      type="checkbox"
                      className="h-4 w-4 shrink-0 accent-gold"
                      checked={checked}
                      onChange={() => toggleArea(area)}
                    />
                    {area}
                  </label>
                );
              })}
            </div>
            {areasError && (
              <p className="mt-2 text-xs font-medium text-red-500">
                Selecciona al menos una opción.
              </p>
            )}
          </div>

          <div>
            <label className="flex cursor-pointer items-start gap-3 text-sm text-foreground/70">
              <input
                type="checkbox"
                checked={marketingConsent}
                onChange={(e) => setMarketingConsent(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-gold"
              />
              <span>Quiero recibir comunicaciones comerciales de SYNTALIA VÉRTICE.</span>
            </label>
          </div>

          <PrivacyNotice />
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-7 py-4 text-sm font-bold uppercase tracking-wide text-navy transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-10px_oklch(0.745_0.135_82/0.55)] disabled:opacity-70"
        >
          {status === "sending" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Enviando...
            </>
          ) : (
            <>
              Quiero mi diagnóstico gratuito <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
        <p className="mt-4 text-center text-xs text-foreground/50">
          Sin compromiso · Respuesta en menos de 24h · Información confidencial
        </p>
        {status === "error" && (
          <p className="mt-3 text-center text-[13px] font-medium text-red-500">
            No se pudo enviar. Escríbenos directamente a vertice@syntalia.es.
          </p>
        )}
      </div>
    </form>
  );
}
