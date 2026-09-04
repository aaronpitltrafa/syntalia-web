import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import logoWhite from "@/assets/logo-white.png";
import { GoldButton } from "@/components/gold-button";
import { cn } from "@/lib/utils";

const nav: { to: string; label: string; hash?: string }[] = [
  { to: "/", label: "Inicio" },
  { to: "/servicios", label: "Servicios" },
  { to: "/quienes-somos", label: "Quiénes Somos" },
  { to: "/", hash: "faq", label: "FAQ" },
  { to: "/contacto", label: "Contacto" },
];

/** La píldora flotante: navy translúcido, filete crema y brillo interior. */
const pill =
  "rounded-full border border-cream/12 bg-navy/55 shadow-[inset_0_1px_0_oklch(0.961_0.012_91/12%),0_20px_44px_-26px_oklch(0_0_0/90%)] backdrop-blur-xl";

const linkBase =
  "rounded-full px-3.5 py-2.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const Wordmark = (
    <Link
      to="/"
      onClick={() => setOpen(false)}
      className="flex shrink-0 items-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
    >
      <img src={logoWhite} alt="Syntalia Vértice" className="h-9 w-auto object-contain lg:h-10" />
    </Link>
  );

  return (
    <header className={cn("z-50", isHome ? "fixed inset-x-0 top-0" : "sticky top-0")}>
      <div className="flex justify-center px-4 pt-4 sm:px-6 sm:pt-6">
        {/* ---------- Escritorio: una sola píldora con todo dentro ---------- */}
        <div className={cn("hidden items-center gap-2.5 py-[9px] pr-[9px] pl-6 lg:flex", pill)}>
          {Wordmark}

          <span className="mx-2 h-5 w-px shrink-0 bg-cream/14" aria-hidden />

          <nav className="flex items-center gap-1">
            {nav.map((n) => (
              <Link
                key={n.label}
                to={n.to}
                hash={n.hash}
                hashScrollIntoView={{ behavior: "smooth" }}
                className={cn(linkBase, "text-cream/66 hover:text-cream")}
                {...(!n.hash && {
                  activeProps: {
                    className: cn(linkBase, "bg-cream/9 text-cream"),
                    "aria-current": "page" as const,
                  },
                  activeOptions: { exact: n.to === "/" },
                })}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <GoldButton to="/diagnostico" size="compact" className="ml-2">
            Diagnóstico
          </GoldButton>
        </div>

        {/* ---------- Móvil y tablet: píldora con logotipo y botón redondo ---------- */}
        <div className={cn("flex w-full items-center justify-between gap-3 py-2.5 pr-2.5 pl-5 lg:hidden", pill)}>
          {Wordmark}

          <div className="flex items-center gap-2">
            <GoldButton to="/diagnostico" size="compact" className="hidden sm:inline-flex" onClick={() => setOpen(false)}>
              Diagnóstico
            </GoldButton>

            <button
              onClick={() => setOpen(!open)}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cream/16 bg-cream/6 text-cream transition-colors hover:border-gold/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
              aria-controls="mobile-nav"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ---------- Panel desplegable ---------- */}
      <div
        id="mobile-nav"
        aria-hidden={!open}
        className={cn(
          "mx-4 overflow-hidden transition-all duration-300 sm:mx-6 lg:hidden",
          open ? "mt-3 max-h-[30rem]" : "mt-0 max-h-0",
        )}
      >
        <nav className={cn("flex flex-col gap-1 p-4", pill)}>
          {nav.map((n) => (
            <Link
              key={n.label}
              to={n.to}
              hash={n.hash}
              hashScrollIntoView={{ behavior: "smooth" }}
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
              className="flex items-center gap-2.5 rounded-2xl px-4 py-3 text-base font-medium text-cream/75 transition-colors hover:bg-cream/6 hover:text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
              {n.label}
            </Link>
          ))}

          <GoldButton
            to="/diagnostico"
            className="mt-2 w-full sm:hidden"
            onClick={() => setOpen(false)}
          >
            Solicitar diagnóstico
          </GoldButton>
        </nav>
      </div>
    </header>
  );
}
