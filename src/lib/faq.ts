/**
 * Preguntas frecuentes de la home. Es la fuente única: la lee el bloque
 * FAQ de la home y el bloque FAQPage de sus datos estructurados, así que
 * lo que se ve y lo que se declara no se pueden desincronizar. El orden de
 * la lista es el orden en pantalla.
 */
export type PreguntaFrecuente = {
  pregunta: string;
  respuesta: string;
};

export const FAQ_HOME: readonly PreguntaFrecuente[] = [
  {
    pregunta: "Ya he trabajado con agencias y no funcionó",
    respuesta:
      "Suele pasar cuando se ejecutan acciones sueltas sin una base detrás: campañas sin posicionamiento, contenido sin estrategia o una web que no está pensada para captar. Nosotros empezamos siempre por el diagnóstico, y si algo no tiene sentido para tu negocio, te lo decimos.",
  },
  {
    pregunta: "¿Tengo que firmar una permanencia?",
    respuesta:
      "Durante el sistema, sí: eliges el bloque de tres o de seis meses y ese recorrido se completa entero. No es una cláusula para atarte, es que un sistema a medio construir no funciona, y salir a mitad significa pagar por algo que nunca va a dar resultado. Cuando el bloque termina, se acaba el compromiso: a partir de ahí es una cuota mensual por el mantenimiento y las gestiones, y se cancela cuando quieras.",
  },
  {
    pregunta: "¿Cuánto cuesta?",
    respuesta:
      "Depende de qué necesite tu empresa, y eso se ve en el diagnóstico. Salimos de ahí con un alcance y una inversión concretos, no con una tarifa cerrada que no encaja con nadie.",
  },
  {
    pregunta: "¿Cuánto tarda en verse resultados?",
    respuesta:
      "Las primeras mejoras de posicionamiento y presencia se notan pronto. Los resultados comerciales sostenidos llegan cuando el sistema completo lleva un tiempo funcionando y optimizándose.",
  },
  {
    pregunta: "¿Trabajáis con empresas como la mía?",
    respuesta:
      "No filtramos por sector ni por tamaño: da igual que lleves veinte años facturando o que empieces desde cero. Lo que no hacemos son campañas sueltas. Montamos la estrategia completa y el sistema que la sostiene, y eso necesita un recorrido de tres meses como mínimo. Donde más experiencia tenemos es en agroalimentario, servicios locales y B2B, pero el sistema es el mismo en cualquier sector.",
  },
  {
    pregunta: "¿Qué vais a hacer exactamente en mi empresa?",
    respuesta:
      "Lo que salga del diagnóstico, dentro de las cuatro etapas: ordenar el posicionamiento, construir la base digital, montar la captación y optimizar. Cada fase se entrega con objetivos y responsables claros.",
  },
];
