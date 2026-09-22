import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * El botón principal de la dirección A: píldora navy con texto crema y un
 * disco dorado a la derecha; el disco gira -45° al pasar el ratón. Dentro
 * de surface-navy se invierte solo (ver .btn-gold en styles.css).
 */
type Size = "default" | "compact";

const shell: Record<Size, string> = {
  default: "min-h-[58px] gap-3.5 py-[7px] pr-[7px] pl-[26px] text-body",
  compact: "min-h-[42px] gap-2.5 py-[5px] pr-[5px] pl-[18px] text-meta",
};

const disc: Record<Size, string> = {
  default: "h-11 w-11",
  compact: "h-8 w-8",
};

const glyph: Record<Size, string> = {
  default: "h-4 w-4",
  compact: "h-[13px] w-[13px]",
};

function Inner({ size, children }: { size: Size; children: React.ReactNode }) {
  return (
    <>
      {children}
      <span
        aria-hidden
        className={cn("btn-disc flex shrink-0 items-center justify-center rounded-full", disc[size])}
      >
        <ArrowRight className={glyph[size]} strokeWidth={2.2} />
      </span>
    </>
  );
}

const base =
  "btn-gold group inline-flex items-center justify-center rounded-full font-semibold tracking-[-0.01em] whitespace-nowrap focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

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

/** Misma píldora para destinos que no son rutas (anclas, mailto, tel). */
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
