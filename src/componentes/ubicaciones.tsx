import { StateGlobal } from "../hookZustand/useStorega";
import type { Posiciones, Ubicacion } from "../type/types";

type Props = {
  fila: string | undefined;
  mapa: Posiciones;
  onSeleccionar: (ubicacion: Ubicacion) => void;
};


export default function PlanoFila({ mapa, onSeleccionar,}: Props) {
  
  const {filaSeleccionada} = StateGlobal()
  const columnas = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const niveles = [3, 2, 1]; // de arriba hacia abajo (más visual)

  return (
    <div className="w-full mt-6">
      
      <h3 className="text-xl font-bold mb-4 text-center">
        Fila {filaSeleccionada}
      </h3>

      <div className="flex flex-col gap-2 items-center">
        {niveles.map((nivel) => (
          <div key={nivel} className="flex gap-2">
            {columnas.map((columna) => {

              const key = `${columna}${nivel}` as Ubicacion;
              const contenedor = mapa[key];

              const ocupado = !!contenedor;

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => onSeleccionar(key)}
                  className={`
                    w-14 h-14 rounded font-bold text-xs border transition
                    ${ocupado
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "bg-green-500 text-white hover:bg-green-600"
                    }
                  `}
                >
                  {ocupado ? contenedor?.contenedorId.slice(-4) : key}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}