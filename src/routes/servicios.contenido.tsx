import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/service-page";
import { serviceHead } from "@/lib/service-seo";

export const Route = createFileRoute("/servicios/contenido")({
  head: () =>
    serviceHead({
      path: "/servicios/contenido",
      title: "Estrategias de Contenido — Syntalia Vértice",
      description: "Estrategias y contenidos alineados con tus objetivos: blogs, textos corporativos, guiones, creatividades y recursos descargables.",
      serviceType: "Estrategia y creación de contenido",
    }),
  component: () => (
    <ServicePage
      eyebrow="Servicio"
      title="Estrategias de Contenido"
      intro="Desarrollamos estrategias de contenido para empresas del sector agroalimentario que quieren mejorar su visibilidad, comunicar el valor de sus productos y conectar con su audiencia."
      whyTitle="¿Por qué es importante una buena estrategia de contenido?"
      whyContent={
        <>
          <p>Publicar contenido sin estrategia suele generar poco impacto. Una estrategia bien definida permite que cada contenido tenga un objetivo claro dentro del crecimiento de tu empresa.</p>
          <ul className="space-y-2 pl-1">
            <li>• Alinear la comunicación con los objetivos reales</li>
            <li>• Fortalecer el posicionamiento de tu marca</li>
            <li>• Generar confianza y credibilidad</li>
            <li>• Atraer tráfico cualificado a tu web</li>
            <li>• Comunicación coherente en todos tus canales</li>
          </ul>
        </>
      }
      whatTitle="Qué incluye nuestra estrategia de contenidos"
      whatItems={[
        "Análisis de tu negocio, audiencia y objetivos para definir una estrategia clara.",
        "Definición de mensajes clave y líneas editoriales coherentes con tu marca.",
        "Creación de contenidos adaptados a diferentes formatos y canales.",
        "Desarrollo de una narrativa consistente que refuerza el posicionamiento.",
        "Análisis de resultados y optimización continua de la estrategia.",
        "Contenidos orientados a generar visibilidad y oportunidades de negocio.",
      ]}
      whenTitle="¿Cuándo necesita tu empresa una estrategia de contenido?"
      whenItems={[
        "Tu empresa publica contenido sin una planificación clara",
        "Quieres mejorar la visibilidad de tu marca en internet",
        "Necesitas comunicar mejor el valor de tus productos",
        "Buscas posicionarte como referencia dentro del sector",
        "Quieres atraer tráfico cualificado a tu web",
      ]}
      ctaTitle="Desarrolla una estrategia de contenido para tu empresa"
      ctaText="Si quieres mejorar la comunicación de tu marca y crear contenidos alineados con tus objetivos, podemos ayudarte."
    />
  ),
});