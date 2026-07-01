import { StateGlobal } from "../hookZustand/useStorega.ts";
import type { Contenedor } from "../type/types.ts";
import { useState } from "react";

export default function MostrarPendientes() {
  const [busqueda, setBusqueda] = useState("");
  const { formacionPendiente, setContenedorEditar, setTipoFormulario } = StateGlobal();
  
  const agregarUbicacion = (contenedor: Contenedor) => {
      console.log(contenedor)
      setContenedorEditar(contenedor);
      setTipoFormulario('tren')
    }
  const pendientesFiltrados = formacionPendiente.filter((contenedor) => {
  const busquedaNormalizada = busqueda.trim().toUpperCase();
  const contenedorId = contenedor.contenedorId.toUpperCase();

  const soloNumeros = /^\d+$/.test(busquedaNormalizada);
    return soloNumeros
      ? contenedorId.endsWith(busquedaNormalizada)
      : contenedorId.includes(busquedaNormalizada);
  });


  return (
    <div className="max-w-7xl mx-auto p-4 border rounded-2xl mt-8">
      <h1 className="text-3xl font-bold mb-6 text-center underline mt-2 uppercase">
        formacion full Pendiente
      </h1>


      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <p className="text-2xl font-semibold text-red-600">
          Total: <span>{formacionPendiente.length}</span>
        </p>

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="🔍 Buscar contenedor..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value.toUpperCase())}
            className="border border-gray-300 rounded-lg px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="button"
            onClick={() => setBusqueda("")}
            className="bg-gray-200 hover:bg-gray-300 rounded-lg px-3 py-2 transition font-semibold"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {pendientesFiltrados.map((contenedor) => (
        <div
          key={contenedor.contenedorId}
          className="bg-white border rounded-lg p-2 flex items-center justify-between gap-2"
        >
          <div className="min-w-0">
            <p className="font-semibold text-lg truncate">
              {contenedor.contenedorId}
            </p>
          </div>

          <button
            className="shrink-0 bg-blue-600 text-white px-3 py-1 text-xs rounded"
            onClick={() => agregarUbicacion(contenedor)}
          >
            Ubicar
          </button>
        </div>
        ))}
      </div>
    </div>
  );
}

/*
CMAU9864137
MSCU1234567
TGHU7654321
APZU4567890
OOLU9876543
SEGU1122334

*/