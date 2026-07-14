import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";

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
export function Counter({
  to,
  duration = 1800,
  decimals = 0,
  prefix = "",
  suffix = "",
  separator = ".",
  decimalSep = ",",
  className,
}: {
  to: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  separator?: string;
  decimalSep?: string;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.4);
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  const format = (n: number) => {
    const fixed = n.toFixed(decimals);
    const [i, d] = fixed.split(".");
    const withSep = i.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    return d ? `${withSep}${decimalSep}${d}` : withSep;
  };
  return (
    <span ref={ref} className={className}>
      {prefix}
      {format(val)}
      {suffix}
    </span>
  );
}

/** Wrap children in a scroll-reveal container with optional stagger. */
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
  const style: CSSProperties = {
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
