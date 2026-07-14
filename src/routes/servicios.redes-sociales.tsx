import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/service-page";
import { serviceHead } from "@/lib/service-seo";

export const Route = createFileRoute("/servicios/redes-sociales")({
  head: () =>
    serviceHead({
      path: "/servicios/redes-sociales",
      title: "Gestión de Redes Sociales — Syntalia Vértice",
      description: "Gestión estratégica de redes sociales con contenido de valor, estética coherente y foco en resultados medibles.",
      serviceType: "Gestión de redes sociales",
    }),
  component: () => (
    <ServicePage
      eyebrow="Servicio"
      title="Gestión de Redes Sociales"
      intro="Gestionamos tus perfiles sociales para comunicar el valor de tu marca, conectar con tu audiencia de forma profesional y convertir tus redes en un canal activo que genere nuevas oportunidades."
      whyTitle="¿Estás aprovechando el verdadero potencial de tus redes?"
      whyContent={
        <>
          <p>Las redes sociales son uno de los pilares de cualquier estrategia digital. Permiten mejorar la visibilidad, fortalecer tu marca y mantener una comunicación constante con tu audiencia.</p>
          <p>En Vértice te ayudamos a transformar tus perfiles sociales en un canal activo, coherente y orientado a resultados.</p>
        </>
      }
      whatTitle="Así trabajamos la gestión de tus redes sociales"
      whatItems={[
        "Estrategia personalizada para cada red social, adaptada a tus objetivos y a tu audiencia.",
        "Creación de contenido relevante y atractivo que refuerza la identidad de tu marca.",
        "Planificación y gestión de publicaciones para mantener una presencia constante.",
        "Análisis del rendimiento para optimizar alcance, visibilidad y engagement.",
        "Aplicación de tendencias y formatos actuales para mantenerte relevante.",
        "Interacción con la audiencia y dinamización de la comunidad.",
      ]}
      whenTitle="¿Cuándo necesita tu empresa gestionar sus redes sociales?"
      whenItems={[
        "Tu empresa tiene perfiles sociales pero no los utiliza estratégicamente",
        "Publicas contenido de forma irregular o sin planificación",
        "Quieres mejorar la visibilidad de tu marca dentro del sector",
        "Buscas comunicar mejor el valor de tus productos o servicios",
        "Quieres fortalecer la relación con clientes y colaboradores",
      ]}
      ctaTitle="Empieza a fortalecer tu presencia en redes"
      ctaText="Si quieres mejorar la visibilidad de tu marca y gestionar tus redes sociales de forma estratégica, podemos ayudarte a desarrollar una estrategia adaptada a tu empresa."
    />
  ),
});