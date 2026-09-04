import type { ReactNode } from "react";

export type LegalSection = {
  id: string;
  title: string;
  content: ReactNode;
};

export function LegalPage({
  title,
  description,
  updated,
  sections,
  whiteContent = false,
}: {
  title: string;
  description?: string;
  updated: string;
  sections: LegalSection[];
  /** Wraps the content column in a white card, separating it visually from the cream index column. Opt-in so existing pages keep their current look. */
  whiteContent?: boolean;
}) {
  return (
    <div>
      <section className="relative bg-gradient-navy text-cream">
        <div className="relative mx-auto max-w-5xl px-6 py-20 md:py-28">
          <p className="text-xs uppercase tracking-[0.4em] text-gold">Legal</p>
          <h1 className="mt-6 text-4xl font-semibold leading-[1.05] md:text-5xl">{title}</h1>
          {description && <p className="mt-5 max-w-2xl text-cream/75">{description}</p>}
          <p className="mt-5 text-sm text-cream/60">Última actualización: {updated}</p>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <div className="grid gap-12 lg:grid-cols-[220px_1fr]">
            <nav aria-label="Índice" className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-xs font-bold uppercase tracking-widest text-gold-light">Índice</p>
              <ul className="mt-4 space-y-1 border-l border-border text-sm">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="block border-l-2 border-transparent py-1.5 pl-4 -ml-px text-foreground/60 transition-colors hover:border-gold hover:text-primary"
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div
              className={
                whiteContent
                  ? "max-w-2xl space-y-14 rounded-3xl border border-border bg-card p-6 shadow-sm md:p-10"
                  : "max-w-2xl space-y-14"
              }
            >
              {sections.map((s) => (
                <section key={s.id} id={s.id} className="scroll-mt-28">
                  <h2 className="text-xl font-semibold text-primary md:text-2xl">{s.title}</h2>
                  <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-foreground/75">
                    {s.content}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
