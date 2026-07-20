import { useMemo, useState } from "react";
import { StateGlobal } from "../../hookZustand/useStorega";
import { useHelper } from "../../servicios/helperAbrirFila";
import type { Contenedor, Vagon } from "../../type/types";

export default function FiltrarContenedores() {

  const { contenedoresTodos, pcSeleccionado } = StateGlobal();
  const { asignarDesdePlaya, asignarDesdeCamion, refrescarDatos } = useHelper();

  const [buscarContenedor, setBuscarContenedor] = useState("");
  const [contenedorCamion, setContenedorCamion] = useState("");
  const [errorContenedor, setErrorContenedor] = useState("");

  const regexContenedor = /^[A-Za-z]{3}[Uu]\d{7}$/;

  const contenedoresFiltrados = useMemo(() => {
    if (!buscarContenedor) return [];
    return contenedoresTodos.filter(
      (c) =>
        c.estado === "ubicado" &&
        c.condicion === "vacio naviera" &&
        c.contenedorId.includes(buscarContenedor.toUpperCase())
    );
  }, [buscarContenedor, contenedoresTodos]);

  const AsignarDePlaya = async (contenedor: Contenedor) => {
    if (!pcSeleccionado) return;
    await asignarDesdePlaya(contenedor, pcSeleccionado);
    setBuscarContenedor("");

  };

  const asignarDeCamion = async (pc: Vagon, contenedorId: string) => {
    if (!regexContenedor.test(contenedorId)) {
      setErrorContenedor("Formato válido: CMAU1234567");
      return;
    }

    setErrorContenedor("");

    await asignarDesdeCamion(pc, contenedorId);
    setContenedorCamion("");
    refrescarDatos()
  };
  

  return (
    <div className="bg-white rounded-xl shadow p-5">
      {!pcSeleccionado ? (
        <div className="text-center text-gray-400 mt-20">
          Seleccione un PC
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-center">
            PC: {pcSeleccionado.pc}
          </h2>

          <hr className="mb-6" />

          <h3 className="font-bold mb-3">
            Buscar en playa
          </h3>

          <input
            className="border rounded w-full p-2"
            placeholder="CMAU..."
            value={buscarContenedor}
            onChange={(e) =>
              setBuscarContenedor(e.target.value.toUpperCase())
            }
          />

          <div className="space-y-2 mt-4">
            {contenedoresFiltrados.map((contenedor) => (
              <div
                key={contenedor.contenedorId}
                className="border rounded p-3 flex justify-between items-center"
              >
                <div>
                  <strong>{contenedor.contenedorId}</strong>
                  <p>
                    {contenedor.fila} - {contenedor.ubicacion}
                  </p>
                </div>

                <button
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  onClick={() => AsignarDePlaya(contenedor)}
                >
                  Asignar
                </button>
              </div>
            ))}
          </div>

          <hr className="my-6" />

          <h3 className="font-bold mb-3">
            Vino por camión
          </h3>

          <input
            className={`border rounded w-full p-2 uppercase ${
              errorContenedor
                ? "border-red-500 focus:border-red-500"
                : ""
            }`}
            placeholder="CMAU1234567"
            value={contenedorCamion}
            onChange={(e) => {
              const valor = e.target.value.toUpperCase();

              setContenedorCamion(valor);

              if (valor === "") {
                setErrorContenedor("");
              } else if (!regexContenedor.test(valor)) {
                setErrorContenedor("Formato válido: CMAU1234567");
              } else {
                setErrorContenedor("");
              }
            }}
          />

          {errorContenedor && (
            <p className="text-red-500 text-sm mt-1">
              {errorContenedor}
            </p>
          )}

          <button
            className="bg-blue-600 text-white rounded w-full py-2 mt-4 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={!regexContenedor.test(contenedorCamion)}
            onClick={() =>
              asignarDeCamion(pcSeleccionado, contenedorCamion)
            }
          >
            Asignar desde camión
          </button>
        </>
      )}
    </div>
  );
}