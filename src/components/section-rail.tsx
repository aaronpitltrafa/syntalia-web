import { SectionLink } from "@/components/section-link";
import { HOME_SECTIONS, useActiveSection } from "@/lib/home-sections";
import { cn } from "@/lib/utils";

/**
 * Raíl lateral de la home, solo desde 1180px: un punto por sección y el
 * nombre al pasar el ratón (o en la activa). La sección activa la marca el
 * mismo observador que el header.
 *
 * Los nombres van en una pastilla oscura y los puntos llevan un filete:
 * mientras convivan bloques crema, el raíl tiene que leerse sobre los dos
 * fondos.
 */
export function SectionRail() {
  const active = useActiveSection();

  return (
    <nav
      aria-label="Secciones de la página"
      className="fixed top-1/2 right-[22px] z-40 hidden -translate-y-1/2 flex-col gap-[14px] min-[1180px]:flex"
    >
      {HOME_SECTIONS.map((s) => {
        const on = s.id === active;
        return (
          <SectionLink
            key={s.id}
            id={s.id}
            aria-current={on ? "location" : undefined}
            className="group flex items-center justify-end gap-2.5 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
          >
            <span
              className={cn(
                "rounded-full bg-[rgb(6_16_50/0.85)] px-2 py-1 text-[10px] leading-none font-semibold tracking-[0.16em] uppercase backdrop-blur-md transition-opacity duration-200 motion-reduce:transition-none",
                on
                  ? "text-gold-light opacity-100"
                  : "text-cream/75 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100",
              )}
            >
              {s.label}
            </span>
            <i
              aria-hidden
              className={cn(
                "block h-[7px] w-[7px] shrink-0 rounded-full transition-all duration-250 motion-reduce:transition-none",
                on
                  ? "scale-125 bg-gold shadow-[0_0_0_4px_rgb(221_174_69/0.18)]"
                  : "bg-cream/30 shadow-[0_0_0_1px_rgb(3_11_36/0.35)]",
              )}
            />
          </SectionLink>
        );
      })}
    </nav>
  );
}
