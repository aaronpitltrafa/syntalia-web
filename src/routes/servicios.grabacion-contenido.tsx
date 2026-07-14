import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/service-page";
import { serviceHead } from "@/lib/service-seo";

export const Route = createFileRoute("/servicios/grabacion-contenido")({
  head: () =>
    serviceHead({
      path: "/servicios/grabacion-contenido",
      title: "Grabación de Contenido — Syntalia Vértice",
      description: "Grabación y edición profesional de vídeo adaptada a Instagram, TikTok y Reels, lista para publicar.",
      serviceType: "Grabación y edición de vídeo",
    }),
  component: () => (
    <ServicePage
      eyebrow="Servicio"
      title="Grabación de Contenido"
      intro="Producimos y editamos vídeos profesionales adaptados a cada formato y red social, para que tu marca comunique con impacto y aproveche al máximo el potencial del contenido audiovisual."
      whyTitle="¿Tu marca está aprovechando el poder del vídeo?"
      whyContent={
        <>
          <p>El vídeo es hoy el formato con mayor alcance, engagement y conversión en redes sociales. Bien producido, transmite profesionalidad, refuerza tu marca y conecta con tu audiencia de una forma que ningún otro formato consigue.</p>
          <p>En Vértice nos encargamos de toda la producción audiovisual: desde la grabación hasta la edición y adaptación a cada canal, para que tu contenido se vea profesional, coherente y orientado a resultados.</p>
        </>
      }
      whatTitle="Así trabajamos tu contenido audiovisual"
      whatItems={[
        "Edición profesional de vídeos con un acabado cuidado y alineado con tu identidad de marca.",
        "Adaptación a formatos verticales, horizontales y cuadrados para cada red social.",
        "Entrega optimizada para Instagram, TikTok y Reels, lista para publicar.",
        "Subtítulos, rótulos y recursos gráficos para reforzar el mensaje.",
        "Selección de música, ritmo y transiciones acordes al tono de tu marca.",
        "Optimización técnica (peso, duración y calidad) para maximizar el rendimiento en cada plataforma.",
      ]}
      whenTitle="¿Cuándo necesita tu empresa este servicio?"
      whenItems={[
        "Quieres incorporar el vídeo a tu estrategia de redes sociales",
        "Tienes material grabado pero no sabes cómo editarlo ni adaptarlo",
        "Buscas un acabado profesional que refuerce la imagen de tu marca",
        "Necesitas producir contenido de forma constante para Reels, TikTok o Shorts",
        "Quieres aumentar el alcance y el engagement de tus publicaciones",
      ]}
      ctaTitle="Lleva tu contenido audiovisual al siguiente nivel"
      ctaText="Si quieres aprovechar el potencial del vídeo en redes sociales con una producción profesional y adaptada a cada formato, podemos ayudarte a desarrollar tu contenido."
    />
  ),
});