/**
 * ClienteImap sobre ImapFlow. TLS siempre con verificación del certificado (D13), carpetas abiertas
 * en solo lectura (EXAMINE) y descarga con BODY.PEEK (ImapFlow usa PEEK al pedir `source`) (D5).
 */
import { ImapFlow } from "imapflow";
import { ErrorImap, type Carpeta, type ClienteImap } from "./tipos.js";

export interface DatosConexion {
  host: string;
  /** IONOS: 993. */
  puerto: number;
  usuario: string;
  /** Ya descifrada. Solo vive en memoria mientras dura la conexión. */
  contrasena: string;
  /** Tiempo máximo para conectar y para cada respuesta del servidor. */
  tiempoEsperaMs?: number;
}

/** Nombres habituales de Enviados cuando el servidor no marca la carpeta con \Sent. */
const NOMBRES_ENVIADOS = ["Sent", "Enviados", "Elementos enviados", "Sent Items", "Sent Messages", "INBOX.Sent"];
const CODIGOS_RED = new Set(["ECONNREFUSED", "ECONNRESET", "ETIMEDOUT", "ENOTFOUND", "EAI_AGAIN", "EHOSTUNREACH", "NoConnection"]);

export function crearClienteImapflow(datos: DatosConexion): ClienteImap {
  const tiempoEspera = datos.tiempoEsperaMs ?? 20_000;
  const imap = new ImapFlow({
    host: datos.host,
    port: datos.puerto,
    secure: true,
    tls: { rejectUnauthorized: true, servername: datos.host },
    auth: { user: datos.usuario, pass: datos.contrasena },
    // Sin registro: el registro de ImapFlow puede incluir el diálogo con el servidor.
    logger: false,
    disableAutoIdle: true,
    connectionTimeout: tiempoEspera,
    greetingTimeout: tiempoEspera,
    socketTimeout: tiempoEspera * 3,
  });

  return {
    conectar: () => envolver("conectar", () => imap.connect()),

    rutaCarpeta: (carpeta: Carpeta) =>
      envolver("listar carpetas", async () => {
        if (carpeta === "recibidos") return "INBOX";
        const lista = await imap.list();
        const marcada = lista.find((c) => c.specialUse === "\\Sent");
        if (marcada) return marcada.path;
        const porNombre = lista.find((c) => NOMBRES_ENVIADOS.some((n) => n.toLowerCase() === c.path.toLowerCase()));
        return porNombre?.path ?? null;
      }),

    abrir: (ruta: string) =>
      envolver("abrir carpeta", async () => {
        const buzon = await imap.mailboxOpen(ruta, { readOnly: true });
        return { uidValidity: buzon.uidValidity.toString() };
      }),

    uidsMayoresQue: (uid: number) =>
      envolver("buscar", async () => (await imap.search({ uid: `${String(uid + 1)}:*` }, { uid: true })) || []),

    uidsDesde: (fecha: Date) =>
      envolver("buscar", async () => (await imap.search({ since: fecha }, { uid: true })) || []),

    async *descargar(uids: readonly number[]) {
      if (uids.length === 0) return;
      try {
        for await (const mensaje of imap.fetch(uids.join(","), { uid: true, source: true }, { uid: true })) {
          if (mensaje.source) yield { uid: mensaje.uid, fuente: mensaje.source };
        }
      } catch (error) {
        throw sanear("descargar", error);
      }
    },

    cerrar: async () => {
      try {
        await imap.logout();
      } catch {
        imap.close();
      }
    },
  };
}

async function envolver<T>(operacion: string, accion: () => Promise<T>): Promise<T> {
  try {
    return await accion();
  } catch (error) {
    throw sanear(operacion, error);
  }
}

/**
 * Traduce los errores de ImapFlow a ErrorImap con un mensaje fijo. No se copia el mensaje original:
 * puede incluir respuestas del servidor y, en algunos fallos de login, datos de la orden enviada.
 */
function sanear(operacion: string, error: unknown): ErrorImap {
  const e = (error ?? {}) as { authenticationFailed?: boolean; code?: string };
  if (e.authenticationFailed) {
    return new ErrorImap("autenticacion", "IONOS rechazó el usuario o la contraseña del buzón.");
  }
  if (e.code && CODIGOS_RED.has(e.code)) {
    return new ErrorImap("red", `No se pudo contactar con el servidor de correo (${e.code}) al ${operacion}.`);
  }
  const codigo = typeof e.code === "string" && /^[A-Za-z_]{1,40}$/.test(e.code) ? ` (${e.code})` : "";
  return new ErrorImap("otro", `Error del servidor de correo al ${operacion}${codigo}.`);
}
