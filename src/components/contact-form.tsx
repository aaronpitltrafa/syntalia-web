import { useId } from "react";

export function ContactForm({ compact = false }: { compact?: boolean }) {
  const messageId = useId();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        alert("Gracias. Te contactaremos en breve.");
      }}
      className="grid gap-4"
    >
      <div className={compact ? "grid gap-4" : "grid gap-4 md:grid-cols-2"}>
        <Field label="Nombre y Apellidos" name="name" required />
        <Field label="Teléfono" name="phone" type="tel" required />
      </div>
      <Field label="Correo electrónico" name="email" type="email" required />
      <div>
        <label htmlFor={messageId} className="text-xs uppercase tracking-widest text-muted-foreground">Mensaje *</label>
        <textarea
          id={messageId}
          name="message"
          required
          rows={5}
          className="mt-2 w-full rounded-2xl border border-border bg-background px-5 py-4 text-sm focus:border-accent focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="mt-2 inline-flex items-center justify-center rounded-full bg-primary px-7 py-4 text-xs font-semibold uppercase tracking-wider text-primary-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
      >
        Enviar mensaje
      </button>
    </form>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="text-xs uppercase tracking-widest text-muted-foreground">{label}{required && " *"}</label>
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