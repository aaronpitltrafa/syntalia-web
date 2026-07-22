/**
 * THE single fixed background for the entire site (outside the fullscreen
 * hero, which paints its own scene): a flat, uniform cream fill. Mounted
 * once in the root layout; sections above it must stay transparent / glass
 * so this is the only backdrop anyone sees.
 */
export function ParallaxBackground() {
  return <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-cream" />;
}
