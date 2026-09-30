import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

import { legalData } from "@/lib/legal-data";

/**
 * /llms.txt, el resumen del sitio para asistentes de IA. Se genera aquí (y
 * no como archivo fijo en public/) para que la dirección salga de
 * lib/legal-data.ts, como en el resto de la web.
 */
const LLMS = `# Syntalia Vértice

> Consultora estratégica de marketing digital, sistemas y tecnología. Para empresas con ambición real diseñamos y construimos lo que las hace crecer: branding, web, SEO, contenido, ads, email y captación, con software a medida (aplicaciones, CRM, automatizaciones e IA aplicada) y producción audiovisual propios.

Syntalia Vértice trabaja con negocios que quieren dejar de depender del boca a boca, mejorar su imagen, captar contactos cualificados y construir una presencia digital que genere oportunidades comerciales. Oficina en ${legalData.domicilioSocial}.

## Páginas

- [Inicio](/): Qué hacemos y cómo convertimos tu presencia digital en oportunidades comerciales reales.
- [Quiénes Somos](/quienes-somos): Nuestra visión, propósito, valores y forma de entender el marketing.
- [Servicios](/servicios): El sistema en cuatro etapas (diagnóstico estratégico, posicionamiento y base digital, captación y conversión, optimización y escalado) y los servicios que componen cada una.
- [Contacto](/contacto): Teléfono, email y oficina en ${legalData.ubicacion}. Atención presencial y online.
- [Diagnóstico gratuito](/diagnostico): Solicita un análisis estratégico sin compromiso.
- [Caso Frulonsa](/casos/frulonsa): 90 días de estrategia, planificación y producción de contenido: 5,6 M de reproducciones, 1,4 M de usuarios únicos, 157 K interacciones y +7.301 nuevos seguidores.

## Servicios

- [Branding Completo](/servicios/branding-completo): Identidad visual, narrativa y posicionamiento.
- [Desarrollo Web](/servicios/desarrollo-web): Sitios web modernos, rápidos y orientados a conversión.
- [SEO](/servicios/seo): Visibilidad en buscadores y tráfico cualificado.
- [Grabación de Contenido](/servicios/grabacion-contenido): Grabación y edición para redes.
- [Redes Sociales](/servicios/redes-sociales): Gestión estratégica de redes sociales.
- [Estrategias de Contenido](/servicios/contenido): Blogs, textos, guiones y creatividades.
- [Social Ads](/servicios/social-ads): Publicidad en redes con foco en conversión.
- [Email Marketing](/servicios/email-marketing): Campañas y flujos automatizados.
- [Sistema de Captación](/servicios/captacion): Sistemas para atraer y convertir clientes.
`;

export const Route = createFileRoute("/llms.txt")({
  server: {
    handlers: {
      GET: async () =>
        new Response(LLMS, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        }),
    },
  },
});
