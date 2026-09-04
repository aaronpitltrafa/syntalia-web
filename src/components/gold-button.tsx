import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * El botón primario del rediseño v2.
 *
 * Siempre lleva el disco navy con la flecha a la derecha: es su seña de
 * identidad en el boceto, no un adorno opcional. Dos tamaños — el normal
 * (58px de alto, disco de 48px) para hero y secciones, y el compacto para
 * la píldora de la cabecera.
 */
type Size = "default" | "compact";

const shell: Record<Size, string> = {
  default: "min-h-[58px] gap-4 py-[5px] pl-7 pr-[5px] text-base",
  compact: "min-h-[46px] gap-3 py-[5px] pl-5 pr-[5px] text-sm",
};

const disc: Record<Size, string> = {
  default: "h-12 w-12",
  compact: "h-9 w-9",
};

const glyph: Record<Size, string> = {
  default: "h-[17px] w-[17px]",
  compact: "h-3.5 w-3.5",
};

function Inner({ size, children }: { size: Size; children: React.ReactNode }) {
  return (
    <>
      {children}
      <span
        aria-hidden
        className={cn(
          "flex shrink-0 items-center justify-center rounded-full bg-navy shadow-[inset_0_1px_0_oklch(0.961_0.012_91/16%)]",
          disc[size],
        )}
      >
        <ArrowRight className={cn("text-gold-light transition-transform group-hover:translate-x-0.5", glyph[size])} />
      </span>
    </>
  );
}

const base =
  "btn-gold group inline-flex items-center justify-center rounded-full font-semibold tracking-[-0.01em] transition-[background,transform] hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

export function GoldButton({
  to,
  hash,
  size = "default",
  className,
  onClick,
  children,
}: {
  to: string;
  hash?: string;
  size?: Size;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      hash={hash}
      hashScrollIntoView={hash ? { behavior: "smooth" } : undefined}
      onClick={onClick}
      className={cn(base, shell[size], className)}
    >
      <Inner size={size}>{children}</Inner>
    </Link>
  );
}

/** Misma pastilla para destinos que no son rutas (anclas, mailto, tel). */
export function GoldButtonLink({
  href,
  size = "default",
  className,
  children,
}: {
  href: string;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} className={cn(base, shell[size], className)}>
      <Inner size={size}>{children}</Inner>
    </a>
  );
}
