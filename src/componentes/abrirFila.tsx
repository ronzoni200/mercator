import { useEffect } from "react";
import { useHelper } from "../servicios/helperAbrirFila.ts";
import MatrizAbrirFila from "./componentesAbrirFila/matriz.tsx";
import InfoContenedor from "./componentesAbrirFila/infoContenedor.tsx";
import { StateGlobal } from "../hookZustand/useStorega.ts";
import TituloMatriz from "./componentesAbrirFila/tituloMatriz.tsx";

type Props = {
  fila: string;
};

export default function AbrirFila({ fila }: Props) {
  const { obtenerContenedores } = useHelper();
  const {verFicha, contenedorEditar} = StateGlobal()

  useEffect(() => {
    obtenerContenedores();
  }, [fila, contenedorEditar]);

  return (
    <div className="mt-8 py-5 flex flex-col items-center w-full bg-gray-800">

      <TituloMatriz/>

      {verFicha && 
        <InfoContenedor/>
      }

      <div className="w-full overflow-x-auto px-2">          
        <div className="grid grid-cols-8 grid-rows-3 gap-2 w-full p-2 min-w-[850px] lg:min-w-[1350px]">
          {/* filas matriz */}
          <MatrizAbrirFila />
        </div>
      </div>

      

      {/* Leyenda */}
      <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-6 md:mt-8">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 md:w-5 md:h-5 bg-green-500 rounded"></div>
          <span className="text-sm md:text-base text-blue-400">
            Libre
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 md:w-5 md:h-5 bg-red-500 rounded"></div>
          <span className="text-sm md:text-base text-blue-400">
            Ocupado
          </span>
        </div>
      </div>
      
    </div>
  );
}