import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/service-page";
import { serviceHead } from "@/lib/service-seo";

export const Route = createFileRoute("/servicios/branding-completo")({
  head: () =>
    serviceHead({
      path: "/servicios/branding-completo",
      title: "Branding Completo — Syntalia Vértice",
      description: "Identidad visual integral, narrativa corporativa y posicionamiento estratégico para construir una marca sólida y diferencial.",
      serviceType: "Branding y diseño de identidad corporativa",
    }),
  component: () => (
    <ServicePage
      eyebrow="Servicio"
      title="Branding Completo"
      intro="Identidad visual integral, narrativa corporativa y posicionamiento estratégico para construir una marca reconocible, diferencial y preparada para crecer en el sector agroalimentario."
      whyTitle="Una marca sólida es el activo más rentable de tu empresa"
      whyContent={
        <>
          <p>El branding va mucho más allá del logotipo: es la percepción que tu mercado tiene de ti. Una identidad sólida proyecta autoridad, genera confianza y abre puertas comerciales.</p>
          <p>Diseñamos marcas que comunican el nivel real de tu empresa y se diferencian dentro de un sector competitivo.</p>
        </>
      }
      whatTitle="Qué incluye el branding completo"
      whatItems={[
        "Identidad visual integral: logotipo, paleta cromática y tipografías.",
        "Narrativa corporativa, tono de comunicación y posicionamiento estratégico.",
        "Naming y concepto: nombres de marca con personalidad y proyección.",
        "Definición de propuesta de valor única y diferencial.",
        "Pilares de comunicación que forman una marca competitiva.",
        "Manual de marca para asegurar coherencia en todos los canales.",
      ]}
      whenTitle="¿Cuándo necesita tu empresa trabajar el branding?"
      whenItems={[
        "Tu identidad visual no representa el nivel real de tu empresa",
        "Tu marca se confunde con la competencia",
        "No tienes una propuesta de valor clara y diferencial",
        "Vas a lanzar un nuevo producto, línea o empresa",
        "Quieres profesionalizar tu imagen para abrir nuevos mercados",
      ]}
      ctaTitle="Construyamos una marca que te represente"
      ctaText="Si quieres dar a tu empresa una identidad sólida y diferencial, podemos ayudarte a construir una marca preparada para crecer."
    />
  ),
});