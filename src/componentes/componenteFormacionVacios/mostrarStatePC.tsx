import { StateGlobal } from "../../hookZustand/useStorega";

export default function MostrarPCstate() {
const{formacionPCvacios, setPCseleccionado, pcSeleccionado } = StateGlobal()

return (
  <div className="flex flex-wrap gap-2">
    {formacionPCvacios.map((pc) => (
      <div
        key={pc.id}
        onClick={() => {
          if (pc.estado === "pendiente") {
            setPCseleccionado(pc);
          }
        }}
        className={`shadow p-2 my-1 w-3xs text-center transition-all duration-300 ${
          pc.estado === "pendiente"
            ? "bg-yellow-100 border-l-8 border-yellow-500 cursor-pointer hover:bg-yellow-200 hover:shadow-lg"
            : "bg-green-100 border-l-8 border-green-600 cursor-default opacity-70"
        } ${
          pcSeleccionado?.id === pc.id
            ? "ring-4 ring-blue-500"
            : ""
        }`}
      >
        <h2 className="text-lg font-bold">
          PC {pc.pc}
        </h2>

        <p className="text-lg font-bold">
          {pc.contenedorId || "Sin asignar"}
        </p>
      </div>
    ))}
  </div>
);
}