import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { goldCtaClasses } from "@/lib/gold-cta-classes";
import { legalData } from "@/lib/legal-data";
import { sendLead } from "@/lib/send-lead";
import { WHATSAPP_URL } from "@/lib/site";

/** Id fijo del primer campo: el botón del bloque 06 lo enfoca al llegar con teclado. */
export const ID_PRIMER_CAMPO = "cierre-nombre";

type Campo = {
  name: "name" | "company" | "message" | "email" | "phone";
  etiqueta: string;
  tipo: "text" | "email" | "tel" | "textarea";
  placeholder: string;
  autoComplete: string;
  obligatorio: boolean;
  /** Mensaje si se intenta avanzar con el campo vacío. */
  falta?: string;
};

const PASOS: readonly { pregunta: string; ayuda: string; campos: readonly Campo[] }[] = [
  {
    pregunta: "¿Cómo te llamas?",
    ayuda: "Para no empezar el correo con un 'Hola'.",
    campos: [
      {
        name: "name",
        etiqueta: "Nombre",
        tipo: "text",
        placeholder: "Escribe aquí",
        autoComplete: "name",
        obligatorio: true,
        falta: "Escribe tu nombre para seguir.",
      },
    ],
  },
  {
    pregunta: "¿Qué empresa diriges?",
    ayuda: "La miramos antes de contestarte.",
    campos: [
      {
        name: "company",
        etiqueta: "Empresa",
        tipo: "text",
        placeholder: "Escribe aquí",
        autoComplete: "organization",
        obligatorio: true,
        falta: "Escribe el nombre de tu empresa para seguir.",
      },
    ],
  },
  {
    pregunta: "¿Qué quieres conseguir?",
    ayuda: "Dos líneas bastan: dónde estás y a dónde quieres llegar.",
    campos: [
      {
        name: "message",
        etiqueta: "Tu objetivo",
        tipo: "textarea",
        placeholder: "Captar más clientes, ordenar el marketing, lanzar una web…",
        autoComplete: "off",
        obligatorio: true,
        falta: "Cuéntanos en una línea qué quieres conseguir.",
      },
    ],
  },
  {
    pregunta: "¿Dónde te respondemos?",
    ayuda: "Con el correo basta. El teléfono, solo si prefieres que te llamemos.",
    campos: [
      {
        name: "email",
        etiqueta: "Email",
        tipo: "email",
        placeholder: "tu@empresa.com",
        autoComplete: "email",
        obligatorio: true,
        falta: "Escribe tu correo para que podamos responderte.",
      },
      {
        name: "phone",
        etiqueta: "Teléfono (opcional)",
        tipo: "tel",
        placeholder: "600 000 000",
        autoComplete: "tel",
        obligatorio: false,
      },
    ],
  },
];

/** Correo con dominio y extensión: el navegador da por bueno "ana@empresa". */
const PATRON_EMAIL = String.raw`[^@\s]+@[^@\s]+\.[^@\s]+`;

const TOTAL = PASOS.length;
const dos = (n: number) => String(n).padStart(2, "0");

type Estado = "rellenando" | "enviando" | "enviado" | "error";

/**
 * Sin JavaScript no hay pasos: los cuatro, con sus cinco campos, a la vista
 * uno debajo de otro, y el botón envía el formulario tal cual. Si se vuelve
 * con ?envio=ok, solo la confirmación.
 */
const CSS_SIN_JS = `
.cierre-escena{display:block}
.cierre-paso{visibility:visible;animation:none}
.cierre-paso+.cierre-paso{margin-top:clamp(48px,6vw,72px)}
.cierre-enviado,.cierre-progreso,.cierre-contador,.cierre-conjs,.cierre-intro,.cierre-atras{display:none}
.cierre-sinjs{display:inline}
.cierre-form[data-estado="enviado"] .cierre-paso,.cierre-form[data-estado="enviado"] .cierre-acciones{display:none}
.cierre-form[data-estado="enviado"] .cierre-enviado{display:block;visibility:visible;animation:none}
`;

/**
 * Formulario de cuatro pasos del cierre de la home. Usa el mismo sendLead
 * que antes (mismos campos, mismo honeypot, mismo `source`).
 *
 * Sin JavaScript: el HTML del servidor ya es un formulario normal que
 * apunta a la URL de sendLead. Un <noscript> muestra los cinco campos a la
 * vez con su botón de envío, y sendLead vuelve a la página con ?envio=ok o
 * ?envio=error (`envioInicial`).
 *
 * Con JavaScript: los cuatro pasos están apilados en la misma celda de una
 * rejilla y solo se ve el activo (los demás, visibility: hidden, fuera del
 * foco y del lector). La celda mide lo que el paso más alto, también la
 * confirmación, así que la página no cambia de alto al pasar de uno a otro
 * ni al enviar. Intro envía el formulario y el envío avanza de paso; en el
 * último, envía de verdad.
 */
export function FormularioPasos({
  source,
  volverA,
  envioInicial,
  pildora,
}: {
  source: string;
  volverA: string;
  envioInicial?: "ok" | "error";
  pildora: React.ReactNode;
}) {
  const [paso, setPaso] = useState(1);
  const [estado, setEstado] = useState<Estado>(
    envioInicial === "ok" ? "enviado" : envioInicial === "error" ? "error" : "rellenando",
  );
  const [errores, setErrores] = useState<Partial<Record<Campo["name"], string>>>({});
  const [conJs, setConJs] = useState(false);
  const [anuncio, setAnuncio] = useState("");
  const form = useRef<HTMLFormElement>(null);
  const recibido = useRef<HTMLHeadingElement>(null);
  const primerRender = useRef(true);
  /** Solo tras un envío hecho aquí: al recargar con ?envio=ok no se mueve el foco. */
  const acabaDeEnviar = useRef(false);
  const uid = useId();

  // Con JS, la validación la hace el formulario paso a paso (sin JS, la
  // del navegador con `required`).
  useEffect(() => setConJs(true), []);

  // Al cambiar de paso: el foco va al campo nuevo y se anuncia el paso.
  useEffect(() => {
    if (primerRender.current) {
      primerRender.current = false;
      return;
    }
    if (estado === "enviado") return;
    const actual = PASOS[paso - 1];
    campo(actual.campos[0].name)?.focus();
    setAnuncio(`Paso ${paso} de ${TOTAL}: ${actual.pregunta}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paso]);

  useEffect(() => {
    if (estado === "enviado" && acabaDeEnviar.current) {
      recibido.current?.focus();
      setAnuncio("Recibido. Te confirmamos por correo ahora mismo.");
    }
  }, [estado]);

  function campo(name: Campo["name"]) {
    return form.current?.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement | null;
  }

  function validar(campos: readonly Campo[]) {
    const nuevos: Partial<Record<Campo["name"], string>> = {};
    for (const c of campos) {
      const el = campo(c.name);
      if (!el) continue;
      const valor = el.value.trim();
      if (c.obligatorio && !valor) nuevos[c.name] = c.falta;
      else if (
        c.tipo === "email" &&
        valor &&
        ((el as HTMLInputElement).validity.typeMismatch ||
          (el as HTMLInputElement).validity.patternMismatch)
      )
        nuevos[c.name] = "Revisa el correo: parece incompleto (por ejemplo, ana@empresa.com).";
    }
    setErrores((e) => ({
      ...e,
      ...Object.fromEntries(campos.map((c) => [c.name, nuevos[c.name]])),
    }));
    const primero = campos.find((c) => nuevos[c.name]);
    if (primero) campo(primero.name)?.focus();
    return !primero;
  }

  async function alEnviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (estado === "enviando" || estado === "enviado") return;
    if (!validar(PASOS[paso - 1].campos)) return;
    if (paso < TOTAL) {
      setPaso(paso + 1);
      return;
    }
    const f = new FormData(e.currentTarget);
    setEstado("enviando");
    setAnuncio("Enviando…");
    try {
      await sendLead({
        data: {
          name: String(f.get("name") || ""),
          company: String(f.get("company") || ""),
          phone: String(f.get("phone") || ""),
          email: String(f.get("email") || ""),
          message: String(f.get("message") || ""),
          honeypot: String(f.get("url") || ""),
          source,
        },
      });
      acabaDeEnviar.current = true;
      setEstado("enviado");
    } catch {
      setEstado("error");
      setAnuncio("");
    }
  }

  const enviado = estado === "enviado";
  const enviando = estado === "enviando";

  return (
    <>
      <noscript dangerouslySetInnerHTML={{ __html: `<style>${CSS_SIN_JS}</style>` }} />
      <div aria-hidden className="cierre-progreso">
        <span style={{ transform: `scaleX(${enviado ? 1 : paso / TOTAL})` }} />
      </div>

      <div className="cierre-top">
        {pildora}
        <p aria-hidden className="cierre-contador" data-oculto={enviado || undefined}>
          <b>{dos(paso)}</b> / {dos(TOTAL)}
        </p>
      </div>

      <form
        ref={form}
        action={sendLead.url}
        method="post"
        encType="multipart/form-data"
        noValidate={conJs}
        onSubmit={alEnviar}
        aria-busy={enviando}
        className="cierre-form"
        data-estado={estado}
      >
        <input type="hidden" name="source" value={source} />
        <input type="hidden" name="volverA" value={volverA} />

        <div className="cierre-escena">
          {PASOS.map((p, i) => {
            const n = i + 1;
            const idAyuda = `${uid}-ayuda-${n}`;
            return (
              <div
                key={p.pregunta}
                className="cierre-paso"
                data-activo={(!enviado && n === paso) || undefined}
              >
                <h2 className="cierre-pregunta">{p.pregunta}</h2>
                <p id={idAyuda} className="cierre-ayuda">
                  {p.ayuda}
                </p>
                <div className="cierre-campos" data-dos={p.campos.length > 1 || undefined}>
                  {p.campos.map((c) => {
                    const id = c.name === "name" ? ID_PRIMER_CAMPO : `${uid}-${c.name}`;
                    const idError = `${id}-error`;
                    const error = errores[c.name];
                    const comun = {
                      id,
                      name: c.name,
                      required: c.obligatorio,
                      placeholder: c.placeholder,
                      autoComplete: c.autoComplete,
                      "aria-invalid": error ? true : undefined,
                      "aria-describedby": `${idAyuda} ${idError}`,
                      onInput: () => error && setErrores((e) => ({ ...e, [c.name]: undefined })),
                    };
                    return (
                      <div
                        key={c.name}
                        className="cierre-linea"
                        data-ancha={c.tipo === "textarea" || undefined}
                      >
                        <label htmlFor={id}>{c.etiqueta}</label>
                        {c.tipo === "textarea" ? (
                          <textarea
                            {...comun}
                            rows={3}
                            onKeyDown={(e) => {
                              // Intro hace salto de línea; Ctrl/⌘ + Intro avanza.
                              if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                                e.preventDefault();
                                form.current?.requestSubmit();
                              }
                            }}
                          />
                        ) : (
                          <input
                            {...comun}
                            type={c.tipo}
                            // El navegador da por bueno "ana@empresa" sin dominio; así se
                            // pide también el punto (y vale igual sin JS).
                            pattern={c.tipo === "email" ? PATRON_EMAIL : undefined}
                          />
                        )}
                        <p id={idError} role="alert" className="cierre-error">
                          {error}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          <div className="cierre-enviado" data-activo={enviado || undefined}>
            <span aria-hidden className="cierre-tick">
              <Check strokeWidth={3} className="h-[26px] w-[26px]" />
            </span>
            <h2 ref={recibido} tabIndex={-1} className="cierre-recibido">
              Recibido
            </h2>
            <ol className="cierre-plazos">
              <li>
                <b aria-hidden>01</b>
                <span>Te confirmamos por correo</span>
                <em>ahora mismo</em>
              </li>
              <li>
                <b aria-hidden>02</b>
                <span>Analizamos tu situación</span>
                <em>24 h</em>
              </li>
              <li>
                <b aria-hidden>03</b>
                <span>Te entregamos el plan</span>
                <em>3-5 días</em>
              </li>
            </ol>
          </div>
        </div>

        <div className="cierre-acciones" data-oculto={enviado || undefined}>
          <button
            type="submit"
            disabled={enviando}
            className={goldCtaClasses(
              "default",
              "rounded-none px-[30px] py-[17px] text-[15.5px] disabled:cursor-wait disabled:opacity-80 disabled:hover:translate-y-0",
            )}
          >
            {/* Sin JS el botón envía directamente; con JS dice en qué paso está.
                Al enviar solo cambia el icono (la flecha por el círculo, del
                mismo tamaño): el texto no, para que el botón no cambie de
                ancho cuando llegue la respuesta. */}
            <span className="cierre-sinjs">Solicitar diagnóstico</span>
            <span className="cierre-conjs">
              {paso < TOTAL ? "Siguiente" : "Solicitar diagnóstico"}
            </span>
            {enviando ? (
              <Loader2 aria-hidden className="h-4 w-4 animate-spin motion-reduce:animate-none" />
            ) : (
              <ArrowRight
                aria-hidden
                strokeWidth={2.4}
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-[3px] motion-reduce:transition-none"
              />
            )}
          </button>
          <span aria-hidden className="cierre-intro">
            o pulsa <kbd>{paso === 3 ? "Ctrl + Intro ↵" : "Intro ↵"}</kbd>
          </span>
          <button
            type="button"
            className="cierre-atras"
            data-oculto={paso === 1 || undefined}
            onClick={() => setPaso((p) => Math.max(1, p - 1))}
          >
            ← Atrás
          </button>
        </div>

        {/* Error del envío, con su hueco reservado para no mover la página.
            Da una salida que no depende del formulario: el correo y el
            WhatsApp (sin JS, lo escrito se ha perdido al volver). */}
        <p role="alert" className="cierre-aviso">
          {estado === "error" && (
            <>
              No hemos podido enviarlo. Escríbenos a{" "}
              <a href={`mailto:${legalData.email}`}>{legalData.email}</a> o{" "}
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                por WhatsApp
              </a>
              .
            </>
          )}
        </p>

        {/* Campo trampa: fuera de pantalla y fuera del orden de tabulación. */}
        <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor={`${uid}-trampa`}>No rellenes este campo</label>
          <input id={`${uid}-trampa`} name="url" type="text" tabIndex={-1} autoComplete="off" />
        </div>
      </form>

      <p aria-live="polite" className="sr-only">
        {anuncio}
      </p>
    </>
  );
}
