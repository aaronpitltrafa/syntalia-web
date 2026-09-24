import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import logoHorizontal from "@/assets/logo-horizontal.png";
import { GoldCta } from "@/components/gold-cta";
import { SectionLink } from "@/components/section-link";
import { isHomeSection, useActiveSection } from "@/lib/home-sections";
import { cn } from "@/lib/utils";

/**
 * Cada entrada apunta a su sección de la home. Mientras esa sección no
 * exista todavía en la home (no está en HOME_SECTIONS), enlaza a su página.
 */
const nav: { label: string; section: string; page?: string }[] = [
  { label: "Sistema", section: "sistema" },
  { label: "Servicios", section: "servicios" },
  { label: "Resultados", section: "caso" },
  { label: "Quiénes somos", section: "equipo", page: "/quienes-somos" },
  { label: "FAQ", section: "faq" },
];

/** Píldora azul translúcida: se lee igual sobre la home oscura y sobre las páginas crema. */
const glass =
  "border border-cream/13 bg-[rgb(6_16_50/0.78)] shadow-[0_24px_50px_-34px_rgb(0_0_0/0.9)] backdrop-blur-[16px]";

const focus = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

function NavLink({
  item,
  on,
  className,
  onClick,
  tabIndex,
}: {
  item: (typeof nav)[number];
  on: boolean;
  className: string;
  onClick?: () => void;
  tabIndex?: number;
}) {
  const cls = cn(
    className,
    focus,
    "transition-colors duration-200 motion-reduce:transition-none",
    on ? "bg-cream/9 text-cream" : "text-cream/72 hover:bg-cream/6 hover:text-cream",
  );
  const content = (
    <>
      {on && (
        <span aria-hidden className="mr-2 block h-[5px] w-[5px] shrink-0 rounded-full bg-gold" />
      )}
      {item.label}
    </>
  );

  if (isHomeSection(item.section)) {
    return (
      <SectionLink
        id={item.section}
        onClick={onClick}
        tabIndex={tabIndex}
        aria-current={on ? "location" : undefined}
        className={cls}
      >
        {content}
      </SectionLink>
    );
  }
  return (
    <Link to={item.page!} onClick={onClick} tabIndex={tabIndex} className={cls}>
      {content}
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";
  const active = useActiveSection();

  const isOn = (item: (typeof nav)[number]) =>
    isHomeSection(item.section)
      ? isHome && active === item.section
      : !!item.page && (pathname === item.page || pathname.startsWith(`${item.page}/`));

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    // Si la ventana crece por encima de 980px con el menú abierto, se cierra
    // (el panel desaparece y no debe quedar el scroll bloqueado).
    const wide = window.matchMedia("(min-width: 980px)");
    const onWide = () => wide.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <header
      className={cn(
        "z-50 pt-[calc(14px+env(safe-area-inset-top,0px))]",
        isHome ? "fixed inset-x-0 top-0" : "sticky top-0",
      )}
    >
      <div className="contenedor">
        <div
          className={cn(
            "flex items-center gap-2.5 rounded-full py-[9px] pr-[9px] pl-4 sm:pl-5 min-[980px]:gap-[22px]",
            glass,
          )}
        >
          <Link
            to="/"
            activeOptions={{ exact: true }}
            onClick={() => setOpen(false)}
            aria-label="Syntalia Vértice · inicio"
            className={cn("mr-auto flex min-w-0 items-center rounded-full", focus)}
          >
            {/* A 360px no caben logo de 34px, botón y hamburguesa: el logo
                se encoge lo justo en vez de desbordar la píldora. */}
            <img
              src={logoHorizontal}
              alt=""
              width={607}
              height={120}
              className="h-[34px] w-auto max-w-full object-contain object-left sm:h-[38px]"
            />
          </Link>

          <nav aria-label="Principal" className="hidden gap-1 min-[980px]:flex">
            {nav.map((item) => (
              <NavLink
                key={item.label}
                item={item}
                on={isOn(item)}
                className="flex items-center rounded-full px-3.5 py-[9px] text-[14.5px] leading-none font-normal whitespace-nowrap"
              />
            ))}
          </nav>

          <GoldCta to="/diagnostico" size="compact" onClick={() => setOpen(false)}>
            <span className="sm:hidden">Diagnóstico</span>
            <span className="hidden sm:inline">Solicitar diagnóstico</span>
          </GoldCta>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            className={cn(
              "grid h-[42px] w-[42px] shrink-0 place-content-center rounded-full border border-cream/13 bg-cream/7 text-cream transition-colors hover:border-gold/55 min-[980px]:hidden",
              focus,
            )}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
          </button>
        </div>

        {/* ---------- Panel desplegable, por debajo de 980px ---------- */}
        <div
          id="mobile-nav"
          aria-hidden={!open}
          className={cn(
            "overflow-hidden transition-all duration-300 motion-reduce:transition-none min-[980px]:hidden",
            open ? "mt-3 max-h-[30rem]" : "mt-0 max-h-0",
          )}
        >
          <nav aria-label="Principal" className={cn("flex flex-col gap-1 rounded-card p-3", glass)}>
            {nav.map((item) => (
              <NavLink
                key={item.label}
                item={item}
                on={isOn(item)}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                className="flex items-center rounded-btn px-4 py-3 text-body leading-none font-normal"
              />
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
