/**
 * THE single fixed background for the entire site (outside the fullscreen
 * hero, which paints its own scene): a flat, uniform ink fill — the dark
 * floor the whole redesign sits on. Mounted once in the root layout;
 * sections above it must stay transparent / glass so this is the only
 * backdrop anyone sees. A light section has to declare itself (bg-cream
 * plus navy text); it never happens by omission.
 */
export function ParallaxBackground() {
  return <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-ink" />;
}
