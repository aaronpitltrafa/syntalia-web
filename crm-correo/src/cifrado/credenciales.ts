/**
 * Cifrado por capas de la contraseña de cada buzón (decisión D13 del plan del correo).
 *
 * - Cada contraseña se cifra con su propia clave de datos AES-256-GCM (nonce aleatorio de 12 bytes).
 * - La clave de datos se cifra con la clave maestra vigente, que vive solo en una variable de entorno
 *   Sensitive de Vercel. La clave maestra lleva versión para poder rotarla sin perder las contraseñas.
 * - Los dos cifrados van ligados al buzón (datos asociados de GCM): un texto cifrado copiado a otro
 *   buzón no se puede descifrar.
 * - La contraseña solo existe en claro en memoria, al conectar. Los errores nunca incluyen secretos.
 *
 * En la base de datos se guardan `credencial_cifrada`, `clave_datos_cifrada` y `version_clave`.
 */
import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";

const ALGORITMO = "aes-256-gcm";
const LONGITUD_CLAVE = 32;
const LONGITUD_NONCE = 12;
const LONGITUD_ETIQUETA = 16;
/** Prefijo del formato. Si algún día cambia el formato, se sube a "f2" y se mantiene la lectura de "f1". */
const FORMATO = "f1";

/** Lo que se guarda en la base de datos para cada buzón. */
export interface CredencialCifrada {
  credencialCifrada: string;
  claveDatosCifrada: string;
  versionClave: number;
}

/** Error de cifrado. Su mensaje es siempre genérico: nunca contiene la contraseña ni las claves. */
export class ErrorCifrado extends Error {
  constructor(motivo: string) {
    super(`Error de cifrado de credenciales: ${motivo}`);
    this.name = "ErrorCifrado";
  }
}

/** Claves maestras por versión, y cuál se usa para cifrar. */
export class LlaveroMaestro {
  readonly #claves: ReadonlyMap<number, Buffer>;
  readonly versionActual: number;

  constructor(claves: ReadonlyMap<number, Buffer>, versionActual: number) {
    for (const [version, clave] of claves) {
      if (!Number.isInteger(version) || version < 1) {
        throw new ErrorCifrado(`versión de clave maestra no válida (${String(version)})`);
      }
      if (clave.length !== LONGITUD_CLAVE) {
        throw new ErrorCifrado(`la clave maestra v${String(version)} no mide 32 bytes`);
      }
    }
    if (!claves.has(versionActual)) {
      throw new ErrorCifrado(`no existe la clave maestra de la versión actual (v${String(versionActual)})`);
    }
    this.#claves = claves;
    this.versionActual = versionActual;
  }

  /**
   * Lee el llavero del entorno:
   * - `CORREO_CLAVE_MAESTRA_ACTUAL`: número de la versión con la que se cifra (p. ej. "1").
   * - `CORREO_CLAVE_MAESTRA_V1`, `CORREO_CLAVE_MAESTRA_V2`…: cada clave, 32 bytes en base64.
   * Las versiones antiguas se conservan mientras quede alguna credencial cifrada con ellas.
   */
  static desdeEntorno(entorno: Readonly<Record<string, string | undefined>> = process.env): LlaveroMaestro {
    const actual = Number(entorno.CORREO_CLAVE_MAESTRA_ACTUAL);
    if (!Number.isInteger(actual) || actual < 1) {
      throw new ErrorCifrado("falta CORREO_CLAVE_MAESTRA_ACTUAL o no es un número de versión");
    }
    const claves = new Map<number, Buffer>();
    for (const [nombre, valor] of Object.entries(entorno)) {
      const coincidencia = /^CORREO_CLAVE_MAESTRA_V(\d+)$/.exec(nombre);
      if (!coincidencia?.[1] || !valor) continue;
      claves.set(Number(coincidencia[1]), Buffer.from(valor, "base64"));
    }
    return new LlaveroMaestro(claves, actual);
  }

  clave(version: number): Buffer {
    const clave = this.#claves.get(version);
    if (!clave) throw new ErrorCifrado(`no existe la clave maestra v${String(version)}`);
    return clave;
  }

  /** Nunca se muestran las claves al registrar o inspeccionar el objeto. */
  toJSON(): string {
    return `[LlaveroMaestro v${String(this.versionActual)}]`;
  }

  [Symbol.for("nodejs.util.inspect.custom")](): string {
    return this.toJSON();
  }
}

/** Genera una clave maestra nueva en base64, para guardarla en el entorno de Vercel. */
export function generarClaveMaestra(): string {
  return randomBytes(LONGITUD_CLAVE).toString("base64");
}

function sellar(clave: Buffer, datos: Buffer, contexto: string): string {
  const nonce = randomBytes(LONGITUD_NONCE);
  const cifrador = createCipheriv(ALGORITMO, clave, nonce);
  cifrador.setAAD(Buffer.from(contexto, "utf8"));
  const cifrado = Buffer.concat([cifrador.update(datos), cifrador.final()]);
  const etiqueta = cifrador.getAuthTag();
  return `${FORMATO}.${Buffer.concat([nonce, etiqueta, cifrado]).toString("base64")}`;
}

function abrir(clave: Buffer, sellado: string, contexto: string): Buffer {
  const [formato, cuerpo, ...resto] = sellado.split(".");
  if (formato !== FORMATO || !cuerpo || resto.length > 0) {
    throw new ErrorCifrado("formato de texto cifrado desconocido");
  }
  const bytes = Buffer.from(cuerpo, "base64");
  if (bytes.length < LONGITUD_NONCE + LONGITUD_ETIQUETA) {
    throw new ErrorCifrado("texto cifrado incompleto");
  }
  const nonce = bytes.subarray(0, LONGITUD_NONCE);
  const etiqueta = bytes.subarray(LONGITUD_NONCE, LONGITUD_NONCE + LONGITUD_ETIQUETA);
  const cifrado = bytes.subarray(LONGITUD_NONCE + LONGITUD_ETIQUETA);
  try {
    const descifrador = createDecipheriv(ALGORITMO, clave, nonce);
    descifrador.setAAD(Buffer.from(contexto, "utf8"));
    descifrador.setAuthTag(etiqueta);
    return Buffer.concat([descifrador.update(cifrado), descifrador.final()]);
  } catch {
    // El error original de Node no lleva secretos, pero se sustituye para no filtrar detalles.
    throw new ErrorCifrado("no se pudo descifrar (clave, buzón o datos no coinciden)");
  }
}

const contextoCredencial = (canalId: string) => `tradyn-correo:credencial:${canalId}`;
const contextoClaveDatos = (canalId: string, version: number) =>
  `tradyn-correo:clave-datos:${canalId}:v${String(version)}`;

function comprobarCanal(canalId: string): void {
  if (!canalId) throw new ErrorCifrado("falta el identificador del buzón");
}

/** Cifra la contraseña de un buzón. `canalId` es el id de su fila en `canales_comunicacion`. */
export function cifrarCredencial(
  contrasena: string,
  canalId: string,
  llavero: LlaveroMaestro,
): CredencialCifrada {
  comprobarCanal(canalId);
  if (!contrasena) throw new ErrorCifrado("la contraseña está vacía");
  const claveDatos = randomBytes(LONGITUD_CLAVE);
  try {
    const version = llavero.versionActual;
    return {
      credencialCifrada: sellar(claveDatos, Buffer.from(contrasena, "utf8"), contextoCredencial(canalId)),
      claveDatosCifrada: sellar(llavero.clave(version), claveDatos, contextoClaveDatos(canalId, version)),
      versionClave: version,
    };
  } finally {
    claveDatos.fill(0);
  }
}

/** Descifra la contraseña para conectar. Úsala justo antes de abrir la conexión y no la guardes. */
export function descifrarCredencial(
  registro: CredencialCifrada,
  canalId: string,
  llavero: LlaveroMaestro,
): string {
  comprobarCanal(canalId);
  const claveDatos = abrir(
    llavero.clave(registro.versionClave),
    registro.claveDatosCifrada,
    contextoClaveDatos(canalId, registro.versionClave),
  );
  try {
    return abrir(claveDatos, registro.credencialCifrada, contextoCredencial(canalId)).toString("utf8");
  } finally {
    claveDatos.fill(0);
  }
}

/**
 * Rotación de la clave maestra: vuelve a cifrar solo la clave de datos con la versión actual.
 * La contraseña no se descifra. Si ya está en la versión actual, devuelve el mismo registro.
 */
export function reenvolverConClaveActual(
  registro: CredencialCifrada,
  canalId: string,
  llavero: LlaveroMaestro,
): CredencialCifrada {
  comprobarCanal(canalId);
  if (registro.versionClave === llavero.versionActual) return registro;
  const claveDatos = abrir(
    llavero.clave(registro.versionClave),
    registro.claveDatosCifrada,
    contextoClaveDatos(canalId, registro.versionClave),
  );
  try {
    const version = llavero.versionActual;
    return {
      credencialCifrada: registro.credencialCifrada,
      claveDatosCifrada: sellar(llavero.clave(version), claveDatos, contextoClaveDatos(canalId, version)),
      versionClave: version,
    };
  } finally {
    claveDatos.fill(0);
  }
}
