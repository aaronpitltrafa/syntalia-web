import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { goldCtaClasses } from "@/lib/gold-cta-classes";
import { PrivacyNotice } from "@/components/privacy-notice";
import { sendLead } from "@/lib/send-lead";
import { cn } from "@/lib/utils";

const labelClass = "text-[13px] leading-[1.4] font-normal text-cream/68";
const inputClass =
  "mt-[7px] w-full rounded-btn border border-cream/13 bg-[rgb(3_11_36/0.5)] px-[15px] py-[13px] text-[15px] leading-[1.4] font-light text-cream placeholder:text-cream/50 focus:border-transparent focus:outline-2 focus:outline-offset-1 focus:outline-gold";

/**
 * Formulario corto del cierre de la home. Usa el mismo `sendLead` que
 * /diagnostico (misma función de servidor y mismo Resend): los campos que
 * aquí no se piden son opcionales en LeadPayload. Va sobre fondo oscuro:
 * `tema-oscuro` repunta los tokens para que el aviso de privacidad se lea.
 */
export function FormularioCorto() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const gracias = useRef<HTMLDivElement>(null);
  const ids = {
    name: useId(),
    company: useId(),
    phone: useId(),
    email: useId(),
    message: useId(),
    trampa: useId(),
  };

  // Al terminar, el foco pasa al mensaje de gracias: el formulario desaparece
  // y quien navega con teclado o lector de pantalla no se queda en el vacío.
  useEffect(() => {
    if (status === "sent") gracias.current?.focus();
  }, [status]);

  if (status === "sent") {
    return (
      <div
        ref={gracias}
        tabIndex={-1}
        role="status"
        className="grid justify-items-center gap-3 rounded-card border border-gold/35 bg-gold/10 px-6 py-14 text-center outline-none"
      >
        <CheckCircle2 aria-hidden className="h-10 w-10 text-gold-light" />
        <p className="font-display text-[22px] leading-[1.25] font-semibold">
          Gracias, hemos recibido tu proyecto.
        </p>
        <p className="max-w-[34ch] text-[15px] text-cream/72">
          Lo revisamos y te respondemos en menos de 24 horas con los siguientes pasos.
        </p>
      </div>
    );
  }

  return (
    <form
      aria-busy={status === "sending"}
      onSubmit={async (e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        setStatus("sending");
        try {
          await sendLead({
            data: {
              name: String(f.get("name") || ""),
              company: String(f.get("company") || ""),
              phone: String(f.get("phone") || ""),
              email: String(f.get("email") || ""),
              message: String(f.get("message") || ""),
              honeypot: String(f.get("url") || ""),
              source: "Home · Cuéntanos tu proyecto",
            },
          });
          setStatus("sent");
        } catch {
          setStatus("error");
        }
      }}
      className="tema-oscuro relative grid gap-[14px] rounded-card border border-cream/13 bg-cream/5 p-6"
    >
      <div className="grid gap-[14px] min-[560px]:grid-cols-2">
        <div>
          <label htmlFor={ids.name} className={labelClass}>
            Nombre
          </label>
          <input
            id={ids.name}
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Tu nombre"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor={ids.company} className={labelClass}>
            Empresa
          </label>
          <input
            id={ids.company}
            name="company"
            type="text"
            required
            autoComplete="organization"
            placeholder="Nombre de la empresa"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-[14px] min-[560px]:grid-cols-2">
        <div>
          <label htmlFor={ids.phone} className={labelClass}>
            Teléfono o WhatsApp
          </label>
          <input
            id={ids.phone}
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="600 000 000"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor={ids.email} className={labelClass}>
            Email
          </label>
          <input
            id={ids.email}
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="tu@empresa.com"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor={ids.message} className={labelClass}>
          ¿Qué quieres conseguir?
        </label>
        <textarea
          id={ids.message}
          name="message"
          rows={3}
          placeholder="Cuéntanos brevemente tu situación y tu objetivo"
          className={cn(inputClass, "min-h-[84px] resize-y")}
        />
      </div>

      {/* Campo trampa: fuera de pantalla y fuera del orden de tabulación. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={ids.trampa}>No rellenes este campo</label>
        <input id={ids.trampa} name="url" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className={goldCtaClasses(
          "default",
          "w-full disabled:cursor-wait disabled:opacity-80 disabled:hover:translate-y-0",
        )}
      >
        {status === "sending" ? (
          <>
            <Loader2 aria-hidden className="h-4 w-4 animate-spin motion-reduce:animate-none" />
            Enviando…
          </>
        ) : (
          <>
            Solicitar diagnóstico
            <ArrowRight
              aria-hidden
              strokeWidth={2.4}
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-[3px] motion-reduce:transition-none"
            />
          </>
        )}
      </button>

      {status === "error" && (
        <p
          role="alert"
          className="rounded-btn border border-[oklch(0.75_0.15_25/0.5)] bg-[oklch(0.75_0.15_25/0.1)] px-4 py-3 text-[14px] leading-[1.5] text-cream"
        >
          No hemos podido enviarlo. Llámanos al{" "}
          <a
            href="tel:+34672167758"
            className="font-semibold whitespace-nowrap text-gold-light underline"
          >
            +34 672 167 758
          </a>{" "}
          o escríbenos a{" "}
          <a href="mailto:vertice@syntalia.es" className="font-semibold text-gold-light underline">
            vertice@syntalia.es
          </a>
          .
        </p>
      )}

      <PrivacyNotice />
    </form>
  );
}
