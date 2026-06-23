import { StateGlobal } from "../../hookZustand/useStorega"

export default function BotonesFilas(){

    const filas = ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "F13", "F14", "F15", "F16", "F17", "F18", "F19", "F20", ""];
    const {setFilaSeleccionada} = StateGlobal()

    return(
         <div className="w-full flex gap-5 flex-wrap">

        {filas.map((fila) => (
          <button
            key={fila}
            className="border rounded font-bold text-3xl p-2 w-20 cursor-pointer hover:bg-blue-200"
            onClick={() =>
              setFilaSeleccionada(fila)
            }
          >
            {fila}
          </button>
        ))}
      </div>
    )
}