import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Botón dorado de la home v3: relleno dorado, texto casi negro (8,5:1),
 * radio de 12px y flecha que avanza al pasar. La versión compacta es la
 * del header y va sin flecha.
 */
type Size = "default" | "compact";

const shell: Record<Size, string> = {
  default: "gap-[11px] px-6 py-4 text-[15px]",
  compact: "gap-2 px-[18px] py-[11px] text-[14px]",
};

const base =
  "group inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-btn bg-gold leading-none font-semibold text-on-gold " +
  "shadow-[0_14px_34px_-16px_rgb(212_175_55/0.85)] transition-[translate,box-shadow] duration-200 " +
  "hover:-translate-y-px hover:shadow-[0_18px_40px_-16px_rgb(212_175_55/0.95)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light";

export function GoldCta({
  to,
  size = "default",
  className,
  onClick,
  children,
}: {
  to: string;
  size?: Size;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link to={to} onClick={onClick} className={cn(base, shell[size], className)}>
      {children}
      {size === "default" && (
        <ArrowRight
          aria-hidden
          strokeWidth={2.4}
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-[3px] motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
        />
      )}
    </Link>
  );
}
