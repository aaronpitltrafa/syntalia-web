/**
 * Las cuatro etapas del Sistema Vértice, en un solo sitio.
 *
 * La home las pinta resumidas (number, title, tagline, description e
 * includes) y /servicios las pinta desarrolladas, con la lista `services`.
 * Antes cada página tenía su propia copia y se desincronizaron: la home
 * hablaba de cuatro etapas y servicios de tres fases.
 */

/** Un servicio de la etapa. Si tiene página propia, `to` la apunta. */
export type Servicio = {
  label: string;
  to?: string;
};

export type EtapaSistema = {
  number: string;
  title: string;
  tagline: string;
  description: string;
  includes: readonly string[];
  /** Lista ampliada, solo para /servicios. */
  services?: readonly Servicio[];
};

export const SYSTEM_STAGES: readonly EtapaSistema[] = [
  {
    number: "01",
    title: "Diagnóstico estratégico",
    tagline: "Entendemos antes de construir.",
    description:
      "Analizamos el negocio, el mercado, el cliente ideal y la presencia digital para identificar qué está frenando el crecimiento.",
    includes: ["Posicionamiento y captación actual", "Prioridades y objetivos", "Hoja de ruta"],
    services: [
      { label: "Posicionamiento y captación actual" },
      { label: "Prioridades y objetivos" },
      { label: "Hoja de ruta" },
    ],
  },
  {
    number: "02",
    title: "Posicionamiento y base digital",
    tagline: "Ordenamos cómo debe percibirse tu empresa.",
    description:
      "Clarificamos el mensaje, la propuesta de valor y los activos digitales necesarios para transmitir una imagen sólida, profesional y diferenciada.",
    includes: ["Branding e identidad visual", "Web y landing pages", "Contenidos y redes sociales", "Copywriting y SEO"],
    services: [
      { label: "Posicionamiento de marca" },
      { label: "Propuesta de valor y mensaje" },
      { label: "Branding e identidad visual", to: "/servicios/branding-completo" },
      { label: "Web y landing pages", to: "/servicios/desarrollo-web" },
      { label: "Optimización de perfiles digitales" },
      { label: "Estrategia de contenidos", to: "/servicios/contenido" },
      { label: "Gestión de redes sociales", to: "/servicios/redes-sociales" },
      { label: "Copywriting y SEO", to: "/servicios/seo" },
      { label: "Contenido de autoridad", to: "/servicios/grabacion-contenido" },
    ],
  },
  {
    number: "03",
    title: "Captación y conversión",
    tagline: "Convertimos atención en oportunidades.",
    description:
      "Diseñamos el recorrido necesario para atraer, recoger, organizar y seguir contactos con intención comercial.",
    includes: ["Social Ads y campañas", "Formularios y landing de captación", "CRM y automatizaciones", "Email marketing y seguimiento"],
    services: [
      { label: "Social Ads y campañas", to: "/servicios/social-ads" },
      { label: "Formularios y landing de captación", to: "/servicios/captacion" },
      { label: "CRM y automatizaciones" },
      { label: "Email marketing y seguimiento", to: "/servicios/email-marketing" },
      { label: "Optimización de conversión" },
    ],
  },
  {
    number: "04",
    title: "Optimización y escalado",
    tagline: "Medimos, corregimos y reforzamos.",
    description:
      "Analizamos el funcionamiento del sistema para mejorar su eficiencia y potenciar aquello que realmente genera resultados.",
    includes: ["Conversión y rendimiento", "Automatización", "Escalado"],
    services: [
      { label: "Conversión y rendimiento" },
      { label: "Automatización" },
      { label: "Escalado" },
    ],
  },
];
