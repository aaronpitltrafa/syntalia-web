import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";

/**
 * Starts `false` on both server and first client render (so hydration never
 * mismatches), then corrects itself in an effect once mounted. Checking
 * `window.matchMedia` directly at render time looks tempting but produces a
 * server/client branch that React's hydration silently refuses to patch,
 * leaving the SSR value stuck forever.
 */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

export function useInView<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/** Animated number counter that runs when scrolled into view. */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  const reduceMotion = usePrefersReducedMotion();
  const style: CSSProperties = reduceMotion
    ? { opacity: 1, transform: "none" }
    : {
        transform: inView ? "translateY(0)" : `translateY(${y}px)`,
        opacity: inView ? 1 : 0,
        transition: `transform 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}ms, opacity 0.9s ease ${delay}ms`,
        willChange: "transform, opacity",
      };
  return (
    <div ref={ref} style={style} className={className}>
      {children}
    </div>
  );
}

/** Card that tilts toward the cursor in 3D. */
export function Magnetic({
  children,
  className,
  strength = 10,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateX(${-y * strength}deg) rotateY(${x * strength}deg) translateZ(0)`;
    };
    const reset = () => {
      el.style.transform = "perspective(900px) rotateX(0) rotateY(0)";
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", reset);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", reset);
    };
  }, [strength]);
  return (
    <div ref={ref} className={className} style={{ transformStyle: "preserve-3d", transition: "transform 0.3s ease" }}>
      {children}
    </div>
  );
}
