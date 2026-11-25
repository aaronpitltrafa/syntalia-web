/**
 * Lectura incremental de un buzón (D4–D10).
 *
 * - Solo lee: abre las carpetas en EXAMINE y descarga con BODY.PEEK. No marca, no mueve, no borra (D5).
 * - Recibidos y Enviados, cada una con su último UID (D4, D6). Si cambia UIDVALIDITY, relee desde la
 *   fecha del último correo guardado; los duplicados se descartan por Message-ID.
 * - Una sola lectura a la vez por buzón, en lotes de 50 y con un tiempo máximo (D9). Si se acaba el
 *   tiempo, guarda el punto y devuelve `pendiente: true`: la siguiente lectura sigue donde se quedó.
 * - Hilos por Message-ID / In-Reply-To / References y, si no, por asunto y participantes en 30 días (D7).
 * - Cliente por el correo exacto de un contacto; por dominio solo se propone (D8).
 */
import { simpleParser, type AddressObject, type ParsedMail } from "mailparser";
import { dominioDe, esDominioPublico, normalizarAsunto, normalizarEmail, normalizarMessageId } from "./normalizar.js";
import {
  ErrorImap,
  type AlmacenAdjuntos,
  type Canal,
  type Carpeta,
  type ClienteImap,
  type Direccion,
  type Repositorio,
} from "./tipos.js";

export const TAMANO_LOTE = 50;
export const MAXIMO_ADJUNTO_BYTES = 25 * 1024 * 1024;
export const VENTANA_HILO_MS = 30 * 24 * 60 * 60 * 1000;
export const INTERVALO_MINIMO_BANDEJA_MS = 60 * 1000;
const CARPETAS: readonly Carpeta[] = ["recibidos", "enviados"];

export interface OpcionesLectura {
  repositorio: Repositorio;
  almacen: AlmacenAdjuntos;
  /** Crea el cliente IMAP con la contraseña ya descifrada. Se llama solo si se consigue el bloqueo. */
  crearCliente: () => ClienteImap;
  origen: "n8n" | "bandeja";
  /** Tiempo máximo de trabajo antes de parar y dejarlo pendiente. Por debajo del límite de Vercel. */
  tiempoMaximoMs?: number;
  /** Cuánto dura el bloqueo si la función muere sin liberarlo. */
  duracionBloqueoMs?: number;
  /** Adjuntos mayores no se suben y quedan marcados como demasiado grandes (D14). */
  maximoAdjuntoBytes?: number;
  ahora?: () => Date;
}

export interface ResultadoSincronizacion {
  estado: "ok" | "ocupado" | "pausado" | "error";
  nuevos: number;
  duplicados: number;
  paraRevisar: number;
  /** Quedan correos por leer porque se acabó el tiempo. */
  pendiente: boolean;
  /** Solo cuando `estado` es `error`. Nunca contiene la contraseña. */
  error: string | null;
  fallosSeguidos: number;
  avisos: string[];
}

/** Desde la bandeja se lee como mucho una vez por minuto (D9). */
export function puedeLeerDesdeBandeja(ultimaLectura: Date | null, ahora: Date = new Date()): boolean {
  return !ultimaLectura || ahora.getTime() - ultimaLectura.getTime() >= INTERVALO_MINIMO_BANDEJA_MS;
}

export async function sincronizarBuzon(canal: Canal, opciones: OpcionesLectura): Promise<ResultadoSincronizacion> {
  const { repositorio } = opciones;
  const ahora = opciones.ahora ?? (() => new Date());
  const tiempoMaximoMs = opciones.tiempoMaximoMs ?? 45_000;
  const resultado: ResultadoSincronizacion = {
    estado: "ok",
    nuevos: 0,
    duplicados: 0,
    paraRevisar: 0,
    pendiente: false,
    error: null,
    fallosSeguidos: 0,
    avisos: [],
  };

  // Pausado es la vuelta atrás (D17): no se conecta. Un buzón en error sí se reintenta.
  if (canal.estado === "pausado") return { ...resultado, estado: "pausado" };

  const inicio = ahora();
  const bloqueado = await repositorio.tomarBloqueo(
    canal.id,
    new Date(inicio.getTime() + (opciones.duracionBloqueoMs ?? 120_000)),
    inicio,
  );
  if (!bloqueado) return { ...resultado, estado: "ocupado" };

  const limite = inicio.getTime() + tiempoMaximoMs;
  let cliente: ClienteImap | null = null;
  try {
    cliente = opciones.crearCliente();
    await cliente.conectar();
    for (const carpeta of CARPETAS) {
      const terminada = await leerCarpeta(cliente, canal, carpeta, opciones, resultado, limite, ahora);
      if (!terminada) {
        resultado.pendiente = true;
        break;
      }
    }
    resultado.fallosSeguidos = (await repositorio.registrarResultado(canal.id, { exito: true })).fallosSeguidos;
  } catch (error) {
    const saneado = describirError(error);
    resultado.estado = "error";
    resultado.error = saneado.mensaje;
    resultado.fallosSeguidos = (
      await repositorio.registrarResultado(canal.id, {
        exito: false,
        error: saneado.mensaje,
        autenticacion: saneado.autenticacion,
      })
    ).fallosSeguidos;
  } finally {
    await cliente?.cerrar().catch(() => undefined);
    await repositorio.liberarBloqueo(canal.id);
    await repositorio.registrarLectura(canal.id, {
      origen: opciones.origen,
      inicio,
      fin: ahora(),
      nuevos: resultado.nuevos,
      error: resultado.error,
    });
  }
  return resultado;
}

/** Devuelve false si se acabó el tiempo antes de leer toda la carpeta. */
async function leerCarpeta(
  cliente: ClienteImap,
  canal: Canal,
  carpeta: Carpeta,
  opciones: OpcionesLectura,
  resultado: ResultadoSincronizacion,
  limite: number,
  ahora: () => Date,
): Promise<boolean> {
  const { repositorio } = opciones;
  const ruta = await cliente.rutaCarpeta(carpeta);
  if (!ruta) {
    resultado.avisos.push(`No se encontró la carpeta de ${carpeta} en el servidor.`);
    return true;
  }
  const { uidValidity } = await cliente.abrir(ruta);
  const previo = canal.estadoCarpetas[carpeta];

  let uids: number[];
  if (previo && previo.uidValidity !== uidValidity) {
    // El servidor renumeró la carpeta: se relee desde el último correo guardado (D4).
    const desde = (await repositorio.ultimaFechaMensaje(canal.id, carpeta)) ?? new Date(0);
    uids = await cliente.uidsDesde(desde);
    resultado.avisos.push(`Cambió UIDVALIDITY en ${carpeta}: se relee desde ${desde.toISOString()}.`);
  } else {
    const desdeUid = previo?.ultimoUid ?? 0;
    // En IMAP, "N:*" incluye siempre el último correo aunque su UID sea menor que N: se filtra.
    uids = (await cliente.uidsMayoresQue(desdeUid)).filter((uid) => uid > desdeUid);
  }
  uids = [...new Set(uids)].sort((a, b) => a - b);

  let ultimoUid = previo && previo.uidValidity === uidValidity ? previo.ultimoUid : 0;
  for (let i = 0; i < uids.length; i += TAMANO_LOTE) {
    if (ahora().getTime() >= limite) {
      await repositorio.guardarEstadoCarpeta(canal.id, carpeta, { ultimoUid, uidValidity });
      return false;
    }
    const lote = uids.slice(i, i + TAMANO_LOTE);
    for await (const { uid, fuente } of cliente.descargar(lote)) {
      await procesarCorreo(fuente, uid, carpeta, canal, opciones, resultado, ahora);
      if (uid > ultimoUid) ultimoUid = uid;
    }
    // El punto se guarda tras cada lote: si la función muere, se repite como mucho un lote, y los
    // repetidos se descartan por Message-ID.
    await repositorio.guardarEstadoCarpeta(canal.id, carpeta, { ultimoUid, uidValidity });
  }
  if (uids.length === 0 && (!previo || previo.uidValidity !== uidValidity)) {
    await repositorio.guardarEstadoCarpeta(canal.id, carpeta, { ultimoUid, uidValidity });
  }
  return true;
}

async function procesarCorreo(
  fuente: Buffer,
  uid: number,
  carpeta: Carpeta,
  canal: Canal,
  opciones: OpcionesLectura,
  resultado: ResultadoSincronizacion,
  ahora: () => Date,
): Promise<void> {
  const { repositorio, almacen } = opciones;
  const idSintetico = `sin-message-id:${canal.id}:${carpeta}:${String(uid)}:${String(fuente.length)}`;
  const direccion = carpeta === "recibidos" ? "entrante" : "saliente";

  let correo: ParsedMail;
  try {
    correo = await simpleParser(fuente, { skipImageLinks: true });
  } catch {
    // Correo mal formado: se guarda en bruto para revisarlo, sin parar la lectura.
    if (await repositorio.existeMensaje(canal.id, idSintetico)) {
      resultado.duplicados++;
      return;
    }
    await repositorio.guardarMensaje({
      canalId: canal.id,
      conversacionId: null,
      idExterno: idSintetico,
      inReplyTo: null,
      referencias: [],
      uidImap: uid,
      carpeta,
      direccion,
      de: null,
      para: [],
      cc: [],
      asunto: "",
      texto: null,
      html: null,
      fecha: ahora(),
      estado: "revisar",
      fuenteBruta: fuente,
    });
    resultado.paraRevisar++;
    return;
  }

  const idExterno = normalizarMessageId(correo.messageId) ?? idSintetico;
  if (await repositorio.existeMensaje(canal.id, idExterno)) {
    resultado.duplicados++;
    return;
  }

  const propia = canal.direccion.toLowerCase();
  const de = direcciones(correo.from)[0] ?? null;
  const para = direcciones(correo.to);
  const cc = direcciones(correo.cc);
  const participantes = [...new Set([de, ...para, ...cc].flatMap((d) => (d ? [d.email] : [])))]
    .filter((email) => email !== propia)
    .sort();
  const inReplyTo = normalizarMessageId(correo.inReplyTo);
  const referencias = [
    ...new Set([...listaReferencias(correo.references), ...(inReplyTo ? [inReplyTo] : [])]),
  ];
  const asunto = correo.subject ?? "";
  const asuntoNormalizado = normalizarAsunto(asunto);
  const fecha = correo.date ?? ahora();

  // Contraparte: quien escribe si es entrante; el primer destinatario externo si es saliente.
  const contraparte = direccion === "entrante" ? de?.email : participantes[0];
  const clienteId = contraparte ? await asociarCliente(contraparte, repositorio) : null;

  const conversacionId =
    (referencias.length ? await repositorio.conversacionPorIdsExternos(canal.id, referencias) : null) ??
    (asuntoNormalizado && participantes.length
      ? await repositorio.conversacionPorAsunto(
          canal.id,
          asuntoNormalizado,
          participantes,
          new Date(fecha.getTime() - VENTANA_HILO_MS),
        )
      : null) ??
    (await repositorio.crearConversacion({ canalId: canal.id, clienteId, asunto, asuntoNormalizado, participantes }));

  const mensajeId = await repositorio.guardarMensaje({
    canalId: canal.id,
    conversacionId,
    idExterno,
    inReplyTo,
    referencias,
    uidImap: uid,
    carpeta,
    direccion,
    de,
    para,
    cc,
    asunto,
    texto: correo.text ?? null,
    html: correo.html || null,
    fecha,
    estado: "ok",
    fuenteBruta: null,
  });

  for (const [indice, adjunto] of correo.attachments.entries()) {
    const nombre = adjunto.filename ?? `adjunto-${String(indice + 1)}`;
    const tamano = adjunto.size || adjunto.content.length;
    const demasiadoGrande = tamano > (opciones.maximoAdjuntoBytes ?? MAXIMO_ADJUNTO_BYTES);
    const ruta = demasiadoGrande
      ? null
      : await almacen.subir(
          `correo/${canal.id}/${mensajeId}/${String(indice + 1)}-${nombreSeguro(nombre)}`,
          adjunto.content,
          adjunto.contentType,
        );
    await repositorio.guardarAdjunto({ mensajeId, nombre, tipo: adjunto.contentType, tamano, ruta, demasiadoGrande });
  }

  await repositorio.anotarMensajeEnConversacion(conversacionId, { fecha, direccion, clienteId });
  resultado.nuevos++;
}

/** Correo exacto de un contacto → cliente. Solo dominio de empresa → propuesta, sin asociar (D8). */
async function asociarCliente(email: string, repositorio: Repositorio): Promise<string | null> {
  const exacto = await repositorio.clientePorEmailContacto(email);
  if (exacto) return exacto;
  const dominio = dominioDe(email);
  if (esDominioPublico(dominio)) return null;
  for (const clienteId of await repositorio.clientesPorDominio(dominio)) {
    await repositorio.proponerContacto(email, clienteId);
  }
  return null;
}

function direcciones(campo: AddressObject | AddressObject[] | undefined): Direccion[] {
  const objetos = campo ? (Array.isArray(campo) ? campo : [campo]) : [];
  const salida: Direccion[] = [];
  const pendientes = objetos.flatMap((o) => o.value);
  while (pendientes.length) {
    const actual = pendientes.shift();
    if (!actual) continue;
    if (actual.group) pendientes.push(...actual.group);
    const email = normalizarEmail(actual.address);
    if (email) salida.push({ nombre: actual.name || "", email });
  }
  return salida;
}

function listaReferencias(referencias: string | string[] | undefined): string[] {
  const lista = Array.isArray(referencias) ? referencias : referencias ? referencias.split(/\s+/) : [];
  return lista.flatMap((r) => normalizarMessageId(r) ?? []);
}

function nombreSeguro(nombre: string): string {
  return nombre.normalize("NFKD").replace(/[^\w.-]+/g, "_").slice(0, 120) || "adjunto";
}

/** Convierte cualquier error en un mensaje sin secretos, apto para guardar y mostrar. */
function describirError(error: unknown): { mensaje: string; autenticacion: boolean } {
  if (error instanceof ErrorImap) {
    return { mensaje: error.message, autenticacion: error.tipo === "autenticacion" };
  }
  return { mensaje: "Error inesperado al leer el buzón.", autenticacion: false };
}
