import { Link } from "@tanstack/react-router";
import { Instagram, type LucideProps } from "lucide-react";
import { GoldButton } from "@/components/gold-button";

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
  { to: "/", hash: "fases", label: "Sistema Vértice" },
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

const enlace = "text-[15px] font-medium text-foreground/70 transition-colors hover:text-gold-text";
const socialCircle =
  "flex h-9 w-9 items-center justify-center rounded-full border border-foreground/14 text-foreground/70 transition-colors hover:border-gold hover:text-gold-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

/** Una franja, no cuatro columnas: los mismos enlaces en mucha menos altura. */
export function SiteFooter() {
  return (
    <footer className="relative border-t border-foreground/10 text-foreground">
      {/* el padding inferior extra en móvil deja hueco a la barra fija de CTA */}
      <div className="mx-auto max-w-block px-6 pt-8 pb-[calc(5.5rem+env(safe-area-inset-bottom))] sm:px-8 md:pb-8">
        {/* fila 1 · marca, navegación y redes */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
          <Link to="/" aria-label="Syntalia Vértice · inicio" className="shrink-0">
            <span className="text-[24px] leading-none font-extrabold tracking-[-0.04em] text-foreground">
              Syntalia
            </span>
          </Link>

          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {NAV.map((n) => (
              <Link key={n.label} to={n.to} hash={n.hash} hashScrollIntoView={{ behavior: "smooth" }} className={enlace}>
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2.5">
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
            <GoldButton to="/diagnostico" size="compact" className="ml-1 hidden md:inline-flex">
              Solicitar diagnóstico gratuito
            </GoldButton>
          </div>
        </div>

        {/* fila 2 · las nueve páginas de servicio */}
        <div className="mt-5 flex flex-wrap items-baseline gap-x-5 gap-y-2">
          <span className="label-mono">Servicios</span>
          {SERVICIOS.map((s) => (
            <Link key={s.to} to={s.to} className={enlace}>
              {s.label}
            </Link>
          ))}
        </div>

        <div className="mt-6 h-px w-full bg-foreground/12" aria-hidden />

        {/* fila 3 · contacto y legales */}
        <div className="flex flex-col gap-3 pt-4 text-meta text-foreground/70 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Syntalia Vértice</span>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a href="mailto:vertice@syntalia.es" className={enlace}>
              vertice@syntalia.es
            </a>
            <a href="tel:+34672167758" className={enlace}>
              +34 672 167 758
            </a>
            {LEGAL.map((l) => (
              <Link key={l.to} to={l.to} className={enlace}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
