# crm-correo

Piezas del correo del CRM Comercial: el cifrado de la contraseña de cada buzón y el lector de correo por IMAP. Es un paquete independiente de la web: tiene su propio `package.json` y la web no lo importa, así que no cambia su build ni su despliegue.

| Módulo | Decisiones del plan | Qué hace |
| --- | --- | --- |
| `src/cifrado/` | D13 | Cifrado por capas (AES-256-GCM) de la contraseña de cada buzón, con clave maestra versionada |
| `src/lector/` | D4–D10 | Lectura incremental y de solo lectura por IMAP, hilos y asociación a cliente |

No se conecta a ningún sistema real: no hay base de datos, ni buzones, ni Vercel. La base de datos, IMAP y el almacén de adjuntos son interfaces (`src/lector/tipos.ts`).

## Comandos

Desde esta carpeta:

```
npm install
npm run typecheck
npm test
```
