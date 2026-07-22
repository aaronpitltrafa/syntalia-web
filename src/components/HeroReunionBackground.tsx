const IMAGE_SRC = "/images/syntalia-hero-reunion.jpeg";

/**
 * Real meeting-room photo background for the hero: absolute, full-bleed,
 * object-fit cover. A very soft ~2px blur (see .hero-reunion-image) takes
 * the edge off for a premium feel without reading as out-of-focus; overlay
 * layers on top handle legibility. Falls back to solid navy until the file
 * is added.
 */
export function HeroReunionBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ backgroundColor: "#021557" }}>
      <img
        src={IMAGE_SRC}
        alt=""
        aria-hidden
        className="hero-reunion-image pointer-events-none absolute inset-0 h-full w-full select-none object-cover object-[62%_35%] sm:object-[58%_38%] lg:object-[55%_42%]"
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />

      {/* General wash — light, uniform, keeps the photo protagonist; nudged
          up very slightly to offset the soft blur and keep text crisp */}
      <div className="pointer-events-none absolute inset-0 bg-black/[0.22]" />

      {/* Top: keeps the header capsule legible over any part of the photo */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-36 sm:h-44"
        style={{ background: "linear-gradient(180deg, rgba(2,10,28,0.55) 0%, rgba(2,10,28,0) 100%)" }}
      />

      {/* Bottom-left: lifts the headline in the lower-left zone */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(60% 60% at 14% 88%, rgba(2,6,20,0.62) 0%, rgba(2,6,20,0) 68%)",
        }}
      />

      {/* Bottom: one continuous fade — same navy hue throughout, eased
          across several stops — so the photo dissolves progressively into
          solid corporate navy and hands off to the strip below with no
          visible seam or band. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[46%] sm:h-[50%] lg:h-[54%]"
        style={{
          background:
            "linear-gradient(0deg, rgba(2,21,87,1) 0%, rgba(2,21,87,0.92) 12%, rgba(2,21,87,0.68) 32%, rgba(2,21,87,0.34) 58%, rgba(2,21,87,0.08) 82%, rgba(2,21,87,0) 100%)",
        }}
      />
    </div>
  );
}
