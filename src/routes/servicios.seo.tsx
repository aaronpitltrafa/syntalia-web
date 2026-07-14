import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/service-page";
import { serviceHead } from "@/lib/service-seo";

export const Route = createFileRoute("/servicios/seo")({
  head: () =>
    serviceHead({
      path: "/servicios/seo",
      title: "SEO — Syntalia Vértice",
      description: "Estrategia SEO orientada a mejorar la visibilidad de tu web, atraer tráfico cualificado y generar oportunidades comerciales reales.",
      serviceType: "Posicionamiento SEO",
    }),
  component: () => (
    <ServicePage
      eyebrow="Servicio"
      title="SEO para empresas agroalimentarias"
      intro="Desarrollamos estrategias SEO orientadas a mejorar la visibilidad de tu página web, atraer tráfico cualificado y convertir tu presencia digital en nuevas oportunidades de negocio."
      whyTitle="Por qué trabajar el SEO de tu página web"
      whyContent={
        <>
          <p>Una estrategia SEO bien desarrollada permite que tu empresa gane visibilidad en internet y llegue a clientes potenciales que ya están buscando lo que ofreces.</p>
          <ul className="space-y-2 pl-1">
            <li>• Aumentar la visibilidad en buscadores</li>
            <li>• Atraer tráfico cualificado a tu web</li>
            <li>• Mejorar tus oportunidades de contacto y venta</li>
            <li>• Posicionar tu marca dentro de tu sector</li>
          </ul>
        </>
      }
      whatTitle="La visibilidad empieza con un buen SEO"
      whatItems={[
        "Auditoría técnica completa para detectar errores y oportunidades de mejora.",
        "Optimización profunda: arquitectura, velocidad, indexación, usabilidad y experiencia.",
        "Investigación estratégica de palabras clave alineadas con la intención de búsqueda.",
        "Creación y optimización de contenidos para posicionar y aumentar autoridad.",
        "Mejora continua orientada al crecimiento a largo plazo.",
        "Base digital sólida que convierte tráfico en oportunidades reales.",
      ]}
      whenTitle="¿Cuándo necesita tu empresa trabajar el SEO?"
      whenItems={[
        "Tu empresa no aparece en Google cuando los clientes buscan tus productos",
        "Tu web recibe pocas visitas o el tráfico no es cualificado",
        "Quieres mejorar la visibilidad de tu marca dentro del sector agroalimentario",
        "Tu competencia aparece antes que tú en los resultados de búsqueda",
        "Quieres convertir tu web en herramienta real de generación de oportunidades",
      ]}
      ctaTitle="Empieza a mejorar tu posicionamiento"
      ctaText="Si quieres mejorar la visibilidad de tu empresa y atraer clientes potenciales a través de buscadores como Google, podemos ayudarte a desarrollar una estrategia SEO adaptada a tu negocio."
    />
  ),
});