import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MapPin } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { SITE_URL } from "@/lib/site";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto — Syntalia Vértice" },
      { name: "description", content: "Habla con nuestro equipo. Marketing digital para empresas con ambición." },
      { property: "og:title", content: "Contacto — Syntalia Vértice" },
      { property: "og:description", content: "Escríbenos o llámanos. Marketing digital estratégico para empresas con ambición." },
      { property: "og:url", content: `${SITE_URL}/contacto` },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Contacto — Syntalia Vértice" },
      { name: "twitter:description", content: "Habla con nuestro equipo. Atención presencial y online en Murcia, España." },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/contacto` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Syntalia Vértice",
          url: SITE_URL,
          telephone: "+34-672-167-758",
          email: "vertice@syntalia.es",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Murcia",
            addressCountry: "ES",
          },
          areaServed: "ES",
          priceRange: "$$",
        }),
      },
    ],
  }),
  component: Contacto,
});

const CONTACT_ITEMS = [
  {
    icon: Phone,
    label: "Teléfono",
    content: (
      <a href="tel:+34672167758" className="mt-1 block text-lg font-semibold text-primary hover:text-accent">
        +34 672 167 758
      </a>
    ),
  },
  {
    icon: Mail,
    label: "Correo electrónico",
    content: (
      <a href="mailto:vertice@syntalia.es" className="mt-1 block text-lg font-semibold text-primary hover:text-accent">
        vertice@syntalia.es
      </a>
    ),
  },
  {
    icon: MapPin,
    label: "Dirección",
    content: (
      <>
        <p className="mt-1 text-lg font-semibold text-primary">Murcia, España</p>
        <p className="text-foreground/70">Atención presencial y online</p>
      </>
    ),
  },
];

function Contacto() {
  return (
    <div>
      <section className="relative bg-gradient-navy text-cream">
        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
          <p className="text-xs uppercase tracking-[0.4em] text-gold">Contacto</p>
          <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-[1.05] md:text-7xl text-balance">
            ¿Hablamos con nuestro equipo de <span className="text-gradient-gold">comunicación</span>?
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-cream/75 leading-relaxed">
            Cuéntanos en qué podemos ayudarte y te responderemos lo antes posible.
          </p>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 py-24 md:grid-cols-5">
          <div className="md:col-span-2 divide-y divide-border">
            {CONTACT_ITEMS.map((item) => (
              <div key={item.label} className="flex items-start gap-4 py-7 first:pt-0 last:pb-0">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-gold text-navy">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">{item.label}</p>
                  {item.content}
                </div>
              </div>
            ))}
          </div>

          <div className="md:col-span-3 rounded-3xl border border-border bg-card p-8 md:p-10">
            <h2 className="text-2xl font-semibold text-cream">Escríbenos</h2>
            <p className="mt-2 text-foreground/70">Rellena el formulario y nos pondremos en contacto contigo.</p>
            <div className="mt-8">
              <ContactForm source="Contacto" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
