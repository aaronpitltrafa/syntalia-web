import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowRight, Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";
import { cn } from "@/lib/utils";

const nav: { to: string; label: string; hash?: string }[] = [
  { to: "/", label: "Inicio" },
  { to: "/servicios", label: "Servicios" },
  { to: "/quienes-somos", label: "Quiénes Somos" },
  { to: "/", hash: "faq", label: "FAQ" },
  { to: "/contacto", label: "Contacto" },
];

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

  const ctaClass =
    "inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-wider text-navy transition-colors hover:bg-gold-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy";
  const mobileCtaClass =
    "mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-navy";

  const DesktopCta = (
    <Link to="/diagnostico" className={cn("hidden md:inline-flex", ctaClass)}>
      Solicitar diagnóstico
      <ArrowRight className="h-4 w-4" />
    </Link>
  );

  const MobileCta = (
    <Link to="/diagnostico" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1} className={mobileCtaClass}>
      Solicitar diagnóstico
    </Link>
  );

  return (
    <header
      className={cn(
        "z-50",
        isHome ? "fixed inset-x-0 top-0" : "sticky top-0",
        "border-b border-border/50 bg-background",
      )}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-6 py-4 sm:px-8 sm:py-5 lg:px-12">
        <Link to="/" className="col-start-1 flex items-center justify-self-start">
          <img src={logo} alt="Syntalia Vértice" className="h-12 w-auto object-contain sm:h-14" />
        </Link>

        <nav className="col-start-2 hidden items-center gap-7 rounded-full border border-navy/10 bg-navy/[0.04] px-7 py-3 md:flex">
          {nav.map((n) => (
            <Link
              key={n.label}
              to={n.to}
              hash={n.hash}
              hashScrollIntoView={{ behavior: "smooth" }}
              className="flex items-center gap-2 border-b-2 border-transparent pb-0.5 text-base font-medium text-primary/80 transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              {...(!n.hash && {
                activeProps: {
                  className: "text-primary border-b-gold",
                  "aria-current": "page" as const,
                },
                activeOptions: { exact: n.to === "/" },
              })}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="col-start-3 flex items-center justify-self-end gap-2">
          {DesktopCta}
          <button
            onClick={() => setOpen(!open)}
            className="p-2 text-primary transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold md:hidden"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        aria-hidden={!open}
        className={cn("overflow-hidden bg-background transition-all md:hidden", open ? "max-h-96" : "max-h-0")}
      >
        <nav className="flex flex-col gap-1 border-t border-border/40 px-6 py-4">
          {nav.map((n) => (
            <Link
              key={n.label}
              to={n.to}
              hash={n.hash}
              hashScrollIntoView={{ behavior: "smooth" }}
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
              className="flex items-center gap-2 border-b border-border/30 py-3 text-base font-medium text-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              {n.label}
            </Link>
          ))}
          {MobileCta}
        </nav>
      </div>
    </header>
  );
}
