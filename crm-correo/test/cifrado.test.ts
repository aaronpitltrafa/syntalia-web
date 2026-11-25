import { inspect } from "node:util";
import { describe, expect, it } from "vitest";
import {
  cifrarCredencial,
  descifrarCredencial,
  ErrorCifrado,
  generarClaveMaestra,
  LlaveroMaestro,
  reenvolverConClaveActual,
} from "../src/cifrado/credenciales.js";

const CONTRASENA = "Contraseña-de-prueba-ñ€-123";
const v1 = generarClaveMaestra();
const v2 = generarClaveMaestra();
const llaveroV1 = LlaveroMaestro.desdeEntorno({ CORREO_CLAVE_MAESTRA_ACTUAL: "1", CORREO_CLAVE_MAESTRA_V1: v1 });
const llaveroV2 = LlaveroMaestro.desdeEntorno({
  CORREO_CLAVE_MAESTRA_ACTUAL: "2",
  CORREO_CLAVE_MAESTRA_V1: v1,
  CORREO_CLAVE_MAESTRA_V2: v2,
});

describe("cifrado de credenciales", () => {
  it("cifra y descifra la contraseña", () => {
    const registro = cifrarCredencial(CONTRASENA, "canal-1", llaveroV1);
    expect(registro.versionClave).toBe(1);
    expect(descifrarCredencial(registro, "canal-1", llaveroV1)).toBe(CONTRASENA);
  });

  it("el texto cifrado no contiene la contraseña", () => {
    const registro = cifrarCredencial(CONTRASENA, "canal-1", llaveroV1);
    const guardado = JSON.stringify(registro);
    expect(guardado).not.toContain(CONTRASENA);
    expect(guardado).not.toContain(Buffer.from(CONTRASENA).toString("base64"));
  });

  it("cada cifrado es distinto aunque la contraseña sea la misma", () => {
    const a = cifrarCredencial(CONTRASENA, "canal-1", llaveroV1);
    const b = cifrarCredencial(CONTRASENA, "canal-1", llaveroV1);
    expect(a.credencialCifrada).not.toBe(b.credencialCifrada);
    expect(a.claveDatosCifrada).not.toBe(b.claveDatosCifrada);
  });

  it("no se puede descifrar con el id de otro buzón", () => {
    const registro = cifrarCredencial(CONTRASENA, "canal-1", llaveroV1);
    expect(() => descifrarCredencial(registro, "canal-2", llaveroV1)).toThrow(ErrorCifrado);
  });

  it("no se puede mezclar la credencial de un buzón con la clave de datos de otro", () => {
    const a = cifrarCredencial(CONTRASENA, "canal-1", llaveroV1);
    const b = cifrarCredencial("otra", "canal-2", llaveroV1);
    const mezcla = { ...a, claveDatosCifrada: b.claveDatosCifrada };
    expect(() => descifrarCredencial(mezcla, "canal-1", llaveroV1)).toThrow(ErrorCifrado);
  });

  it("detecta cualquier alteración del texto cifrado", () => {
    const registro = cifrarCredencial(CONTRASENA, "canal-1", llaveroV1);
    const bytes = Buffer.from(registro.credencialCifrada.slice(3), "base64");
    bytes[bytes.length - 1] = (bytes[bytes.length - 1] ?? 0) ^ 1;
    const alterado = { ...registro, credencialCifrada: `f1.${bytes.toString("base64")}` };
    expect(() => descifrarCredencial(alterado, "canal-1", llaveroV1)).toThrow(ErrorCifrado);
  });

  it("falla con otra clave maestra", () => {
    const registro = cifrarCredencial(CONTRASENA, "canal-1", llaveroV1);
    const otro = LlaveroMaestro.desdeEntorno({
      CORREO_CLAVE_MAESTRA_ACTUAL: "1",
      CORREO_CLAVE_MAESTRA_V1: generarClaveMaestra(),
    });
    expect(() => descifrarCredencial(registro, "canal-1", otro)).toThrow(ErrorCifrado);
  });

  it("los errores no contienen la contraseña ni las claves", () => {
    const registro = cifrarCredencial(CONTRASENA, "canal-1", llaveroV1);
    try {
      descifrarCredencial(registro, "canal-2", llaveroV1);
      expect.unreachable();
    } catch (error) {
      const texto = `${String(error)} ${inspect(error)}`;
      expect(texto).not.toContain(CONTRASENA);
      expect(texto).not.toContain(v1);
    }
  });

  it("el llavero no muestra las claves al registrarlo", () => {
    expect(inspect(llaveroV2)).not.toContain(v1);
    expect(JSON.stringify({ llavero: llaveroV2 })).not.toContain(v2);
  });

  it("rota la clave maestra sin tocar la contraseña cifrada", () => {
    const antiguo = cifrarCredencial(CONTRASENA, "canal-1", llaveroV1);
    const rotado = reenvolverConClaveActual(antiguo, "canal-1", llaveroV2);
    expect(rotado.versionClave).toBe(2);
    expect(rotado.credencialCifrada).toBe(antiguo.credencialCifrada);
    expect(descifrarCredencial(rotado, "canal-1", llaveroV2)).toBe(CONTRASENA);
    // Tras quitar la v1 del entorno, lo rotado se sigue leyendo.
    const soloV2 = LlaveroMaestro.desdeEntorno({ CORREO_CLAVE_MAESTRA_ACTUAL: "2", CORREO_CLAVE_MAESTRA_V2: v2 });
    expect(descifrarCredencial(rotado, "canal-1", soloV2)).toBe(CONTRASENA);
    expect(() => descifrarCredencial(antiguo, "canal-1", soloV2)).toThrow(ErrorCifrado);
  });

  it("lo cifrado con una versión antigua se lee mientras su clave siga en el entorno", () => {
    const antiguo = cifrarCredencial(CONTRASENA, "canal-1", llaveroV1);
    expect(descifrarCredencial(antiguo, "canal-1", llaveroV2)).toBe(CONTRASENA);
    expect(cifrarCredencial(CONTRASENA, "canal-1", llaveroV2).versionClave).toBe(2);
  });

  it("rechaza configuraciones incorrectas del entorno", () => {
    expect(() => LlaveroMaestro.desdeEntorno({})).toThrow(ErrorCifrado);
    expect(() =>
      LlaveroMaestro.desdeEntorno({ CORREO_CLAVE_MAESTRA_ACTUAL: "2", CORREO_CLAVE_MAESTRA_V1: v1 }),
    ).toThrow(/versión actual/);
    expect(() =>
      LlaveroMaestro.desdeEntorno({ CORREO_CLAVE_MAESTRA_ACTUAL: "1", CORREO_CLAVE_MAESTRA_V1: "corta" }),
    ).toThrow(/32 bytes/);
  });

  it("rechaza contraseña o buzón vacíos", () => {
    expect(() => cifrarCredencial("", "canal-1", llaveroV1)).toThrow(ErrorCifrado);
    expect(() => cifrarCredencial(CONTRASENA, "", llaveroV1)).toThrow(ErrorCifrado);
  });
});
