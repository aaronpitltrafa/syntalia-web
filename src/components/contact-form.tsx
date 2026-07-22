import { useId, useState } from "react";
import { Loader2 } from "lucide-react";
import { sendLead } from "@/lib/send-lead";
import { PrivacyNotice } from "@/components/privacy-notice";

export function ContactForm({
  compact = false,
  source = "Formulario de contacto",
}: {
  compact?: boolean;
  source?: string;
}) {
  const messageId = useId();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [marketingConsent, setMarketingConsent] = useState(false);

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-accent/30 bg-accent/5 px-6 py-12 text-center">
        <p className="text-lg font-semibold text-primary">¡Gracias!</p>
        <p className="mt-2 text-sm text-foreground/70">
          Hemos recibido tu mensaje. Te contactaremos en menos de 24h.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setStatus("sending");
        const formData = new FormData(e.currentTarget);
        try {
          await sendLead({
            data: {
              name: String(formData.get("name") || ""),
              email: String(formData.get("email") || ""),
              phone: String(formData.get("phone") || ""),
              message: String(formData.get("message") || ""),
              source,
              marketingConsent,
            },
          });
          setStatus("sent");
        } catch {
          setStatus("error");
        }
      }}
      className="grid gap-4"
    >
      <div className={compact ? "grid gap-4" : "grid gap-4 md:grid-cols-2"}>
        <Field label="Nombre y Apellidos" name="name" required />
        <Field label="Teléfono" name="phone" type="tel" required />
      </div>
      <Field label="Correo electrónico" name="email" type="email" required />
      <div>
        <label
          htmlFor={messageId}
          className="text-xs uppercase tracking-widest text-muted-foreground"
        >
          Mensaje *
        </label>
        <textarea
          id={messageId}
          name="message"
          required
          rows={5}
          className="mt-2 w-full rounded-2xl border border-border bg-background px-5 py-4 text-sm focus:border-accent focus:outline-none"
        />
      </div>

      <div className="grid gap-3">
        <label className="flex cursor-pointer items-start gap-3 text-sm text-foreground/70">
          <input
            type="checkbox"
            checked={marketingConsent}
            onChange={(e) => setMarketingConsent(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-gold"
          />
          <span>Quiero recibir comunicaciones comerciales de SYNTALIA VÉRTICE.</span>
        </label>
        <PrivacyNotice />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-xs font-semibold uppercase tracking-wider text-primary-foreground hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-70"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Enviando...
          </>
        ) : (
          "Enviar mensaje"
        )}
      </button>
      {status === "error" && (
        <p className="text-sm font-medium text-destructive">
          No se pudo enviar. Escríbenos directamente a vertice@syntalia.es.
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="text-xs uppercase tracking-widest text-muted-foreground">
        {label}
        {required && " *"}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full rounded-full border border-border bg-background px-5 py-3.5 text-sm focus:border-accent focus:outline-none"
      />
    </div>
  );
}
