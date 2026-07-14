import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MapPin } from "lucide-react";
import { ContactForm } from "@/components/contact-form";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto — Syntalia Vértice" },
      { name: "description", content: "Habla con nuestro equipo. Marketing digital para empresas con ambición." },
      { property: "og:title", content: "Contacto — Syntalia Vértice" },
      { property: "og:description", content: "Escríbenos o llámanos. Oficina en Murcia. Marketing digital estratégico para empresas con ambición." },
      { property: "og:url", content: "https://syntalia.verticeagency.es/contacto" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Contacto — Syntalia Vértice" },
      { name: "twitter:description", content: "Habla con nuestro equipo. Oficina en Murcia, España." },
    ],
    links: [{ rel: "canonical", href: "https://syntalia.verticeagency.es/contacto" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Syntalia Vértice",
          url: "https://syntalia.verticeagency.es",
          telephone: "+34-647-121-117",
          email: "vertice@syntalia.es",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Avenida de la Libertad 301",
            addressLocality: "Murcia",
            postalCode: "30710",
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

function Contacto() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-navy text-cream">
        <div className="absolute inset-0 opacity-[0.05] [background-image:radial-gradient(circle_at_2px_2px,white_1px,transparent_0)] [background-size:32px_32px]" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
          <p className="text-xs uppercase tracking-[0.4em] text-gold">Contacto</p>
          <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-[1.05] md:text-7xl text-balance">
            ¿Hablamos con nuestro equipo de <span className="italic text-gradient-gold">comunicación</span>?
          </h1>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 py-24 md:grid-cols-5">
          <div className="md:col-span-2 space-y-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-gold text-navy"><Phone className="h-5 w-5" /></div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Teléfono</p>
                <a href="tel:+34647121117" className="mt-1 block text-lg font-semibold text-primary hover:text-accent">+34 647 121 117</a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-gold text-navy"><Mail className="h-5 w-5" /></div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Email</p>
                <a href="mailto:vertice@syntalia.es" className="mt-1 block text-lg font-semibold text-primary hover:text-accent">vertice@syntalia.es</a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-gold text-navy"><MapPin className="h-5 w-5" /></div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Oficina</p>
                <p className="mt-1 text-lg font-semibold text-primary">Avenida de la Libertad 301</p>
                <p className="text-foreground/70">30710 Murcia, España</p>
              </div>
            </div>
          </div>
          <div className="md:col-span-3 rounded-3xl border border-border bg-card p-8 md:p-10">
            <h2 className="text-2xl font-semibold text-primary">Escríbenos</h2>
            <p className="mt-2 text-foreground/70">Cuéntanos tu proyecto y te contactaremos lo antes posible.</p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}