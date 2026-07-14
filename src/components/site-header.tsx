import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import logoAsset from "@/assets/logo-syntalia-transparent.png.asset.json";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Inicio" },
  { to: "/servicios", label: "Servicios" },
  { to: "/quienes-somos", label: "Quiénes Somos" },
  { to: "/contacto", label: "Contacto" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logoAsset.url} alt="Syntalia Vértice" className="h-11 w-auto object-contain transition-transform group-hover:rotate-12" />
          <div className="leading-tight">
            <div className="text-lg font-semibold tracking-wide text-gold">Syntalia</div>
            <div className="text-lg font-semibold tracking-wide text-primary">Vértice</div>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-9">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm font-medium text-foreground/80 hover:text-accent transition-colors"
              activeProps={{ className: "text-accent" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/diagnostico"
          className="hidden md:inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-primary-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          Diagnóstico gratuito
        </Link>
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-primary"
          aria-label="Menú"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      <div className={cn("md:hidden overflow-hidden transition-all", open ? "max-h-96" : "max-h-0")}>
        <nav className="flex flex-col gap-1 px-6 py-4 border-t border-border/40">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              className="py-3 text-sm font-medium text-foreground/80 border-b border-border/30"
            >
              {n.label}
            </Link>
          ))}
          <Link
            to="/diagnostico"
            onClick={() => setOpen(false)}
            className="mt-3 inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-xs font-semibold uppercase tracking-wider text-primary-foreground"
          >
            Diagnóstico gratuito
          </Link>
        </nav>
      </div>
    </header>
  );
}