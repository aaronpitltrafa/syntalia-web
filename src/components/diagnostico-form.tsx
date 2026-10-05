import { useEffect, useId, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { goldCtaClasses } from "@/lib/gold-cta-classes";
import { legalData } from "@/lib/legal-data";
import { sendLead } from "@/lib/send-lead";
import { WHATSAPP_URL } from "@/lib/site";
import { PrivacyNotice } from "@/components/privacy-notice";
import { WhatsAppIcon } from "@/components/whatsapp-icon";

/** El mismo `source` de siempre: el servidor solo acepta los de su lista. */
const SOURCE = "Diagnóstico estratégico gratuito";

const CONFIANZA = ["Sin compromiso", "Respuesta en menos de 24 h", "Información confidencial"];

const MEJORAS = [
  "Captar más oportunidades",
  "Mejorar el seguimiento comercial",
  "Automatizar procesos",
  "Mejorar la presencia digital",
  "Otro",
];

/** Correo con dominio y extensión: el navegador da por bueno "ana@empresa". */
const FORMA_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PATRON_EMAIL = String.raw`[^@\s]+@[^@\s]+\.[^@\s]{2,}`;
/** Teléfono: cifras, espacios, +, guiones, puntos y paréntesis; de 9 a 15 cifras. */
const PATRON_TELEFONO = String.raw`\+?[\d\s().\-]{9,22}`;

function telefonoValido(v: string) {
  if (!/^\+?[\d\s().-]+$/.test(v)) return false;
  const cifras = v.replace(/\D/g, "").length;
  return cifras >= 9 && cifras <= 15;
}

type Campo = "name" | "phone" | "email" | "company" | "privacy";
const CAMPOS: readonly Campo[] = ["name", "phone", "email", "company", "privacy"];

function errorDe(campo: Campo, form: HTMLFormElement): string | undefined {
  const el = form.elements.namedItem(campo) as HTMLInputElement | null;
  if (!el) return;
  if (campo === "privacy")
    return el.checked ? undefined : "Acepta la Política de Privacidad para enviar la solicitud.";
  const v = el.value.trim();
  switch (campo) {
    case "name":
      return v.length >= 2 ? undefined : "Escribe tu nombre.";
    case "phone":
      if (!v) return "Escribe tu teléfono.";
      return telefonoValido(v) ? undefined : "Revisa el teléfono (por ejemplo, 600 000 000).";
    case "email":
      if (!v) return "Escribe tu email.";
      return FORMA_EMAIL.test(v) ? undefined : "Revisa el email (por ejemplo, ana@empresa.com).";
    case "company":
      return v ? undefined : "Escribe el nombre de tu empresa.";
  }
}

/* Por debajo de 768 px la letra de los campos va a 16 px: con menos, Safari
   en iPhone amplía la página al enfocar el campo y no la devuelve. */
const inputClass =
  "mt-2 block w-full rounded-btn border border-[color:var(--campo-borde)] bg-background px-4 py-3.5 text-base text-foreground placeholder:text-foreground/45 " +
  "transition-[border-color,box-shadow] duration-150 focus:border-navy focus:outline-none focus:ring-[3px] focus:ring-[color-mix(in_oklab,var(--gold)_45%,transparent)] " +
  "aria-[invalid=true]:border-[#B42318] motion-reduce:transition-none md:text-[15px]";
const labelClass = "block text-[13.5px] font-medium leading-snug text-foreground";
const errorClass = "mt-1.5 text-[12.5px] leading-snug text-[#B42318]";

type Estado = "rellenando" | "enviando" | "enviado" | "error";

/**
 * Formulario de /diagnostico: cuatro datos, qué quiere mejorar (opcional) y
 * la casilla de privacidad. Usa el mismo sendLead que el resto de
 * formularios, con el mismo `source`.
 *
 * Sin JavaScript (o antes de hidratar) es un formulario HTML normal que
 * apunta a la URL de sendLead, con la validación del navegador; sendLead
 * vuelve a /diagnostico con ?envio=ok o ?envio=error (`envioInicial`).
 *
 * Las opciones son casillas nativas con aspecto de chip, y el campo de
 * "Otro" se muestra solo con CSS (:has), así que funciona igual sin JS.
 *
 * La confirmación ocupa la misma celda que el formulario (que se queda
 * invisible pero con su alto): la página no encoge al llegar la respuesta.
 */
export function DiagnosticoForm({ envioInicial }: { envioInicial?: "ok" | "error" }) {
  const [estado, setEstado] = useState<Estado>(
    envioInicial === "ok" ? "enviado" : envioInicial === "error" ? "error" : "rellenando",
  );
  const [errores, setErrores] = useState<Partial<Record<Campo, string>>>({});
  const [conJs, setConJs] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const recibido = useRef<HTMLHeadingElement>(null);
  /** Solo tras un envío hecho aquí: al volver con ?envio=ok no se mueve el foco. */
  const acabaDeEnviar = useRef(false);
  const uid = useId();
  const id = (c: string) => `${uid}-${c}`;

  // Con JS valida el formulario (sin JS, el navegador con `required`).
  useEffect(() => setConJs(true), []);

  useEffect(() => {
    if (estado === "enviado" && acabaDeEnviar.current) recibido.current?.focus();
  }, [estado]);

  /** Revisa un campo y guarda (o quita) su error. */
  function revisar(campo: Campo) {
    if (!form.current) return;
    const error = errorDe(campo, form.current);
    setErrores((e) => (e[campo] === error ? e : { ...e, [campo]: error }));
  }

  /** Mientras escribe solo se quita el error que ya había; no aparecen nuevos. */
  function alCambiar(campo: Campo) {
    if (errores[campo]) revisar(campo);
  }

  /** Al salir del campo, si ha escrito algo, se comprueba el formato. */
  function alSalir(campo: Campo, valor: string) {
    if (valor.trim()) revisar(campo);
  }

  async function alEnviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (estado === "enviando" || estado === "enviado") return;
    const el = e.currentTarget;
    const nuevos = Object.fromEntries(CAMPOS.map((c) => [c, errorDe(c, el)])) as Partial<
      Record<Campo, string>
    >;
    setErrores(nuevos);
    const primero = CAMPOS.find((c) => nuevos[c]);
    if (primero) {
      (el.elements.namedItem(primero) as HTMLInputElement | null)?.focus();
      return;
    }

    const f = new FormData(el);
    const mejoras = f.getAll("areas").map(String);
    setEstado("enviando");
    try {
      await sendLead({
        data: {
          name: String(f.get("name") || ""),
          phone: String(f.get("phone") || ""),
          email: String(f.get("email") || ""),
          company: String(f.get("company") || ""),
          areas: mejoras,
          // El detalle de "Otro" solo cuenta si "Otro" sigue marcado.
          message: mejoras.includes("Otro") ? String(f.get("message") || "") : "",
          honeypot: String(f.get("url") || ""),
          source: SOURCE,
        },
      });
      acabaDeEnviar.current = true;
      setEstado("enviado");
    } catch {
      setEstado("error");
    }
  }

  const enviando = estado === "enviando";
  const enviado = estado === "enviado";

  /** Props comunes de los cuatro campos de texto. */
  const campo = (c: Exclude<Campo, "privacy">) => ({
    id: id(c),
    name: c,
    required: true,
    "aria-invalid": errores[c] ? true : undefined,
    "aria-describedby": errores[c] ? id(`${c}-error`) : undefined,
    onChange: () => alCambiar(c),
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => alSalir(c, e.currentTarget.value),
    className: inputClass,
  });

  const errorTexto = (c: Campo) =>
    errores[c] ? (
      <p id={id(`${c}-error`)} className={errorClass}>
        {errores[c]}
      </p>
    ) : null;

  const asterisco = (
    <span aria-hidden className="text-gold-text">
      {" "}
      *
    </span>
  );

  // Los cortes (dos columnas, píldoras, botón en una línea) dependen del
  // ancho del propio formulario, no del de la ventana: en la columna de
  // escritorio es más estrecho que en una tableta.
  return (
    <div className="@container grid">
      <form
        ref={form}
        action={sendLead.url}
        method="post"
        encType="multipart/form-data"
        noValidate={conJs}
        onSubmit={alEnviar}
        aria-busy={enviando}
        aria-hidden={enviado || undefined}
        className={cn("group/form relative grid gap-7 [grid-area:1/1]", enviado && "invisible")}
      >
        <input type="hidden" name="source" value={SOURCE} />
        <input type="hidden" name="volverA" value="/diagnostico#formulario" />

        <div className="grid gap-5 @min-[440px]:grid-cols-2 @min-[440px]:gap-x-4">
          <div>
            <label htmlFor={id("name")} className={labelClass}>
              Nombre y apellidos{asterisco}
            </label>
            <input {...campo("name")} type="text" autoComplete="name" placeholder="Tu nombre" />
            {errorTexto("name")}
          </div>
          <div>
            <label htmlFor={id("phone")} className={labelClass}>
              Teléfono{asterisco}
            </label>
            <input
              {...campo("phone")}
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              pattern={PATRON_TELEFONO}
              placeholder="600 000 000"
            />
            {errorTexto("phone")}
          </div>
          <div className="@min-[440px]:col-span-2">
            <label htmlFor={id("email")} className={labelClass}>
              Email{asterisco}
            </label>
            <input
              {...campo("email")}
              type="email"
              autoComplete="email"
              inputMode="email"
              pattern={PATRON_EMAIL}
              placeholder="tuemail@empresa.com"
            />
            {errorTexto("email")}
          </div>
          <div className="@min-[440px]:col-span-2">
            <label htmlFor={id("company")} className={labelClass}>
              Nombre de la empresa{asterisco}
            </label>
            <input
              {...campo("company")}
              type="text"
              autoComplete="organization"
              placeholder="Nombre de tu empresa"
            />
            {errorTexto("company")}
          </div>
        </div>

        <fieldset>
          <legend className={labelClass}>
            ¿Qué quieres mejorar ahora mismo?{" "}
            <span className="font-normal text-foreground/55">(opcional)</span>
          </legend>
          {/* Formulario estrecho: una opción por fila a todo el ancho (fácil
              de pulsar), con alto para dos líneas, así que mide lo mismo
              aunque el texto parta distinto con la fuente de respaldo. Desde
              440 px de formulario, píldoras seguidas. */}
          <div className="mt-3 grid gap-2.5 @min-[440px]:flex @min-[440px]:flex-wrap">
            {MEJORAS.map((m) => (
              <label
                key={m}
                className={cn(
                  "group/chip flex min-h-[54px] cursor-pointer select-none items-center gap-2.5 rounded-btn border px-3.5 py-2 text-[14px] leading-tight @min-[440px]:inline-flex @min-[440px]:min-h-11 @min-[440px]:rounded-full @min-[440px]:px-4",
                  "border-[color-mix(in_oklab,var(--navy)_22%,transparent)] bg-background text-foreground/80",
                  "transition-[background-color,border-color,color] duration-150 hover:border-navy/60 hover:text-foreground motion-reduce:transition-none",
                  "has-checked:border-navy has-checked:bg-navy has-checked:text-cream",
                  "has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-gold",
                )}
              >
                <input
                  type="checkbox"
                  name="areas"
                  value={m}
                  data-otro={m === "Otro" || undefined}
                  className="sr-only"
                />
                {/* Marca de la opción: círculo vacío; al elegirla, dorado con
                    el check. Siempre ocupa su sitio, así el chip no cambia
                    de ancho al marcarlo. */}
                <span
                  aria-hidden
                  className="grid h-[18px] w-[18px] shrink-0 place-content-center rounded-full border border-[color-mix(in_oklab,var(--navy)_35%,transparent)] transition-colors duration-150 group-has-checked/chip:border-gold group-has-checked/chip:bg-gold motion-reduce:transition-none"
                >
                  <Check
                    strokeWidth={3.2}
                    className="h-[11px] w-[11px] text-navy opacity-0 group-has-checked/chip:opacity-100"
                  />
                </span>
                {m}
              </label>
            ))}
          </div>

          <div className="hidden group-has-[[data-otro]:checked]/form:block group-has-[[data-otro]:checked]/form:animate-in group-has-[[data-otro]:checked]/form:fade-in-0 group-has-[[data-otro]:checked]/form:duration-200 motion-reduce:animate-none">
            <label htmlFor={id("otro")} className="sr-only">
              Cuéntanos brevemente qué necesitas
            </label>
            <input
              id={id("otro")}
              name="message"
              type="text"
              maxLength={500}
              autoComplete="off"
              placeholder="Cuéntanos brevemente qué necesitas"
              className={cn(inputClass, "mt-3")}
            />
          </div>
        </fieldset>

        <div>
          <label className="flex cursor-pointer items-start gap-3 text-[14px] leading-snug text-foreground/80">
            <input
              id={id("privacy")}
              name="privacy"
              type="checkbox"
              required
              aria-invalid={errores.privacy ? true : undefined}
              aria-describedby={errores.privacy ? id("privacy-error") : undefined}
              onChange={() => alCambiar("privacy")}
              className="mt-px h-[18px] w-[18px] shrink-0 cursor-pointer accent-navy"
            />
            <span>
              He leído y acepto la{" "}
              <Link
                to="/privacidad"
                target="_blank"
                className="font-medium text-foreground underline decoration-gold underline-offset-[3px] hover:decoration-2"
              >
                Política de Privacidad
              </Link>
              .{asterisco}
            </span>
          </label>
          {errorTexto("privacy")}
        </div>

        <div>
          <button
            type="submit"
            disabled={enviando}
            className={goldCtaClasses(
              "default",
              "w-full whitespace-normal px-4 py-[18px] text-center text-[13px] font-semibold uppercase leading-[1.4] tracking-[0.04em] text-navy disabled:cursor-wait disabled:opacity-80 disabled:hover:translate-y-0 @min-[372px]:px-5 @min-[372px]:text-[14px] @min-[372px]:tracking-[0.06em]",
            )}
          >
            {/* Con menos de 372 px de formulario va siempre en dos líneas,
                cortado a mano y con la flecha pegada a "gratuito":
                "Solicitar diagnóstico" mide 185 px a 13 px con la fuente de
                respaldo y cabe a 320 px, así que el botón mide lo mismo con
                Poppins y sin ella.
                Al enviar solo cambia el icono (la flecha por el círculo, del
                mismo tamaño), para que el botón no cambie de ancho. */}
            <span>
              Solicitar diagnóstico <br className="@min-[372px]:hidden" />
              <span className="whitespace-nowrap">
                gratuito
                {enviando ? (
                  <Loader2
                    aria-hidden
                    className="ml-[11px] inline h-4 w-4 animate-spin align-[-3px] motion-reduce:animate-none"
                  />
                ) : (
                  <ArrowRight
                    aria-hidden
                    strokeWidth={2.4}
                    className="ml-[11px] inline h-4 w-4 align-[-3px] transition-transform duration-200 group-hover:translate-x-[3px] motion-reduce:transition-none"
                  />
                )}
              </span>
            </span>
          </button>

          {/* El aviso de error comparte celda con la frase de confianza y
              está siempre pintado (invisible hasta que hace falta): su hueco
              ya está reservado y la página no se mueve si el envío falla. */}
          <div className="mt-4 grid text-center text-[12.5px] leading-relaxed">
            {/* Con menos de 496 px de formulario, una frase por línea
                (siempre tres, con cualquier fuente); desde ahí, en fila
                separadas por "·". */}
            <p
              className={cn(
                "flex flex-col items-center text-foreground/65 [grid-area:1/1] @min-[496px]:flex-row @min-[496px]:justify-center @min-[496px]:gap-x-2",
                estado === "error" && "invisible",
              )}
            >
              {CONFIANZA.map((t, i) => (
                <span key={t} className="whitespace-nowrap">
                  <span
                    aria-hidden
                    className={cn("mr-2 hidden text-gold-text", i > 0 && "@min-[496px]:inline")}
                  >
                    ·
                  </span>
                  {t}
                </span>
              ))}
            </p>
            <p
              aria-hidden={estado !== "error" || undefined}
              className={cn(
                "font-medium text-[#B42318] [grid-area:1/1]",
                estado !== "error" && "invisible",
              )}
            >
              No hemos podido enviarlo. Escríbenos a{" "}
              <a href={`mailto:${legalData.email}`} className="underline">
                {legalData.email}
              </a>{" "}
              o{" "}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                por WhatsApp
              </a>
              .
            </p>
          </div>
          <p role="alert" className="sr-only">
            {estado === "error" && "No hemos podido enviar la solicitud."}
          </p>
        </div>

        {/* Primera capa de información de protección de datos (art. 13 RGPD). */}
        <div className="border-t border-border pt-5 [&_p]:text-[11.5px] [&_p]:text-foreground/55">
          <PrivacyNotice />
        </div>

        {/* Campo trampa: fuera de pantalla y fuera del orden de tabulación.
            Si llega relleno, el servidor responde ok sin enviar nada. */}
        <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor={id("trampa")}>No rellenes este campo</label>
          <input id={id("trampa")} name="url" type="text" tabIndex={-1} autoComplete="off" />
        </div>
      </form>

      {enviado && (
        <div className="flex flex-col items-center justify-center px-2 py-10 text-center [grid-area:1/1] animate-in fade-in-0 duration-300 motion-reduce:animate-none">
          <span
            aria-hidden
            className="grid h-14 w-14 place-content-center rounded-full bg-navy text-gold-light"
          >
            <Check strokeWidth={3} className="h-6 w-6" />
          </span>
          <h3
            ref={recibido}
            tabIndex={-1}
            className="mt-5 text-[22px] text-foreground outline-none"
          >
            Solicitud recibida
          </h3>
          <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-foreground/70">
            Revisaremos tu caso y nuestro equipo contactará contigo en menos de 24 h.
          </p>
        </div>
      )}
    </div>
  );
}

const MENSAJE_WHATSAPP =
  "Hola, he visto la web de Syntalia Vértice y me gustaría agendar una reunión durante Fruit Attraction.";
const WHATSAPP_REUNION = `${WHATSAPP_URL}?text=${encodeURIComponent(MENSAJE_WHATSAPP)}`;

/** Bloque azul de debajo del formulario: hablar con el equipo por WhatsApp. */
export function DiagnosticoWhatsApp() {
  const titulo = useId();
  return (
    <aside
      aria-labelledby={titulo}
      className="surface-navy @container rounded-[2rem] bg-navy p-6 sm:p-8 md:p-10"
    >
      <span
        aria-hidden
        className="grid h-12 w-12 place-content-center rounded-full border border-[color-mix(in_oklab,var(--gold)_45%,transparent)] text-gold-light"
      >
        <WhatsAppIcon className="h-[22px] w-[22px]" />
      </span>
      {/* Siempre en dos líneas, cortado a mano: en una no cabe con la
          fuente de respaldo en la columna de escritorio (454 px a 20 px) y
          el titular saltaría al cargar Raleway. La línea larga mide 225 px
          con la de respaldo a 18 px: en móvil va a 17 px para caber a 320. */}
      <h2
        id={titulo}
        className="mt-5 text-[17px] uppercase leading-[1.25] tracking-[0.02em] text-cream sm:text-[18px] md:text-[20px]"
      >
        ¿Quieres hablar <br />
        con nuestro equipo?
      </h2>
      <p className="mt-3 text-[15px] leading-relaxed text-cream/75">
        Escríbenos directamente por WhatsApp y agendamos una reunión durante Fruit Attraction.
      </p>
      <a
        href={WHATSAPP_REUNION}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-7 block w-full rounded-btn bg-cream px-4 py-4 text-center text-[13px] font-semibold uppercase leading-[1.4] tracking-[0.04em] text-navy transition-[translate,background-color] duration-200 hover:-translate-y-px hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold motion-reduce:transition-none motion-reduce:hover:translate-y-0 @min-[440px]:inline-block @min-[440px]:w-auto @min-[440px]:px-7 @min-[440px]:text-[14px] @min-[440px]:tracking-[0.06em]"
      >
        {/* Como el botón del formulario: con menos de 440 px de bloque, dos
            líneas con el corte fijo, para que mida lo mismo con Poppins y
            sin ella. */}
        <WhatsAppIcon className="mr-2.5 inline h-[18px] w-[18px] align-[-4px]" />
        Agendar reunión <br className="@min-[440px]:hidden" />
        por WhatsApp
        <span className="sr-only"> (se abre en una pestaña nueva)</span>
      </a>
    </aside>
  );
}
