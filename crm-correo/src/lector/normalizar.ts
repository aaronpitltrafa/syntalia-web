/** Utilidades de normalización para hilos (D7) y asociación a cliente (D8). */

/** Prefijos de respuesta y reenvío habituales (español, inglés, alemán, portugués…). */
const PREFIJO = /^\s*(?:re|fw|fwd|rv|res|enc|reenv|aw|wg|tr|r)\s*(?:\[\d+\]|\(\d+\))?\s*:\s*/i;

/** Asunto sin RE:/FW: (repetidos), sin espacios sobrantes y en minúsculas. */
export function normalizarAsunto(asunto: string | null | undefined): string {
  let texto = (asunto ?? "").normalize("NFC");
  let anterior: string;
  do {
    anterior = texto;
    texto = texto.replace(PREFIJO, "");
  } while (texto !== anterior);
  return texto.replace(/\s+/g, " ").trim().toLocaleLowerCase("es");
}

/** Correo en minúsculas y sin espacios, o null si no parece una dirección. */
export function normalizarEmail(email: string | null | undefined): string | null {
  const limpio = (email ?? "").trim().toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(limpio) ? limpio : null;
}

export function dominioDe(email: string): string {
  return email.slice(email.lastIndexOf("@") + 1);
}

/** Dominios de correo gratuito: nunca se asocia un cliente por ellos (D8). */
const DOMINIOS_PUBLICOS = new Set([
  "gmail.com", "googlemail.com",
  "hotmail.com", "hotmail.es", "outlook.com", "outlook.es", "live.com", "live.es", "msn.com",
  "yahoo.com", "yahoo.es", "ymail.com",
  "icloud.com", "me.com", "mac.com",
  "aol.com", "gmx.com", "gmx.es", "gmx.net", "mail.com",
  "proton.me", "protonmail.com", "zoho.com", "yandex.com",
  "telefonica.net", "movistar.es", "terra.es", "orange.es", "vodafone.es", "ono.com",
]);

export function esDominioPublico(dominio: string): boolean {
  return DOMINIOS_PUBLICOS.has(dominio.toLowerCase());
}

/** Message-ID sin espacios. Se conservan los < > tal como llegan para comparar siempre igual. */
export function normalizarMessageId(id: string | null | undefined): string | null {
  const limpio = (id ?? "").trim();
  return limpio ? limpio : null;
}
