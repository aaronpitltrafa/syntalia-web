import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/service-page";
import { serviceHead } from "@/lib/service-seo";

export const Route = createFileRoute("/servicios/desarrollo-web")({
  head: () =>
    serviceHead({
      path: "/servicios/desarrollo-web",
      title: "Desarrollo Web y Optimización — Syntalia Vértice",
      description: "Diseñamos sitios web modernos, rápidos y seguros, orientados a conversión y a captar oportunidades comerciales.",
      serviceType: "Diseño y desarrollo web",
    }),
  component: () => (
    <ServicePage
      eyebrow="Servicio"
      title="Desarrollo Web y Optimización"
      intro="Desarrollamos páginas web para empresas del sector agroalimentario que quieren mejorar su presencia digital y convertir su web en una herramienta real de visibilidad y crecimiento."
      whyTitle="¿Qué impacto tiene una página web bien diseñada en tu negocio?"
      whyContent={
        <>
          <p>Una página web bien diseñada no solo mejora la imagen de tu empresa, sino que se convierte en una herramienta estratégica de crecimiento.</p>
          <p>Es el espacio donde transmites confianza, comunicas el valor de tu marca y guías al usuario hacia acciones clave como contactar, solicitar información o conocer mejor tus productos y servicios.</p>
          <ul className="space-y-2 pl-1">
            <li>• Refuerza la credibilidad y profesionalidad de tu empresa</li>
            <li>• Mejora la experiencia del usuario y la navegación</li>
            <li>• Aumenta las conversiones (contactos, solicitudes, ventas)</li>
            <li>• Diferencia tu marca frente a la competencia</li>
            <li>• Genera oportunidades comerciales de forma constante</li>
          </ul>
        </>
      }
      whatTitle="Qué incluye el desarrollo y optimización de tu página web"
      whatItems={[
        "Diseño de páginas web personalizadas con estética moderna y experiencia de usuario optimizada.",
        "Estructuración estratégica de la arquitectura del sitio para guiar al usuario hacia acciones clave.",
        "Desarrollo visual y funcional coherente con la identidad de tu marca.",
        "Implementación técnica optimizada: velocidad, estabilidad, seguridad y compatibilidad responsive.",
        "SEO técnico desde el inicio: estructura, indexación y rendimiento.",
        "Optimización continua mediante análisis de resultados y mejoras técnicas.",
      ]}
      whenTitle="¿Cuándo necesita tu empresa mejorar su página web?"
      whenItems={[
        "Tu página web tiene un diseño antiguo o poco profesional",
        "La navegación es confusa o no está optimizada",
        "Tu web no genera contactos ni oportunidades comerciales",
        "El sitio carga lento o no funciona correctamente en móviles",
        "Quieres mejorar la imagen digital y transmitir mayor confianza",
      ]}
      whenOutro="Una web bien desarrollada permite mejorar la presencia digital de tu empresa y convertir tu sitio web en una herramienta real de captación y crecimiento."
      ctaTitle="Empieza a mejorar tu presencia digital"
      ctaText="Si quieres desarrollar una página web profesional o mejorar el rendimiento de tu sitio actual, podemos ayudarte a crear una web optimizada y adaptada a los objetivos de tu empresa."
    />
  ),
});