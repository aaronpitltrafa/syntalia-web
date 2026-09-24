import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { goldCtaClasses, type GoldCtaSize } from "@/lib/gold-cta-classes";

/**
 * Botón dorado de la home v3 como enlace, con flecha que avanza al pasar.
 * La versión compacta es la del header y va sin flecha.
 */
export function GoldCta({
  to,
  size = "default",
  className,
  onClick,
  children,
}: {
  to: string;
  size?: GoldCtaSize;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link to={to} onClick={onClick} className={goldCtaClasses(size, className)}>
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
