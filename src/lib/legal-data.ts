import { SITE_DOMAIN, SITE_URL } from "@/lib/site";

/** Teléfono tal como se muestra; el resto de formas salen de aquí. */
const telefono = "+34 672 167 758";

/**
 * La dirección de la oficina, confirmada por el cliente. Es la fuente única:
 * la leen los textos legales, el pie, /contacto, /quienes-somos, llms.txt y
 * los datos estructurados. Ningún otro archivo la escribe a mano.
 */
const direccion = {
  calle: "Av. de la Libertad, 207",
  barrio: "Los Narejos",
  codigoPostal: "30710",
  localidad: "Los Alcázares",
  provincia: "Murcia",
  pais: "España",
  codigoPais: "ES",
} as const;

/**
 * Datos legales centralizados de Syntalia Vértice.
 * Se usan tal cual en /aviso-legal, /privacidad y /cookies, así que basta con
 * actualizarlos aquí una sola vez si cambian.
 */
export const legalData = {
  marca: "Syntalia Vértice",
  descriptor: "Consultora Estratégica de Marketing Digital",

  razonSocial: "SYNTALIA GROUP, S.L.",
  nombreComercial: "SYNTALIA VÉRTICE",
  cif: "B27523349",
  direccion,
  /** La dirección entera en una línea: "Av. de la Libertad, 207, Los
      Narejos, 30710 Los Alcázares, Murcia, España". */
  domicilioSocial: `${direccion.calle}, ${direccion.barrio}, ${direccion.codigoPostal} ${direccion.localidad}, ${direccion.provincia}, ${direccion.pais}`,
  registroMercantil:
    "Registro Mercantil de Murcia, sección 8.ª, hoja MU-119642, inscripción 1.ª, de fecha 16 de abril de 2026",
  actividad:
    "Consultoría estratégica de marketing digital, publicidad, comunicación, representación de medios y consultoría de gestión empresarial",

  email: "vertice@syntalia.es",
  telefono,
  /** Para los enlaces: "tel:+34672167758". */
  telefonoHref: `tel:${telefono.replace(/\s/g, "")}`,
  /** Para los datos estructurados: "+34-672-167-758". */
  telefonoJsonLd: telefono.replace(/\s/g, "-"),
  /** La forma corta, para donde no cabe la dirección entera: "Los Alcázares (Murcia)". */
  ubicacion: `${direccion.localidad} (${direccion.provincia})`,

  dominio: SITE_DOMAIN,
  urlBase: SITE_URL,

  fechaActualizacion: "21 de julio de 2026",
} as const;
