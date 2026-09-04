import { Link } from "@tanstack/react-router";
import { Check, ArrowRight } from "lucide-react";
import { ContactForm } from "./contact-form";
import logoAsset from "@/assets/logo-dorado.png.asset.json";

export type ServicePageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  whyTitle: string;
  whyContent: React.ReactNode;
  whatTitle: string;
  whatItems: string[];
  whenTitle: string;
  whenIntro?: string;
  whenItems: string[];
  whenOutro?: string;
  ctaTitle: string;
  ctaText: string;
  extra?: React.ReactNode;
};

export function ServicePage(props: ServicePageProps) {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-navy text-cream">
        <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
          <Link to="/servicios" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gold hover:text-cream">
            ← Servicios
          </Link>
          <p className="mt-6 text-xs uppercase tracking-[0.4em] text-gold">{props.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-[1.05] md:text-6xl text-balance">
            {props.title}
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-cream/75 leading-relaxed">{props.intro}</p>
        </div>
      </section>

      {/* Why */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto grid max-w-6xl gap-16 px-6 py-24 md:grid-cols-5">
          <div className="md:col-span-2">
            <div className="gold-divider" />
            <h2 className="mt-6 text-3xl font-semibold leading-tight md:text-4xl text-balance">{props.whyTitle}</h2>
          </div>
          <div className="md:col-span-3 text-base leading-relaxed text-foreground/80 space-y-5">
            {props.whyContent}
          </div>
        </div>
      </section>

      {/* What includes */}
      <section className="bg-secondary/40">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="gold-divider" />
          <h2 className="mt-6 max-w-3xl text-3xl font-semibold md:text-4xl text-balance">{props.whatTitle}</h2>
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {props.whatItems.map((item, i) => (
              <div key={i} className="group relative rounded-3xl border border-border bg-background p-7 transition-all hover:border-accent hover:shadow-[0_20px_60px_-20px_oklch(0.235_0.137_269/0.25)]">
                <div className="flex items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-gold text-navy">
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </div>
                  <p className="text-sm leading-relaxed text-foreground/85">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {props.extra}

      {/* When */}
      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="gold-divider" />
          <h2 className="mt-6 max-w-3xl text-3xl font-semibold md:text-4xl text-balance">{props.whenTitle}</h2>
          {props.whenIntro && <p className="mt-5 max-w-3xl text-foreground/75">{props.whenIntro}</p>}
          <ul className="mt-10 space-y-4">
            {props.whenItems.map((item, i) => (
              <li key={i} className="flex items-start gap-4 border-b border-border/60 pb-4">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span className="text-foreground/85">{item}</span>
              </li>
            ))}
          </ul>
          {props.whenOutro && <p className="mt-8 max-w-3xl text-foreground/75">{props.whenOutro}</p>}
        </div>
      </section>

      {/* CTA + Form */}
      <section className="bg-gradient-navy text-cream">
        <div className="mx-auto grid max-w-6xl gap-16 px-6 py-24 md:grid-cols-2">
          <div>
            <img src={logoAsset.url} alt="" className="h-14 w-auto object-contain" />
            <h2 className="mt-8 text-3xl font-semibold leading-tight md:text-4xl text-balance">{props.ctaTitle}</h2>
            <p className="mt-6 text-cream/75 leading-relaxed">{props.ctaText}</p>
            <Link to="/servicios" className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-cream">
              Ver todos los servicios <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="surface-cream rounded-3xl p-8 md:p-10">
            <ContactForm source={`Servicio: ${props.title}`} />
          </div>
        </div>
      </section>
    </div>
  );
}