import { cn } from "@/lib/utils";

/**
 * Clases del botón dorado de la home v3: relleno dorado, texto casi negro
 * (8,5:1), radio de 12px. Las usan GoldCta (enlace) y los <button> de los
 * formularios, que no pueden ser un Link.
 */
export type GoldCtaSize = "default" | "compact";

const shell: Record<GoldCtaSize, string> = {
  default: "gap-[11px] px-6 py-4 text-[15px]",
  compact: "gap-2 px-[18px] py-[11px] text-[14px]",
};

const base =
  "group inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-btn bg-gold leading-none font-semibold text-on-gold " +
  "shadow-[0_14px_34px_-16px_rgb(221_174_69/0.85)] transition-[translate,box-shadow] duration-200 " +
  "hover:-translate-y-px hover:shadow-[0_18px_40px_-16px_rgb(221_174_69/0.95)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light";

export function goldCtaClasses(size: GoldCtaSize = "default", className?: string) {
  return cn(base, shell[size], className);
}
