/** Dobles de prueba: servidor IMAP falso y repositorio en memoria. Sin red ni base de datos. */
import {
  ErrorImap,
  type AlmacenAdjuntos,
  type Carpeta,
  type ClienteImap,
  type EstadoCarpeta,
  type NuevaConversacion,
  type NuevoAdjunto,
  type NuevoMensaje,
  type Repositorio,
  type ResultadoLectura,
  type TipoErrorImap,
} from "../src/lector/tipos.js";

interface CorreoFalso {
  uid: number;
  fuente: Buffer;
  fecha: Date;
}

/** Buzón IMAP en memoria. Registra todo lo que se le pide para comprobar que solo se lee. */
export class ServidorFalso {
  carpetas: Record<Carpeta, { ruta: string | null; uidValidity: string; correos: CorreoFalso[] }> = {
    recibidos: { ruta: "INBOX", uidValidity: "1000", correos: [] },
    enviados: { ruta: "Enviados", uidValidity: "2000", correos: [] },
  };
  descargados: Record<string, number[]> = {};
  conexiones = 0;
  cierres = 0;
  fallarAlConectar: TipoErrorImap | null = null;
  /** Reproduce la regla de IMAP: "N:*" devuelve siempre el último correo aunque su UID sea menor. */
  imitarAsteriscoImap = true;

  anadir(carpeta: Carpeta, fuente: string, fecha = new Date("2026-11-20T10:00:00Z")): number {
    const lista = this.carpetas[carpeta].correos;
    const uid = (lista.at(-1)?.uid ?? 0) + 1;
    lista.push({ uid, fuente: Buffer.from(fuente.replace(/\r?\n/g, "\r\n")), fecha });
    return uid;
  }

  cliente(): ClienteImap {
    const servidor = this;
    let abierta: Carpeta | null = null;
    const carpetaAbierta = () => {
      if (!abierta) throw new Error("no hay carpeta abierta");
      return this.carpetas[abierta];
    };
    return {
      conectar: async () => {
        this.conexiones++;
        if (this.fallarAlConectar) throw new ErrorImap(this.fallarAlConectar, `Fallo simulado: ${this.fallarAlConectar}`);
      },
      rutaCarpeta: async (carpeta) => this.carpetas[carpeta].ruta,
      abrir: async (ruta) => {
        const entrada = (Object.entries(this.carpetas) as [Carpeta, ServidorFalso["carpetas"][Carpeta]][]).find(
          ([, c]) => c.ruta === ruta,
        );
        if (!entrada) throw new Error(`no existe ${ruta}`);
        abierta = entrada[0];
        return { uidValidity: entrada[1].uidValidity };
      },
      uidsMayoresQue: async (uid) => {
        const correos = carpetaAbierta().correos;
        const mayores = correos.filter((c) => c.uid > uid).map((c) => c.uid);
        const ultimo = correos.at(-1)?.uid;
        if (this.imitarAsteriscoImap && mayores.length === 0 && ultimo !== undefined) return [ultimo];
        return mayores;
      },
      uidsDesde: async (fecha) => {
        const dia = new Date(Date.UTC(fecha.getUTCFullYear(), fecha.getUTCMonth(), fecha.getUTCDate()));
        return carpetaAbierta().correos.filter((c) => c.fecha >= dia).map((c) => c.uid);
      },
      async *descargar(uids: readonly number[]) {
        const carpeta = carpetaAbierta();
        const ruta = carpeta.ruta ?? "";
        servidor.descargados[ruta] = [...(servidor.descargados[ruta] ?? []), ...uids];
        for (const correo of carpeta.correos) if (uids.includes(correo.uid)) yield { uid: correo.uid, fuente: correo.fuente };
      },
      cerrar: async () => {
        this.cierres++;
      },
    };
  }
}

interface ConversacionMemoria extends NuevaConversacion {
  id: string;
  ultimoMensajeAt: Date | null;
  pendienteRespuesta: boolean;
}

/** Repositorio en memoria con la misma semántica que se pide a la base de datos real. */
export class RepositorioMemoria implements Repositorio {
  bloqueos = new Map<string, Date>();
  estados = new Map<string, EstadoCarpeta>();
  conversaciones: ConversacionMemoria[] = [];
  mensajes: (NuevoMensaje & { id: string })[] = [];
  adjuntos: NuevoAdjunto[] = [];
  contactos = new Map<string, string>();
  propuestas: { email: string; clienteId: string }[] = [];
  fallos = new Map<string, number>();
  estadoCanal = new Map<string, "activo" | "error">();
  errores: string[] = [];
  lecturas: ResultadoLectura[] = [];

  async tomarBloqueo(canalId: string, hasta: Date, ahora: Date) {
    const actual = this.bloqueos.get(canalId);
    if (actual && actual > ahora) return false;
    this.bloqueos.set(canalId, hasta);
    return true;
  }
  async liberarBloqueo(canalId: string) {
    this.bloqueos.delete(canalId);
  }
  async guardarEstadoCarpeta(canalId: string, carpeta: Carpeta, estado: EstadoCarpeta) {
    this.estados.set(`${canalId}:${carpeta}`, { ...estado });
  }
  estado(canalId: string, carpeta: Carpeta) {
    return this.estados.get(`${canalId}:${carpeta}`);
  }
  async ultimaFechaMensaje(canalId: string, carpeta: Carpeta) {
    const fechas = this.mensajes.filter((m) => m.canalId === canalId && m.carpeta === carpeta).map((m) => m.fecha.getTime());
    return fechas.length ? new Date(Math.max(...fechas)) : null;
  }
  async existeMensaje(canalId: string, idExterno: string) {
    return this.mensajes.some((m) => m.canalId === canalId && m.idExterno === idExterno);
  }
  async conversacionPorIdsExternos(canalId: string, ids: readonly string[]) {
    return this.mensajes.find((m) => m.canalId === canalId && ids.includes(m.idExterno))?.conversacionId ?? null;
  }
  async conversacionPorAsunto(canalId: string, asuntoNormalizado: string, participantes: readonly string[], desde: Date) {
    const clave = participantes.join(",");
    return (
      this.conversaciones.find(
        (c) =>
          c.canalId === canalId &&
          c.asuntoNormalizado === asuntoNormalizado &&
          c.participantes.join(",") === clave &&
          (c.ultimoMensajeAt ?? new Date(0)) >= desde,
      )?.id ?? null
    );
  }
  async crearConversacion(datos: NuevaConversacion) {
    const id = `conv-${String(this.conversaciones.length + 1)}`;
    this.conversaciones.push({ ...datos, id, ultimoMensajeAt: null, pendienteRespuesta: false });
    return id;
  }
  async anotarMensajeEnConversacion(
    id: string,
    datos: { fecha: Date; direccion: "entrante" | "saliente"; clienteId: string | null },
  ) {
    const c = this.conversaciones.find((x) => x.id === id);
    if (!c) throw new Error(`no existe ${id}`);
    if (!c.ultimoMensajeAt || datos.fecha >= c.ultimoMensajeAt) {
      c.ultimoMensajeAt = datos.fecha;
      c.pendienteRespuesta = datos.direccion === "entrante";
    }
    if (!c.clienteId && datos.clienteId) c.clienteId = datos.clienteId;
  }
  async guardarMensaje(mensaje: NuevoMensaje) {
    if (this.mensajes.some((m) => m.canalId === mensaje.canalId && m.idExterno === mensaje.idExterno)) {
      throw new Error("violación de unicidad (canal_id, id_externo)");
    }
    const id = `msg-${String(this.mensajes.length + 1)}`;
    this.mensajes.push({ ...mensaje, id });
    return id;
  }
  async guardarAdjunto(adjunto: NuevoAdjunto) {
    this.adjuntos.push(adjunto);
  }
  async clientePorEmailContacto(email: string) {
    return this.contactos.get(email) ?? null;
  }
  async clientesPorDominio(dominio: string) {
    return [...new Set([...this.contactos].filter(([e]) => e.endsWith(`@${dominio}`)).map(([, c]) => c))];
  }
  async proponerContacto(email: string, clienteId: string) {
    if (!this.propuestas.some((p) => p.email === email && p.clienteId === clienteId)) this.propuestas.push({ email, clienteId });
  }
  async registrarResultado(
    canalId: string,
    r: { exito: true } | { exito: false; error: string; autenticacion: boolean },
  ) {
    if (r.exito) {
      this.fallos.set(canalId, 0);
      this.estadoCanal.set(canalId, "activo");
    } else {
      this.fallos.set(canalId, (this.fallos.get(canalId) ?? 0) + 1);
      this.errores.push(r.error);
      if (r.autenticacion) this.estadoCanal.set(canalId, "error");
    }
    return { fallosSeguidos: this.fallos.get(canalId) ?? 0 };
  }
  async registrarLectura(_canalId: string, lectura: ResultadoLectura) {
    this.lecturas.push(lectura);
  }
}

export class AlmacenMemoria implements AlmacenAdjuntos {
  subidos = new Map<string, Buffer>();
  async subir(clave: string, contenido: Buffer) {
    this.subidos.set(clave, contenido);
    return clave;
  }
}

/** Construye un correo MIME sencillo. */
export function correo(o: {
  id?: string | null;
  de: string;
  para: string;
  cc?: string;
  asunto: string;
  fecha?: string;
  inReplyTo?: string;
  referencias?: string;
  texto?: string;
  adjunto?: { nombre: string; contenido: string };
}): string {
  const cabeceras = [
    `From: ${o.de}`,
    `To: ${o.para}`,
    ...(o.cc ? [`Cc: ${o.cc}`] : []),
    `Subject: ${o.asunto}`,
    `Date: ${o.fecha ?? "Thu, 20 Nov 2026 10:00:00 +0100"}`,
    ...(o.id === null ? [] : [`Message-ID: ${o.id ?? `<${Math.random().toString(36).slice(2)}@prueba>`}`]),
    ...(o.inReplyTo ? [`In-Reply-To: ${o.inReplyTo}`] : []),
    ...(o.referencias ? [`References: ${o.referencias}`] : []),
    "MIME-Version: 1.0",
  ];
  const texto = o.texto ?? "Hola";
  if (!o.adjunto) return [...cabeceras, "Content-Type: text/plain; charset=utf-8", "", texto, ""].join("\n");
  const limite = "LIMITE123";
  return [
    ...cabeceras,
    `Content-Type: multipart/mixed; boundary="${limite}"`,
    "",
    `--${limite}`,
    "Content-Type: text/plain; charset=utf-8",
    "",
    texto,
    `--${limite}`,
    `Content-Type: application/pdf; name="${o.adjunto.nombre}"`,
    `Content-Disposition: attachment; filename="${o.adjunto.nombre}"`,
    "Content-Transfer-Encoding: base64",
    "",
    Buffer.from(o.adjunto.contenido).toString("base64"),
    `--${limite}--`,
    "",
  ].join("\n");
}
