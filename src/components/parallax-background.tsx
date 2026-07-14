import { useEffect, useRef } from "react";

/**
 * Bold animated 3D parallax background.
 * - True perspective + rotateX/Y on scroll and mouse
 * - Multiple depth layers: gradient wash, moving grid, blobs, orbs, rings, particles
 * Purely decorative. pointer-events-none, aria-hidden.
 */
export function ParallaxBackground() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const scrollY = useRef(0);
  const targetMX = useRef(0);
  const targetMY = useRef(0);
  const mx = useRef(0);
  const my = useRef(0);
  const raf = useRef<number | null>(null);
  const t0 = useRef<number>(0);

  useEffect(() => {
    const onScroll = () => { scrollY.current = window.scrollY; };
    const onMouse = (e: MouseEvent) => {
      targetMX.current = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMY.current = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    t0.current = performance.now();

    const tick = (now: number) => {
      mx.current += (targetMX.current - mx.current) * 0.07;
      my.current += (targetMY.current - my.current) * 0.07;
      const time = (now - t0.current) / 1000;
      const root = rootRef.current;
      if (root) {
        const y = scrollY.current;
        root.querySelectorAll<HTMLElement>("[data-depth]").forEach((el) => {
          const d = parseFloat(el.dataset.depth || "0");
          const rot = parseFloat(el.dataset.rot || "0");
          const fx = parseFloat(el.dataset.float || "0");
          const px = parseFloat(el.dataset.px || "0");
          const py = parseFloat(el.dataset.py || "0");
          const tx = mx.current * d * 60 + Math.sin(time * 0.6 + px) * fx;
          const ty = my.current * d * 60 - y * d * 0.45 + Math.cos(time * 0.5 + py) * fx;
          const tz = d * -160;
          const rx = my.current * -rot + Math.sin(time * 0.3) * (rot * 0.15);
          const ry = mx.current * rot + Math.cos(time * 0.4) * (rot * 0.15);
          el.style.transform = `translate3d(${tx}px, ${ty}px, ${tz}px) rotateX(${rx}deg) rotateY(${ry}deg)`;
        });
      }
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouse, { passive: true });
    raf.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouse);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ perspective: "1400px", perspectiveOrigin: "50% 40%", transformStyle: "preserve-3d" }}
    >
      {/* Animated cream/gold wash */}
      <div
        className="absolute -inset-[10%] animate-[bgShift_18s_ease-in-out_infinite_alternate]"
        style={{
          background:
            "radial-gradient(60% 50% at 20% 20%, oklch(0.9 0.13 82 / 0.55), transparent 60%), radial-gradient(50% 60% at 85% 30%, oklch(0.35 0.16 269 / 0.35), transparent 65%), radial-gradient(60% 50% at 50% 90%, oklch(0.86 0.14 82 / 0.45), transparent 65%), linear-gradient(180deg, oklch(0.96 0.012 88) 0%, oklch(0.93 0.02 86) 100%)",
        }}
      />

      {/* Deep 3D grid — tilted */}
      <div
        data-depth="0.2"
        data-rot="6"
        data-float="0"
        className="absolute -inset-[20%] will-change-transform"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.235 0.137 269 / 0.09) 1px, transparent 1px), linear-gradient(90deg, oklch(0.235 0.137 269 / 0.09) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          transform: "rotateX(55deg)",
        }}
      />

      {/* Big gold aura — far */}
      <div
        data-depth="0.35" data-rot="6" data-float="18" data-px="1" data-py="2"
        className="absolute left-[8%] top-[10%] h-[46rem] w-[46rem] rounded-full will-change-transform"
        style={{
          background: "radial-gradient(circle at 30% 30%, oklch(0.86 0.16 82 / 0.85), transparent 60%)",
          filter: "blur(70px)",
        }}
      />

      {/* Deep navy plasma */}
      <div
        data-depth="0.5" data-rot="8" data-float="24" data-px="2" data-py="0.5"
        className="absolute right-[2%] top-[28%] h-[40rem] w-[40rem] rounded-full will-change-transform"
        style={{
          background: "radial-gradient(circle at 60% 40%, oklch(0.32 0.17 269 / 0.75), transparent 65%)",
          filter: "blur(80px)",
        }}
      />

      {/* Gold cluster mid-front */}
      <div
        data-depth="0.7" data-rot="10" data-float="30" data-px="3" data-py="1"
        className="absolute left-[38%] top-[62%] h-[34rem] w-[34rem] rounded-full will-change-transform"
        style={{
          background: "radial-gradient(circle at 50% 50%, oklch(0.9 0.13 86 / 0.75), transparent 65%)",
          filter: "blur(55px)",
        }}
      />

      {/* Sharp gold ring — front */}
      <div
        data-depth="1.1" data-rot="16" data-float="40" data-px="0" data-py="1.5"
        className="absolute left-[62%] top-[18%] h-80 w-80 rounded-full will-change-transform"
        style={{
          border: "2px solid oklch(0.745 0.135 82 / 0.85)",
          boxShadow: "0 0 80px oklch(0.745 0.135 82 / 0.4), inset 0 0 40px oklch(0.745 0.135 82 / 0.15)",
        }}
      />

      {/* Small ring — front */}
      <div
        data-depth="1.3" data-rot="20" data-float="50" data-px="4" data-py="2.5"
        className="absolute left-[12%] top-[72%] h-48 w-48 rounded-full will-change-transform"
        style={{
          border: "1px solid oklch(0.235 0.137 269 / 0.55)",
          boxShadow: "0 0 40px oklch(0.235 0.137 269 / 0.25)",
        }}
      />

      {/* Floating 3D cube */}
      <div
        data-depth="0.9" data-rot="18" data-float="35" data-px="5" data-py="1"
        className="absolute right-[15%] top-[70%] h-40 w-40 will-change-transform"
        style={{
          background: "linear-gradient(135deg, oklch(0.745 0.135 82 / 0.6), oklch(0.86 0.14 82 / 0.2))",
          transform: "rotate(45deg)",
          borderRadius: "18px",
          border: "1px solid oklch(0.745 0.135 82 / 0.6)",
          boxShadow: "0 30px 80px -20px oklch(0.235 0.137 269 / 0.35)",
        }}
      />

      {/* Floating navy diamond */}
      <div
        data-depth="1.05" data-rot="14" data-float="28" data-px="1.5" data-py="3"
        className="absolute left-[48%] top-[8%] h-24 w-24 will-change-transform"
        style={{
          background: "linear-gradient(135deg, oklch(0.235 0.137 269 / 0.75), oklch(0.35 0.16 269 / 0.35))",
          transform: "rotate(45deg)",
          borderRadius: "10px",
          boxShadow: "0 20px 60px -10px oklch(0.235 0.137 269 / 0.5)",
        }}
      />

      {/* Sparkle dots */}
      {[
        { l: "20%", t: "40%", s: 6, d: 1.15, r: 22, f: 30, px: 0, py: 0 },
        { l: "78%", t: "55%", s: 5, d: 1.25, r: 24, f: 26, px: 2, py: 1 },
        { l: "55%", t: "30%", s: 4, d: 1.35, r: 26, f: 20, px: 3, py: 2 },
        { l: "30%", t: "80%", s: 5, d: 1.2, r: 22, f: 24, px: 1, py: 3 },
        { l: "88%", t: "12%", s: 4, d: 1.4, r: 28, f: 22, px: 4, py: 0.5 },
      ].map((p, i) => (
        <div
          key={i}
          data-depth={p.d} data-rot={p.r} data-float={p.f} data-px={p.px} data-py={p.py}
          className="absolute rounded-full will-change-transform"
          style={{
            left: p.l,
            top: p.t,
            width: `${p.s * 4}px`,
            height: `${p.s * 4}px`,
            background: "radial-gradient(circle, oklch(0.9 0.14 82) 0%, transparent 70%)",
            boxShadow: "0 0 20px oklch(0.86 0.14 82 / 0.8)",
          }}
        />
      ))}

      {/* Subtle noise */}
      <div
        data-depth="0.15" data-rot="2" data-float="0"
        className="absolute -inset-[5%] noise-overlay opacity-30 will-change-transform"
      />
    </div>
  );
}
