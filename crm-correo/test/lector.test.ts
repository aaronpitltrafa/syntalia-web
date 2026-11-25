import { beforeEach, describe, expect, it } from "vitest";
import { normalizarAsunto } from "../src/lector/normalizar.js";
import { puedeLeerDesdeBandeja, sincronizarBuzon, type OpcionesLectura } from "../src/lector/sincronizar.js";
import type { Canal } from "../src/lector/tipos.js";
import { AlmacenMemoria, correo, RepositorioMemoria, ServidorFalso } from "./dobles.js";

const PROPIO = "victor@frulonsa.es";
const CLIENTE = "compras@clienteuno.com";

let servidor: ServidorFalso;
let repo: RepositorioMemoria;
let almacen: AlmacenMemoria;
let canal: Canal;

function opciones(extra: Partial<OpcionesLectura> = {}): OpcionesLectura {
  return { repositorio: repo, almacen, crearCliente: () => servidor.cliente(), origen: "n8n", ...extra };
}

/** Lee el buzón y refleja en el canal el estado guardado, como haría la siguiente lectura real. */
async function leer(extra: Partial<OpcionesLectura> = {}) {
  const r = await sincronizarBuzon(canal, opciones(extra));
  canal = {
    ...canal,
    estadoCarpetas: {
      recibidos: repo.estado(canal.id, "recibidos"),
      enviados: repo.estado(canal.id, "enviados"),
    },
  };
  return r;
}

beforeEach(() => {
  servidor = new ServidorFalso();
  repo = new RepositorioMemoria();
  almacen = new AlmacenMemoria();
  canal = { id: "canal-1", direccion: PROPIO, estado: "activo", estadoCarpetas: {} };
  repo.contactos.set(CLIENTE, "cliente-uno");
});

describe("lectura incremental (D4, D6)", () => {
  it("lee Recibidos y Enviados y guarda el último UID de cada carpeta", async () => {
    servidor.anadir("recibidos", correo({ de: CLIENTE, para: PROPIO, asunto: "Pedido" }));
    servidor.anadir("recibidos", correo({ de: CLIENTE, para: PROPIO, asunto: "Otro pedido" }));
    servidor.anadir("enviados", correo({ de: PROPIO, para: CLIENTE, asunto: "Oferta" }));

    const r = await leer();

    expect(r).toMatchObject({ estado: "ok", nuevos: 3, pendiente: false });
    expect(repo.estado("canal-1", "recibidos")).toEqual({ ultimoUid: 2, uidValidity: "1000" });
    expect(repo.estado("canal-1", "enviados")).toEqual({ ultimoUid: 1, uidValidity: "2000" });
    expect(repo.mensajes.map((m) => m.direccion)).toEqual(["entrante", "entrante", "saliente"]);
  });

  it("la siguiente lectura solo descarga lo nuevo, aunque el servidor devuelva el último por la regla de '*'", async () => {
    servidor.anadir("recibidos", correo({ de: CLIENTE, para: PROPIO, asunto: "Uno" }));
    await leer();
    servidor.descargados = {};

    const sinNovedad = await leer();
    expect(sinNovedad.nuevos).toBe(0);
    expect(servidor.descargados.INBOX ?? []).toEqual([]);

    servidor.anadir("recibidos", correo({ de: CLIENTE, para: PROPIO, asunto: "Dos" }));
    const conNovedad = await leer();
    expect(conNovedad.nuevos).toBe(1);
    expect(servidor.descargados.INBOX).toEqual([2]);
  });

  it("si cambia UIDVALIDITY relee desde el último correo guardado sin duplicar", async () => {
    const fecha = new Date("2026-11-20T10:00:00Z");
    servidor.anadir("recibidos", correo({ id: "<a@x>", de: CLIENTE, para: PROPIO, asunto: "A", fecha: fecha.toUTCString() }), fecha);
    await leer();

    servidor.carpetas.recibidos.uidValidity = "9999";
    servidor.anadir("recibidos", correo({ id: "<b@x>", de: CLIENTE, para: PROPIO, asunto: "B" }), fecha);
    const r = await leer();

    expect(r.nuevos).toBe(1);
    expect(r.duplicados).toBe(1);
    expect(r.avisos.join(" ")).toContain("UIDVALIDITY");
    expect(repo.mensajes.map((m) => m.idExterno).sort()).toEqual(["<a@x>", "<b@x>"]);
    expect(repo.estado("canal-1", "recibidos")).toEqual({ ultimoUid: 2, uidValidity: "9999" });
  });

  it("si no hay carpeta de Enviados lo avisa y sigue", async () => {
    servidor.carpetas.enviados.ruta = null;
    servidor.anadir("recibidos", correo({ de: CLIENTE, para: PROPIO, asunto: "Uno" }));
    const r = await leer();
    expect(r).toMatchObject({ estado: "ok", nuevos: 1 });
    expect(r.avisos[0]).toContain("enviados");
  });
});

describe("solo lectura (D5)", () => {
  it("el cliente IMAP no tiene ninguna operación de escritura", () => {
    const metodos = Object.keys(servidor.cliente()).sort();
    expect(metodos).toEqual(["abrir", "cerrar", "conectar", "descargar", "rutaCarpeta", "uidsDesde", "uidsMayoresQue"]);
  });
});

describe("hilos (D7)", () => {
  it("une la respuesta por In-Reply-To y References", async () => {
    servidor.anadir("recibidos", correo({ id: "<p1@cliente>", de: CLIENTE, para: PROPIO, asunto: "Precio mango" }));
    servidor.anadir(
      "enviados",
      correo({ de: PROPIO, para: CLIENTE, asunto: "Re: Precio mango", inReplyTo: "<p1@cliente>", referencias: "<p1@cliente>" }),
    );
    await leer();
    expect(repo.conversaciones).toHaveLength(1);
  });

  it("sin cabeceras de hilo, une por asunto normalizado y mismos participantes en 30 días", async () => {
    servidor.anadir("recibidos", correo({ de: CLIENTE, para: PROPIO, asunto: "Precio mango", fecha: "Mon, 2 Nov 2026 10:00:00 +0100" }));
    servidor.anadir("recibidos", correo({ de: CLIENTE, para: PROPIO, asunto: "RE: FW: precio  MANGO", fecha: "Fri, 20 Nov 2026 10:00:00 +0100" }));
    await leer();
    expect(repo.conversaciones).toHaveLength(1);
  });

  it("no une por asunto si han pasado más de 30 días o cambian los participantes", async () => {
    servidor.anadir("recibidos", correo({ de: CLIENTE, para: PROPIO, asunto: "Precio", fecha: "Mon, 1 Sep 2026 10:00:00 +0100" }));
    servidor.anadir("recibidos", correo({ de: CLIENTE, para: PROPIO, asunto: "Re: Precio", fecha: "Fri, 20 Nov 2026 10:00:00 +0100" }));
    servidor.anadir("recibidos", correo({ de: "otro@clientedos.com", para: PROPIO, asunto: "Re: Precio", fecha: "Fri, 20 Nov 2026 11:00:00 +0100" }));
    await leer();
    expect(repo.conversaciones).toHaveLength(3);
  });

  it("normaliza prefijos de respuesta y reenvío", () => {
    expect(normalizarAsunto("RE: Fwd: RV:  Pedido   12 ")).toBe("pedido 12");
    expect(normalizarAsunto("AW: Re[2]: Angebot")).toBe("angebot");
    expect(normalizarAsunto("Reunión: martes")).toBe("reunión: martes");
  });
});

describe("pendiente de respuesta", () => {
  it("una respuesta enviada quita el pendiente; un correo antiguo que llega tarde no lo vuelve a poner", async () => {
    servidor.anadir("recibidos", correo({ id: "<q@c>", de: CLIENTE, para: PROPIO, asunto: "Duda", fecha: "Thu, 19 Nov 2026 09:00:00 +0100" }));
    servidor.anadir("enviados", correo({ de: PROPIO, para: CLIENTE, asunto: "Re: Duda", inReplyTo: "<q@c>", fecha: "Thu, 19 Nov 2026 12:00:00 +0100" }));
    await leer();
    expect(repo.conversaciones[0]?.pendienteRespuesta).toBe(false);

    servidor.anadir("recibidos", correo({ de: CLIENTE, para: PROPIO, asunto: "Re: Duda", referencias: "<q@c>", fecha: "Thu, 19 Nov 2026 10:00:00 +0100" }));
    await leer();
    expect(repo.conversaciones).toHaveLength(1);
    expect(repo.conversaciones[0]?.pendienteRespuesta).toBe(false);
  });
});

describe("asociación a cliente (D8)", () => {
  it("asocia por el correo exacto de un contacto", async () => {
    servidor.anadir("recibidos", correo({ de: `Compras <${CLIENTE.toUpperCase()}>`, para: PROPIO, asunto: "Hola" }));
    await leer();
    expect(repo.conversaciones[0]?.clienteId).toBe("cliente-uno");
    expect(repo.propuestas).toEqual([]);
  });

  it("por dominio de empresa solo propone el contacto y deja la conversación en Desconocidos", async () => {
    servidor.anadir("recibidos", correo({ de: "nuevo@clienteuno.com", para: PROPIO, asunto: "Hola" }));
    await leer();
    expect(repo.conversaciones[0]?.clienteId).toBeNull();
    expect(repo.propuestas).toEqual([{ email: "nuevo@clienteuno.com", clienteId: "cliente-uno" }]);
  });

  it("nunca asocia ni propone por un dominio público", async () => {
    repo.contactos.set("jefe@gmail.com", "cliente-dos");
    servidor.anadir("recibidos", correo({ de: "desconocido@gmail.com", para: PROPIO, asunto: "Hola" }));
    await leer();
    expect(repo.conversaciones[0]?.clienteId).toBeNull();
    expect(repo.propuestas).toEqual([]);
  });

  it("en los enviados asocia por el destinatario", async () => {
    servidor.anadir("enviados", correo({ de: PROPIO, para: CLIENTE, asunto: "Oferta" }));
    await leer();
    expect(repo.conversaciones[0]?.clienteId).toBe("cliente-uno");
  });
});

describe("adjuntos (D14)", () => {
  it("sube los adjuntos al almacén privado y marca los que superan el máximo", async () => {
    servidor.anadir("recibidos", correo({ de: CLIENTE, para: PROPIO, asunto: "Factura", adjunto: { nombre: "factura nov.pdf", contenido: "%PDF-1.4 corto" } }));
    servidor.anadir("recibidos", correo({ de: CLIENTE, para: PROPIO, asunto: "Grande", adjunto: { nombre: "grande.pdf", contenido: "x".repeat(2000) } }));
    await leer({ maximoAdjuntoBytes: 1000 });

    expect(repo.adjuntos).toHaveLength(2);
    expect(repo.adjuntos[0]).toMatchObject({ nombre: "factura nov.pdf", demasiadoGrande: false });
    expect(repo.adjuntos[0]?.ruta).toMatch(/^correo\/canal-1\/msg-1\/1-factura_nov\.pdf$/);
    expect(repo.adjuntos[1]).toMatchObject({ nombre: "grande.pdf", demasiadoGrande: true, ruta: null });
    expect(almacen.subidos.size).toBe(1);
  });
});

describe("correos raros", () => {
  it("un correo sin Message-ID recibe un id sintético estable y no se duplica al releer", async () => {
    servidor.anadir("recibidos", correo({ id: null, de: CLIENTE, para: PROPIO, asunto: "Sin id" }));
    await leer();
    canal = { ...canal, estadoCarpetas: {} };
    const r = await leer();
    expect(r.duplicados).toBe(1);
    expect(repo.mensajes).toHaveLength(1);
    expect(repo.mensajes[0]?.idExterno).toMatch(/^sin-message-id:canal-1:recibidos:1:/);
  });
});

describe("una lectura a la vez, lotes y tiempo máximo (D9)", () => {
  it("si otra lectura tiene el bloqueo, sale sin conectar", async () => {
    await repo.tomarBloqueo("canal-1", new Date(Date.now() + 60_000), new Date());
    const r = await leer();
    expect(r.estado).toBe("ocupado");
    expect(servidor.conexiones).toBe(0);
  });

  it("un bloqueo caducado (función muerta) no impide leer", async () => {
    await repo.tomarBloqueo("canal-1", new Date(Date.now() - 1000), new Date(Date.now() - 60_000));
    servidor.anadir("recibidos", correo({ de: CLIENTE, para: PROPIO, asunto: "Uno" }));
    expect((await leer()).estado).toBe("ok");
  });

  it("libera el bloqueo y cierra la conexión al terminar, también con error", async () => {
    await leer();
    expect(repo.bloqueos.size).toBe(0);
    servidor.fallarAlConectar = "red";
    await leer();
    expect(repo.bloqueos.size).toBe(0);
    expect(servidor.cierres).toBe(2);
  });

  it("lee en lotes de 50 y, si se acaba el tiempo, deja el resto para la siguiente lectura", async () => {
    for (let i = 0; i < 120; i++) servidor.anadir("recibidos", correo({ de: CLIENTE, para: PROPIO, asunto: `Correo ${String(i)}` }));
    let reloj = 0;
    // Cada consulta de la hora avanza 1 ms; con 2 ms de máximo, solo cabe el primer lote.
    const ahora = () => new Date(1_800_000_000_000 + (reloj += 1) * 1);
    const primera = await leer({ tiempoMaximoMs: 2, ahora });
    expect(primera).toMatchObject({ pendiente: true, nuevos: 50 });
    expect(repo.estado("canal-1", "recibidos")?.ultimoUid).toBe(50);

    const segunda = await leer();
    expect(segunda).toMatchObject({ pendiente: false, nuevos: 70 });
    expect(repo.mensajes).toHaveLength(120);
  });

  it("desde la bandeja se lee como mucho una vez por minuto", () => {
    const t = new Date("2026-11-25T10:00:00Z");
    expect(puedeLeerDesdeBandeja(null, t)).toBe(true);
    expect(puedeLeerDesdeBandeja(new Date(t.getTime() - 30_000), t)).toBe(false);
    expect(puedeLeerDesdeBandeja(new Date(t.getTime() - 60_000), t)).toBe(true);
  });
});

describe("estado, errores y alertas (D16, D17)", () => {
  it("un buzón pausado no se conecta", async () => {
    canal = { ...canal, estado: "pausado" };
    expect((await leer()).estado).toBe("pausado");
    expect(servidor.conexiones).toBe(0);
  });

  it("contraseña incorrecta: estado error y cuenta fallos seguidos hasta la alerta", async () => {
    servidor.fallarAlConectar = "autenticacion";
    const resultados = [await leer(), await leer(), await leer()];
    expect(resultados.map((r) => r.fallosSeguidos)).toEqual([1, 2, 3]);
    expect(resultados[2]?.estado).toBe("error");
    expect(repo.estadoCanal.get("canal-1")).toBe("error");

    servidor.fallarAlConectar = null;
    const recuperado = await leer();
    expect(recuperado.fallosSeguidos).toBe(0);
    expect(repo.estadoCanal.get("canal-1")).toBe("activo");
  });

  it("si el servidor no responde no se pierde el punto de lectura", async () => {
    servidor.anadir("recibidos", correo({ de: CLIENTE, para: PROPIO, asunto: "Uno" }));
    await leer();
    servidor.fallarAlConectar = "red";
    await leer();
    expect(repo.estado("canal-1", "recibidos")?.ultimoUid).toBe(1);
  });

  it("un error inesperado se guarda con un mensaje genérico", async () => {
    repo.existeMensaje = async () => {
      throw new Error("detalle interno con datos sensibles");
    };
    servidor.anadir("recibidos", correo({ de: CLIENTE, para: PROPIO, asunto: "Uno" }));
    const r = await leer();
    expect(r.error).toBe("Error inesperado al leer el buzón.");
    expect(repo.errores.join(" ")).not.toContain("sensibles");
  });

  it("registra cada lectura con su origen", async () => {
    await leer({ origen: "bandeja" });
    expect(repo.lecturas).toHaveLength(1);
    expect(repo.lecturas[0]).toMatchObject({ origen: "bandeja", nuevos: 0, error: null });
  });
});
