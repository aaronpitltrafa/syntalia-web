import { useNavigate } from "@tanstack/react-router";
import type { HomeSectionId } from "@/lib/home-sections";

/**
 * Enlace a una sección de la home. No usa <Link>: Link marca como activo
 * (aria-current="page") todo lo que apunte a "/", así que en la home todos
 * los puntos del raíl y del menú se anunciarían como página actual. Aquí
 * el estado activo lo pone quien lo usa, a partir del observador.
 */
export function SectionLink({
  id,
  onClick,
  children,
  ...rest
}: { id: HomeSectionId } & Omit<React.ComponentProps<"a">, "href">) {
  const navigate = useNavigate();

  return (
    <a
      href={`/#${id}`}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        // Clic con modificador o botón central: que el navegador haga lo suyo.
        if (
          e.defaultPrevented ||
          e.button !== 0 ||
          e.metaKey ||
          e.ctrlKey ||
          e.shiftKey ||
          e.altKey
        )
          return;
        e.preventDefault();
        const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        // Si la URL ya lleva este ancla, el router no navega (es la misma
        // dirección) y no se movería nada: se desplaza aquí directamente.
        // scrollIntoView respeta el scroll-margin-top de .ancla.
        const destino = document.getElementById(id);
        if (window.location.pathname === "/" && window.location.hash === `#${id}` && destino) {
          destino.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
          return;
        }
        navigate({ to: "/", hash: id, hashScrollIntoView: smooth ? { behavior: "smooth" } : true });
      }}
    >
      {children}
    </a>
  );
}
