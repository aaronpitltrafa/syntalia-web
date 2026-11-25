/**
 * Contratos del lector de correo. La base de datos, el servidor IMAP y el almacén de adjuntos son
 * interfaces: en TRADYN se implementan sobre su base de datos, ImapFlow y Vercel Blob.
 */

/** Las dos carpetas que se leen (D6). Spam y papelera no se leen. */
export type Carpeta = "recibidos" | "enviados";

/** Punto de lectura de una carpeta. Cada carpeta numera sus UID por separado, así que va por carpeta. */
export interface EstadoCarpeta {
  ultimoUid: number;
  /** UIDVALIDITY de la carpeta, como texto (en IMAP es un entero de 32 bits sin signo). */
  uidValidity: string;
}

export interface Canal {
  id: string;
  /** Dirección del buzón, p. ej. victor@frulonsa.es. */
  direccion: string;
  estado: "activo" | "pausado" | "error";
  estadoCarpetas: Partial<Record<Carpeta, EstadoCarpeta>>;
}

export type TipoErrorImap = "autenticacion" | "red" | "otro";

/** Error de IMAP ya saneado: su mensaje nunca contiene la contraseña. */
export class ErrorImap extends Error {
  readonly tipo: TipoErrorImap;
  constructor(tipo: TipoErrorImap, mensaje: string) {
    super(mensaje);
    this.name = "ErrorImap";
    this.tipo = tipo;
  }
}

/** Lo mínimo que el lector necesita de un servidor IMAP. Todas las operaciones son de solo lectura. */
export interface ClienteImap {
  conectar(): Promise<void>;
  /** Ruta real de la carpeta en el servidor, o null si no existe. */
  rutaCarpeta(carpeta: Carpeta): Promise<string | null>;
  /** Abre la carpeta en solo lectura (EXAMINE). */
  abrir(ruta: string): Promise<{ uidValidity: string }>;
  /** UID mayores que `uid`, en la carpeta abierta. */
  uidsMayoresQue(uid: number): Promise<number[]>;
  /** UID de los correos recibidos desde `fecha` (incluida), en la carpeta abierta. */
  uidsDesde(fecha: Date): Promise<number[]>;
  /** Descarga el correo completo sin marcarlo como leído (BODY.PEEK). */
  descargar(uids: readonly number[]): AsyncIterable<{ uid: number; fuente: Buffer }>;
  cerrar(): Promise<void>;
}

export interface Direccion {
  nombre: string;
  email: string;
}

export interface NuevoMensaje {
  canalId: string;
  /** null solo cuando el correo no se pudo interpretar y queda para revisar. */
  conversacionId: string | null;
  /** Message-ID, o uno sintético si falta. Único por buzón. */
  idExterno: string;
  inReplyTo: string | null;
  referencias: string[];
  uidImap: number;
  carpeta: Carpeta;
  direccion: "entrante" | "saliente";
  de: Direccion | null;
  para: Direccion[];
  cc: Direccion[];
  asunto: string;
  texto: string | null;
  html: string | null;
  fecha: Date;
  /** `revisar`: no se pudo interpretar; se guarda el correo en bruto en `fuenteBruta`. */
  estado: "ok" | "revisar";
  fuenteBruta: Buffer | null;
}

export interface NuevoAdjunto {
  mensajeId: string;
  nombre: string;
  tipo: string;
  tamano: number;
  /** Clave en el almacén privado, o null si no se subió por superar el máximo. */
  ruta: string | null;
  demasiadoGrande: boolean;
}

export interface NuevaConversacion {
  canalId: string;
  clienteId: string | null;
  asunto: string;
  asuntoNormalizado: string;
  participantes: string[];
}

export interface ResultadoLectura {
  origen: "n8n" | "bandeja";
  inicio: Date;
  fin: Date;
  nuevos: number;
  error: string | null;
}

/**
 * Acceso a la base de datos. En TRADYN se implementa con su cliente o ORM; las operaciones marcadas
 * como atómicas tienen que serlo (una sola sentencia o una transacción).
 */
export interface Repositorio {
  /**
   * Atómica: toma el bloqueo del buzón si está libre o ha caducado (`bloqueado_hasta` < ahora).
   * Devuelve false si otra lectura lo tiene (D9).
   */
  tomarBloqueo(canalId: string, hasta: Date, ahora: Date): Promise<boolean>;
  liberarBloqueo(canalId: string): Promise<void>;

  guardarEstadoCarpeta(canalId: string, carpeta: Carpeta, estado: EstadoCarpeta): Promise<void>;
  /** Fecha del correo más reciente guardado de esa carpeta, para releer si cambia UIDVALIDITY. */
  ultimaFechaMensaje(canalId: string, carpeta: Carpeta): Promise<Date | null>;

  existeMensaje(canalId: string, idExterno: string): Promise<boolean>;
  /** Conversación del buzón que contenga algún mensaje con uno de esos Message-ID. */
  conversacionPorIdsExternos(canalId: string, ids: readonly string[]): Promise<string | null>;
  /** Conversación con el mismo asunto normalizado y los mismos participantes, activa desde `desde`. */
  conversacionPorAsunto(
    canalId: string,
    asuntoNormalizado: string,
    participantes: readonly string[],
    desde: Date,
  ): Promise<string | null>;
  crearConversacion(datos: NuevaConversacion): Promise<string>;
  /**
   * Registra un mensaje nuevo en la conversación. Solo si `fecha` es igual o posterior a su último
   * mensaje, actualiza `ultimo_mensaje_at` y `pendiente_respuesta` (pendiente si es entrante).
   * Si la conversación no tiene cliente y llega `clienteId`, lo asigna.
   */
  anotarMensajeEnConversacion(
    conversacionId: string,
    datos: { fecha: Date; direccion: "entrante" | "saliente"; clienteId: string | null },
  ): Promise<void>;
  guardarMensaje(mensaje: NuevoMensaje): Promise<string>;
  guardarAdjunto(adjunto: NuevoAdjunto): Promise<void>;

  /** Cliente cuyo contacto tiene exactamente ese correo. */
  clientePorEmailContacto(email: string): Promise<string | null>;
  /** Clientes con algún contacto de ese dominio. */
  clientesPorDominio(dominio: string): Promise<string[]>;
  /** Crea, si no existe ya, una propuesta de contacto para que la confirme un responsable (D8). */
  proponerContacto(email: string, clienteId: string): Promise<void>;

  /**
   * Atómica. Éxito: pone `fallos_seguidos` a 0 y el estado en `activo`. Fallo: suma uno, guarda el
   * error y, si es de autenticación, pone el estado en `error`. Devuelve los fallos seguidos.
   */
  registrarResultado(
    canalId: string,
    resultado: { exito: true } | { exito: false; error: string; autenticacion: boolean },
  ): Promise<{ fallosSeguidos: number }>;
  registrarLectura(canalId: string, lectura: ResultadoLectura): Promise<void>;
}

/** Almacén privado de adjuntos (Vercel Blob en TRADYN). */
export interface AlmacenAdjuntos {
  subir(clave: string, contenido: Buffer, tipo: string): Promise<string>;
}
