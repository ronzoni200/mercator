import { useEffect, useMemo } from "react";
import { StateGlobal } from "../hookZustand/useStorega.ts";
import { useHelper } from "../servicios/helperAbrirFila.ts";
import type { Contenedor } from "../type/types.ts";

type Props = {
  fila: string;
};

export default function AbrirFila({ fila }: Props) {

  const { obtenerContenedores } = useHelper();
  const {contenedores, setContenedorEditar, setTipoFormulario,} = StateGlobal();

  useEffect(() => {
    obtenerContenedores();
  }, [fila]);

  const botonEditar = (contenedor: Contenedor) => {
    setContenedorEditar(contenedor);
    setTipoFormulario("camion");
  };

  const columnas = ["H", "G", "F", "E", "D", "C", "B", "A"];
  const niveles = [3, 2, 1];

  // Mapa para acceder rápidamente por ubicación
  const mapaUbicaciones = useMemo(() => {
    const mapa = new Map<string, Contenedor>();

   contenedores.forEach((contenedor) => {
  if (contenedor.ubicacion) {
    mapa.set(contenedor.ubicacion, contenedor);
  }
});

    return mapa;
  }, [contenedores]);

  return (
    <div className="mt-8 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-8">
        Fila {fila}
      </h2>

      <div className="grid grid-cols-9 gap-2">

        {/* esquina superior izquierda */}
        <div></div>

        {/* encabezados */}
        {columnas.map((columna) => (
          <div
            key={columna}
            className="text-center font-bold text-lg"
          >
            {columna}
          </div>
        ))}

        {/* filas */}
        {niveles.map((nivel) => (
          <>
            {/* número del nivel */}
            <div
              key={`nivel-${nivel}`}
              className="flex items-center justify-center font-bold text-lg"
            >
              {nivel}
            </div>

            {/* columnas */}
            {columnas.map((columna) => {
              const ubicacion = `${columna}${nivel}`;

              const contenedor = mapaUbicaciones.get(ubicacion);

              return (
                <button
                  key={ubicacion}
                  onClick={() => {
                    if (contenedor) {
                      botonEditar(contenedor);
                    } else {
                      console.log("Ubicación libre:", ubicacion);
                    }
                  }}
                  className={`w-24 h-24 rounded-lg border shadow transition hover:scale-105 cursor-pointer ${contenedor
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-green-500 hover:bg-green-600 text-white"
                    }
                  `}
                >
                  <div className="font-bold text-lg">
                    {ubicacion}
                  </div>

                  <div className="text-xs mt-2 px-1 break-all">
                    {contenedor
                      ? contenedor.contenedorId
                      : "LIBRE"}
                  </div>
                </button>
              );
            })}
          </>
        ))}
      </div>

      {/* Leyenda */}
      <div className="flex gap-8 mt-8">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-green-500 rounded"></div>
          <span>Libre</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-red-500 rounded"></div>
          <span>Ocupado</span>
        </div>
      </div>
    </div>
  );
}