import { useMemo } from "react";
import type { Contenedor } from "../../type/types";
import { StateGlobal } from "../../hookZustand/useStorega";
import React from "react";

export default function MatrizAbrirFila() {
  const {contenedores, setContenedorEditar,setVerFicha} = StateGlobal();

  const columnas = ["H", "G", "F", "E", "D", "C", "B", "A"];
  const niveles = [3, 2, 1];

  const mapaUbicaciones = useMemo(() => {
    const mapa = new Map<string, Contenedor>();

    contenedores.forEach((contenedor) => {
      if (contenedor.ubicacion) {
        mapa.set(contenedor.ubicacion, contenedor);
      }
    });

    return mapa;
  }, [contenedores]);

  const botonEditar = (contenedor: Contenedor) => {
    setContenedorEditar(contenedor);
   // setTipoFormulario("camion");
  };

  return (
    <>
      {niveles.map((nivel) => (
        <React.Fragment key={nivel}>
          {/* número del nivel */}
        

          {/* columnas */}
          {columnas.map((columna) => {
            const ubicacion = `${columna}${nivel}`;
            const contenedor = mapaUbicaciones.get(ubicacion);
            
            return (
              <button
                key={ubicacion}
                onClick={() => {
                  if (contenedor) {
                    setVerFicha(true)
                    botonEditar(contenedor);
                  } else {
                    setVerFicha(false)
                    console.log("Ubicación libre:", ubicacion);
                  }
                }}
                className={`w-18 md:w-30 lg:w-32 h-20 md:h-24 rounded-lg border shadow transition hover:scale-105 cursor-pointer 
                    ${contenedor
                      ? "bg-red-500 hover:bg-red-600 text-black font-bold"
                      : "bg-green-500 hover:bg-green-600 text-white"
                     }  `}
              >
                <div className="font-bold text-xs md:text-sm lg:text-lg">
                  {ubicacion}
                </div>

                <div className="text-[10px] md:text-sm lg:text-base mt-1 px-1 break-all">
                  {contenedor
                    ? contenedor.contenedorId
                    : "LIBRE"}
                </div>
              </button>
            );
          })}
        </React.Fragment>
      ))}
      
    </>
  );
}