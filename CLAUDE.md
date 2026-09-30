# Proyecto: LANDING SYNTALIA

Estás trabajando exclusivamente en el proyecto LANDING SYNTALIA.

Reglas obligatorias:
- No modifiques archivos fuera de la carpeta LANDING SYNTALIA.
- No modifiques Digital Agro Growth (1).
- No leas ni cambies archivos de la web original salvo que el usuario lo pida expresamente.
- Antes de hacer cambios grandes, explica qué archivos vas a tocar.
- Esta carpeta es una landing independiente orientada a conversión.
- Prioriza claridad, captación de leads, CTA visible, formulario y estructura comercial simple.
- Todo titular nuevo o rehecho se comprueba con la fuente real (Raleway/Poppins) Y con la de respaldo (bloqueando los .woff2) antes de darlo por bueno: mismo número de líneas con las dos en todo el rango de 320 a 1920 px. Si cambia, el titular salta al cargar la fuente (CLS).

Convenciones:
- Idioma: siempre en español. Las respuestas e informes, los comentarios del código y los mensajes de commit, en español. Los nombres de variables, funciones y clases CSS se quedan como están (no se traducen ni se renombran).
- Push: hacer push a main significa PUBLICAR EN PRODUCCIÓN. Vercel despliega en uno a tres minutos y lo ve cualquiera que entre en verticeagency.es. No es guardar, es publicar; por eso solo se sube trabajo terminado.
  - El push a main lo haces tú, sin pedirlo, pero solo cuando el trabajo esté terminado y comprobado, nunca después de un commit intermedio.
  - El orden es: terminas la tarea, pasas las comprobaciones que se hayan pedido, commiteas, `git push origin main`, y entonces escribes el informe diciendo que has subido y qué commits van.
  - Si el push falla por credenciales, no lo reintentes de otra forma ni toques la configuración de git: dilo en el informe y deja los commits en local.
- CLS después de la carga: el CLS se mide también después de la carga. Cualquier cosa que cambie de tamaño sola (un temporizador, una animación de entrada, un texto que aparece) tiene que reservar su espacio. Medir el CLS solo durante la carga no basta: hay que medirlo leyendo, durante 30 segundos, con el elemento asomando bajo la cabecera, que es donde el anclaje de scroll de Chrome deja de taparlo.
- Comportamiento por ruta: un comportamiento que dependa de la ruta se comprueba en todas las rutas, no solo en la home. Si una condición lleva escrito el nombre de una página, hay que preguntarse qué pasa en todas las demás (hoy son 18 páginas: las 15 del sitemap más /aviso-legal, /privacidad y /cookies).

Comandos habituales:
- npm install
- npm run dev
- npm run build

Objetivo:
Crear y mejorar una landing que convierta visitas en contactos, diagnósticos o reuniones.