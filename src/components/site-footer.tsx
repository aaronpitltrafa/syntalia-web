import { Link } from "@tanstack/react-router";
import { ArrowRight, Instagram, Mail, MapPin, type LucideProps } from "lucide-react";
import logoWhite from "@/assets/logo-white.png";

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

const RECURSOS = [
  { to: "/diagnostico", label: "Diagnóstico gratuito" },
  { to: "/aviso-legal", label: "Aviso legal" },
  { to: "/privacidad", label: "Política de privacidad" },
  { to: "/cookies", label: "Política de cookies" },
];

export function SiteFooter() {
  return (
    <footer className="text-cream" style={{ background: "#021557", backgroundImage: "none" }}>
      <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-20 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-12">
        {/* Marca */}
        <div className="lg:col-span-4">
          <img src={logoWhite} alt="Syntalia Vértice" className="h-14 w-auto object-contain sm:h-16" />

          <p className="mt-6 text-xs font-bold uppercase tracking-[0.25em] text-gold">Consultora Estratégica de Marketing Digital</p>

          <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/65">
            Ayudamos a empresas con actividad real a convertir su presencia digital en oportunidades mediante estrategia, sistemas e implementación.
          </p>

          <Link
            to="/diagnostico"
            className="group mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-bold text-navy transition-colors hover:bg-gold-soft sm:inline-flex sm:w-auto"
          >
            Solicitar diagnóstico gratuito <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <div className="mt-7 flex items-center gap-3">
            <a
              href="https://instagram.com/syntalia.vertice"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram @syntalia.vertice"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/15 bg-cream/5 text-cream/80 transition-colors hover:border-gold hover:text-gold"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://tiktok.com/@syntalia.vertice"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok @syntalia.vertice"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/15 bg-cream/5 text-cream/80 transition-colors hover:border-gold hover:text-gold"
            >
              <TikTokIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Navegación */}
        <div className="lg:col-span-2">
          <h4 className="text-xs font-bold uppercase tracking-widest text-gold">Navegación</h4>
          <ul className="mt-5 space-y-3 text-sm">
            {NAV.map((n) => (
              <li key={n.label}>
                <Link
                  to={n.to}
                  hash={n.hash}
                  hashScrollIntoView={{ behavior: "smooth" }}
                  className="text-cream/70 transition-colors hover:text-gold"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Recursos y legal */}
        <div className="lg:col-span-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-gold">Recursos y legal</h4>
          <ul className="mt-5 space-y-3 text-sm">
            {RECURSOS.map((r) => (
              <li key={r.to}>
                <Link to={r.to} className="text-cream/70 transition-colors hover:text-gold">
                  {r.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contacto */}
        <div className="lg:col-span-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-gold">Contacto</h4>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <a
                href="mailto:vertice@syntalia.es"
                className="flex items-center gap-2 text-cream/70 transition-colors hover:text-gold"
              >
                <Mail className="h-4 w-4 shrink-0 text-gold" /> vertice@syntalia.es
              </a>
            </li>
            <li className="flex items-center gap-2 text-cream/70">
              <MapPin className="h-4 w-4 shrink-0 text-gold" /> Murcia, España
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10" style={{ background: "#021557", backgroundImage: "none" }}>
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 px-6 py-6 text-center text-xs text-cream/50 sm:px-8 md:flex-row md:text-left lg:px-12">
          <span>© {new Date().getFullYear()} Syntalia Vértice. Todos los derechos reservados.</span>
          <span className="text-gold/80">Estrategia · Sistemas · Ejecución</span>
          <span>Consultora estratégica de marketing digital</span>
        </div>
      </div>
    </footer>
  );
}
