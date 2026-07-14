import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/service-page";
import { serviceHead } from "@/lib/service-seo";

export const Route = createFileRoute("/servicios/social-ads")({
  head: () =>
    serviceHead({
      path: "/servicios/social-ads",
      title: "Social Ads — Syntalia Vértice",
      description: "Campañas publicitarias en redes sociales enfocadas en conversión, alcance y reconocimiento de marca, con inversión eficiente.",
      serviceType: "Publicidad en redes sociales",
    }),
  component: () => (
    <ServicePage
      eyebrow="Servicio"
      title="Social Ads"
      intro="Desarrollamos campañas de Social Ads para empresas del sector agroalimentario que quieren aumentar su visibilidad, atraer clientes potenciales y generar nuevas oportunidades comerciales."
      whyTitle="¿Por qué apostar por la publicidad en redes sociales?"
      whyContent={
        <>
          <p>La publicidad en redes sociales permite mostrar tus productos o servicios exactamente a las personas con más probabilidades de estar interesadas.</p>
          <p>Para empresas del sector agroalimentario, esto significa poder llegar a distribuidores, clientes potenciales o profesionales de forma directa y segmentada.</p>
          <p>Las plataformas permiten medir resultados en tiempo real y optimizar continuamente para mejorar el rendimiento.</p>
        </>
      }
      whatTitle="Qué incluye nuestra gestión de Social Ads"
      whatItems={[
        "Análisis inicial para definir objetivos, audiencias y estrategia publicitaria.",
        "Segmentación precisa para mostrar tus anuncios a las personas con mayor probabilidad de interés.",
        "Creación de anuncios con diseños atractivos y mensajes adaptados a cada plataforma.",
        "Configuración y gestión completa de campañas en plataformas como Meta Ads.",
        "Pruebas A/B para identificar qué audiencias y creatividades funcionan mejor.",
        "Optimización continua para maximizar el retorno de la inversión.",
      ]}
      whenTitle="¿Cuándo puede ayudarte la publicidad en redes?"
      whenItems={[
        "Quieres aumentar la visibilidad dentro del sector agroalimentario",
        "Necesitas atraer tráfico cualificado a tu página web",
        "Quieres promocionar productos o servicios de forma directa",
        "Buscas generar nuevas oportunidades comerciales",
        "Quieres acelerar los resultados de tu estrategia digital",
      ]}
      ctaTitle="Empieza a impulsar tu visibilidad con Social Ads"
      ctaText="Si quieres utilizar la publicidad en redes para aumentar la visibilidad de tu empresa y generar nuevas oportunidades, podemos ayudarte."
    />
  ),
});