import { useMemo, useState } from "react";
import { StateGlobal } from "../../hookZustand/useStorega";

export default function FiltrarPC(){

  const [buscarPC, setBuscarPC] = useState("");
    const {formacionPCvacios, pcSeleccionado, setPCseleccionado} = StateGlobal();


   

      const pcsFiltrados = useMemo(() => {
        if (!buscarPC) return [];
        return formacionPCvacios.filter(v =>
          v.estado === "pendiente" &&
          v.pc.toString().endsWith(buscarPC)
        );
      }, [buscarPC, formacionPCvacios]);

    return(
                     <div className="bg-white rounded-xl shadow p-5">
        <h2 className="text-xl font-bold mb-4">
          Buscar PC
        </h2>

        <input
          className="border rounded w-full p-2"
          placeholder="245..."
          value={buscarPC}
          onChange={(e) => setBuscarPC(e.target.value)}
        />

        <div className="mt-4 space-y-2 overflow-auto">
          {pcsFiltrados.map((pc) => (
              <button
                key={pc.pc}
                onClick={() => setPCseleccionado(pc)}
                className={`w-full border rounded-lg p-3 transition-all duration-200 flex justify-between items-center
                    ${pc.estado === "pendiente"
                    ? "bg-yellow-50 border-yellow-400 hover:bg-yellow-100"
                    : "bg-green-50 border-green-500 hover:bg-green-100"
                  }
                    ${pcSeleccionado?.pc === pc.pc
                    ? "ring-2 ring-blue-500"
                    : ""
                  }
                `}
              >
                <span className="font-bold">PC {pc.pc}</span>

                <span className="font-semibold">
                  {pc.estado === "pendiente" ? "🟡 Pendiente" : "🟢 Asignado"}
                </span>
              </button>
            ))
          }
        </div>
      </div>
    )
}