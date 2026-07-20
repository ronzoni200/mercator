import { StateGlobal } from "../../hookZustand/useStorega";

export default function MostrarPCstate() {
const{formacionPCvacios, setPCseleccionado, pcSeleccionado } = StateGlobal()

return (
  <div className="flex flex-wrap gap-3">
    {formacionPCvacios.map((pc) => (
      <div
        key={pc.pc}
        onClick={() => {
          if (pc.estado === "pendiente") {
            setPCseleccionado(pc);
          }
        }}
        className={`w-full md:w-[420px] shadow rounded-lg border-l-8 p-3 transition-all duration-300
        ${
          pc.estado === "pendiente"
            ? "bg-yellow-100 border-yellow-500 cursor-pointer hover:bg-yellow-200 hover:shadow-lg"
            : "bg-green-100 border-green-600"
        }
        ${
          pcSeleccionado?.pc === pc.pc
            ? "ring-4 ring-blue-500"
            : ""
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          {/* Información */}
          <div className="flex-1 text-center">
            <h2 className="text-xl font-bold">
              PC {pc.pc}
            </h2>

            <p className="text-lg font-semibold break-all">
              {pc.contenedorId || "Sin asignar"}
            </p>

            <p
              className={`mt-1 font-bold ${
                pc.estado === "pendiente"
                  ? "text-yellow-700"
                  : "text-green-700"
              }`}
            >
              {pc.estado === "pendiente"
                ? "🟡 Pendiente"
                : "🟢 Asignado"}
            </p>
          </div>

          {/* Botones */}
          <div
            className="flex flex-col gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="px-4 py-2 rounded bg-orange-600 text-white hover:bg-orange-700 font-semibold whitespace-nowrap"
            >
              ✏️ Editar
            </button>

            <button
              type="button"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 font-semibold whitespace-nowrap"
            >
              📍 Reubicar
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
);
}