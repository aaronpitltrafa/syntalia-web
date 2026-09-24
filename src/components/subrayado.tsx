/**
 * Subrayado dorado de los titulares (.mark-v3 en styles.css): una raya por
 * debajo de la palabra que se dibuja al cargar. El texto no cambia de color,
 * así que vale igual sobre la home oscura que sobre las páginas crema.
 *
 * Pensado para una o dos palabras: va en inline-block y no se parte entre
 * líneas.
 */
export function Subrayado({ children }: { children: React.ReactNode }) {
  return <span className="mark-v3">{children}</span>;
}
