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
      <section className="relative">
        <div className="relative mx-auto max-w-5xl px-6 pt-28 pb-12 md:pb-16 lg:pt-32">
          <p className="label-mono">Legal</p>
          <h1 className="mt-6 text-h2 text-balance">{title}</h1>
          {description && <p className="mt-5 max-w-2xl text-foreground/75">{description}</p>}
          <p className="mt-5 text-sm text-foreground/60">Última actualización: {updated}</p>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <div className="grid gap-12 lg:grid-cols-[220px_1fr]">
            <nav aria-label="Índice" className="lg:sticky lg:top-28 lg:self-start">
              <p className="label-mono">Índice</p>
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
                  ? "min-w-0 max-w-2xl space-y-14 rounded-3xl border border-border bg-card p-6 shadow-sm md:p-10"
                  : "min-w-0 max-w-2xl space-y-14"
              }
            >
              {sections.map((s) => (
                <section key={s.id} id={s.id} className="scroll-mt-28">
                  <h2 className="text-title font-bold leading-[1.15] tracking-[-0.03em] text-foreground">{s.title}</h2>
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
