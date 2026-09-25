import { Link } from "@tanstack/react-router";
import { Instagram, type LucideProps } from "lucide-react";
import logoHorizontal from "@/assets/logo-horizontal.png";
import { GoldCta } from "@/components/gold-cta";

/** lucide-react ships no TikTok glyph; this mirrors its icon conventions. */
function TikTokIcon(props: LucideProps) {
  const { size = 24, color = "currentColor", strokeWidth, className, ...rest } = props;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      className={className}
      {...rest}
    >
      <path d="M16.6 5.82c-.9-.85-1.45-2.02-1.45-3.32h-3.02v13.66c0 1.6-1.3 2.9-2.9 2.9s-2.9-1.3-2.9-2.9 1.3-2.9 2.9-2.9c.29 0 .57.04.83.12v-3.07a6 6 0 0 0-.83-.06c-3.28 0-5.94 2.66-5.94 5.94s2.66 5.94 5.94 5.94 5.94-2.66 5.94-5.94V9.4a8.3 8.3 0 0 0 4.85 1.56V7.95c-1.1 0-2.13-.35-2.97-.94a5.4 5.4 0 0 1-1.45-1.19Z" />
    </svg>
  );
}

const NAV: { to: string; label: string; hash?: string }[] = [
  { to: "/", label: "Inicio" },
  { to: "/servicios", label: "Servicios" },
  { to: "/", hash: "sistema", label: "Sistema Vértice" },
  { to: "/quienes-somos", label: "Quiénes somos" },
  { to: "/", hash: "faq", label: "FAQ" },
  { to: "/contacto", label: "Contacto" },
];

/** Las nueve páginas de servicio que existen en el proyecto. */
const SERVICIOS = [
  { to: "/servicios/captacion", label: "Sistema de captación" },
  { to: "/servicios/redes-sociales", label: "Redes sociales" },
  { to: "/servicios/branding-completo", label: "Branding completo" },
  { to: "/servicios/desarrollo-web", label: "Desarrollo web" },
  { to: "/servicios/social-ads", label: "Social Ads" },
  { to: "/servicios/seo", label: "SEO" },
  { to: "/servicios/contenido", label: "Estrategias de contenido" },
  { to: "/servicios/email-marketing", label: "Email marketing" },
  { to: "/servicios/grabacion-contenido", label: "Grabación de contenido" },
];

const LEGAL = [
  { to: "/aviso-legal", label: "Aviso legal" },
  { to: "/privacidad", label: "Política de privacidad" },
  { to: "/cookies", label: "Política de cookies" },
];

const enlace =
  "rounded-sm text-[14.5px] leading-[1.5] text-cream/72 transition-colors hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";
const socialCircle =
  "flex h-9 w-9 items-center justify-center rounded-full border border-cream/13 text-cream/72 transition-colors hover:border-gold hover:text-gold-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

function Columna({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <nav aria-label={titulo}>
      <p className="etiqueta">{titulo}</p>
      <ul className="mt-4 grid gap-2">{children}</ul>
    </nav>
  );
}

/**
 * Pie en azul profundo, igual en todas las páginas. Crema al 72% sobre
 * #061032 da 8,9:1 y las etiquetas al 62%, 6,8:1.
 */
export function SiteFooter() {
  return (
    <footer className="relative border-t border-cream/13 bg-ink-2 text-cream">
      {/* padding inferior: en móvil deja hueco a la barra fija (69px) y al
          WhatsApp flotante que va encima (54px + márgenes); en escritorio,
          al flotante solo. Así lo último del pie nunca queda debajo. */}
      <div className="contenedor pt-[clamp(48px,6vw,72px)] pb-[calc(150px+env(safe-area-inset-bottom))] md:pb-[88px]">
        {/* fila 1 · marca, redes y botón */}
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-6">
          <div>
            <Link
              to="/"
              aria-label="Syntalia Vértice · inicio"
              className="inline-flex rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
            >
              <img
                src={logoHorizontal}
                alt=""
                width={607}
                height={120}
                className="h-[42px] w-auto"
              />
            </Link>
            <p className="mt-3 text-[13.5px] text-cream/62">
              Consultora estratégica de marketing digital · Murcia
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href="https://instagram.com/syntalia.vertice"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram @syntalia.vertice"
              className={socialCircle}
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://tiktok.com/@syntalia.vertice"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok @syntalia.vertice"
              className={socialCircle}
            >
              <TikTokIcon className="h-4 w-4" />
            </a>
            <GoldCta to="/diagnostico" size="compact" className="ml-1 hidden md:inline-flex">
              Solicitar diagnóstico gratuito
            </GoldCta>
          </div>
        </div>

        {/* fila 2 · columnas de enlaces */}
        <div className="mt-10 grid gap-x-8 gap-y-9 border-t border-cream/13 pt-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <Columna titulo="Navegación">
            {NAV.map((n) => (
              <li key={n.label}>
                <Link
                  to={n.to}
                  hash={n.hash}
                  hashScrollIntoView={{ behavior: "smooth" }}
                  className={enlace}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </Columna>

          <Columna titulo="Servicios">
            {SERVICIOS.map((s) => (
              <li key={s.to}>
                <Link to={s.to} className={enlace}>
                  {s.label}
                </Link>
              </li>
            ))}
          </Columna>

          <Columna titulo="Legal">
            {LEGAL.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className={enlace}>
                  {l.label}
                </Link>
              </li>
            ))}
          </Columna>

          <Columna titulo="Contacto">
            <li>
              <a href="mailto:vertice@syntalia.es" className={enlace}>
                vertice@syntalia.es
              </a>
            </li>
            <li>
              <a href="tel:+34672167758" className={enlace}>
                +34 672 167 758
              </a>
            </li>
          </Columna>
        </div>

        {/* fila 3 · copyright */}
        <div className="mt-10 border-t border-cream/13 pt-6 text-[13px] text-cream/62">
          © {new Date().getFullYear()} Syntalia Vértice. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
