import type { Contenedor, Posiciones, Ubicacion } from "../../type/types";

export default function crearMapaFila(contenedores: Contenedor[]): Posiciones {

  const mapa = {} as Posiciones;

  const columnas = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const niveles = [1, 2, 3];

  // Genera todas las posiciones en null
  for (const columna of columnas) {
    for (const nivel of niveles) {
      const ubicacion = `${columna}${nivel}` as Ubicacion;
      mapa[ubicacion] = null;
    }
  }

  // Coloca los contenedores donde corresponde
for (const contenedor of contenedores) {
  if (!contenedor.ubicacion) continue;

  const ubicacion = contenedor.ubicacion.toUpperCase() as Ubicacion;
  mapa[ubicacion] = contenedor;
}

  return mapa;
}