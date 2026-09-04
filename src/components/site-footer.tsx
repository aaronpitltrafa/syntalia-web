import { Link } from "@tanstack/react-router";
import { Instagram, Mail, MapPin, Phone, type LucideProps } from "lucide-react";
import logoWhite from "@/assets/logo-white.png";
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

const columnTitle = "text-[10px] font-semibold uppercase tracking-[0.22em] text-cream/55";
const columnLink = "text-[15px] text-cream/70 transition-colors hover:text-gold-light";
const socialCircle =
  "flex h-10 w-10 items-center justify-center rounded-full border border-cream/14 bg-cream/4 text-cream/70 transition-colors hover:border-gold hover:text-gold-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-cream/10 text-cream">
      <div className="mx-auto max-w-[1240px] px-6 pt-[70px] pb-10 sm:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-[60px]">
          {/* ---------- Marca ---------- */}
          <div>
            <img src={logoWhite} alt="Syntalia Vértice" className="h-12 w-auto object-contain" />

            <p className="mt-[18px] max-w-[280px] text-[15px] leading-[1.7] text-cream/60">
              Consultora estratégica de marketing digital, sistemas y crecimiento. Murcia.
            </p>

            <GoldButton to="/diagnostico" size="compact" className="mt-7">
              Diagnóstico gratuito
            </GoldButton>

            <div className="mt-6 flex gap-2.5">
              <a
                href="https://instagram.com/syntalia.vertice"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram @syntalia.vertice"
                className={socialCircle}
              >
                <Instagram className="h-[17px] w-[17px]" />
              </a>
              <a
                href="https://tiktok.com/@syntalia.vertice"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok @syntalia.vertice"
                className={socialCircle}
              >
                <TikTokIcon className="h-[17px] w-[17px]" />
              </a>
            </div>
          </div>

          {/* ---------- Navegación ---------- */}
          <div>
            <h2 className={columnTitle}>Navegación</h2>
            <ul className="mt-5 flex flex-col gap-3">
              {NAV.map((n) => (
                <li key={n.label}>
                  <Link to={n.to} hash={n.hash} hashScrollIntoView={{ behavior: "smooth" }} className={columnLink}>
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ---------- Servicios ---------- */}
          <div>
            <h2 className={columnTitle}>Servicios</h2>
            <ul className="mt-5 flex flex-col gap-3">
              {SERVICIOS.map((s) => (
                <li key={s.to}>
                  <Link to={s.to} className={columnLink}>
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ---------- Contacto ---------- */}
          <div>
            <h2 className={columnTitle}>Contacto</h2>
            <ul className="mt-5 flex flex-col gap-3">
              <li>
                <a href="mailto:vertice@syntalia.es" className={`flex items-center gap-2.5 ${columnLink}`}>
                  <Mail className="h-4 w-4 shrink-0 text-gold-light" aria-hidden /> vertice@syntalia.es
                </a>
              </li>
              <li>
                <a href="tel:+34672167758" className={`flex items-center gap-2.5 ${columnLink}`}>
                  <Phone className="h-4 w-4 shrink-0 text-gold-light" aria-hidden /> +34 672 167 758
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-[15px] text-cream/70">
                <MapPin className="h-4 w-4 shrink-0 text-gold-light" aria-hidden /> Murcia · Toda España
              </li>
            </ul>
          </div>
        </div>

        {/* ---------- Filete y línea inferior ---------- */}
        <div className="mt-14 h-px w-full bg-cream/12" aria-hidden />

        <div className="flex flex-col items-center gap-4 pt-[26px] text-[13px] text-cream/55 md:flex-row md:justify-between">
          <span>© {new Date().getFullYear()} Syntalia Vértice</span>
          <div className="flex flex-wrap items-center justify-center gap-x-[26px] gap-y-2">
            {LEGAL.map((l) => (
              <Link key={l.to} to={l.to} className="transition-colors hover:text-cream">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
