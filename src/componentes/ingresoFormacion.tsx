import { useState, useEffect } from "react";
import { StateGlobal } from "../hookZustand/useStorega.ts";
import type { Contenedor } from "../type/types.ts";
import {useHelper} from "../servicios/helperAbrirFila.ts"

export default function IngresoFormacion() {
  const [textoIngresado, setTextoIngresado] = useState("");
  const {importarFormacion} = useHelper()
  const { formacionPendiente, setTipoFormulario} = StateGlobal();

  useEffect(() => {
    console.log("Formación procesada:", formacionPendiente);
  }, [formacionPendiente]);

  const procesarLista = () => {
    const listaProcesada = textoIngresado
      .split("\n")               // separa por líneas
      .map((item) => item.trim()) // elimina espacios
      .map((item) => item.toUpperCase()) // pasa a mayúsculas
      .filter((item) => item !== ""); // elimina líneas vacías

      const contenedoresProcesados: Contenedor[] =

        listaProcesada.map((contenedorId) => ({
            contenedorId: contenedorId,
            ubicacion: "", // La ubicación se asignará posteriormente
            fila: "", // La fila se asignará posteriormente
            condicion: "full", // La condición se asignará posteriormente
            estado: "pendiente",
            ingreso: "tren",
            salida: "", // La salida se asignará posteriormente
            fechaIngreso: new Date().toISOString().split("T")[0],
            fechaSalida:''
        }));

            importarFormacion(contenedoresProcesados);
        };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Ingreso por formación
        <button
          className="bg-red-600 text-white py-1 px-1 rounded hover:cursor-pointer font-bold uppercase ml-4"
          onClick={() => setTipoFormulario(null)}
        >
          X
        </button>
      </h1>

      <textarea
        value={textoIngresado}
        onChange={(e) => setTextoIngresado(e.target.value)}
        className="w-full h-40 border p-2 rounded mb-4"
        placeholder={`CMAU9864137`}
            />

        <div className="flex justify-between">
            <button
                onClick={procesarLista}
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Procesar Lista
            </button>


        </div>

    </div>
  );
}