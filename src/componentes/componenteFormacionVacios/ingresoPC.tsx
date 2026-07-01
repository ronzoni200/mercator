

import { useState, useEffect } from "react";
import { StateGlobal } from "../../hookZustand/useStorega";
import type { Vagon } from "../../type/types";
import { useHelper } from "../../servicios/helperAbrirFila";

export default function IngresoPC(){


  const [textoIngresado, setTextoIngresado] = useState("");
  const {PCvacios} = useHelper()
  const {setTipoFormulario, setFormacionPCvacios, formacionPCvacios} = StateGlobal();


  const procesarLista = () => {const listaProcesada = textoIngresado
  .split("\n")
  .map(item => item.trim())
  .filter(item => /^\d+$/.test(item))
  .map(Number);

      const formacionProcesados: Vagon[] =

        listaProcesada.map((pc) => ({
            id: "",
            pc: pc,
            contenedorId: "",
            estado:"pendiente"
        }));
        setFormacionPCvacios(formacionProcesados)
           PCvacios(formacionProcesados);
           setTextoIngresado("");
           console.log("formacionPCvacios", formacionPCvacios);
        };
    return(
    <div className="max-w-xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">
            PC vacios
            <button
            className="bg-red-600 text-white py-1 px-1 rounded hover:cursor-pointer font-bold uppercase ml-4"
           // onClick={() => setTipoFormulario(null)}
            >
            X
            </button>
        </h1>

      <textarea
        value={textoIngresado}
        onChange={(e) => setTextoIngresado(e.target.value)}
        className="w-full h-40 border p-2 rounded mb-4"
        placeholder={`982541`}
            />

        <div className="flex justify-between">
            <button
                onClick={procesarLista}
                className="bg-blue-600 text-white px-4 py-2 rounded"
                type="button"
            >
                Procesar vagones
            </button>
        </div>
    </div>
    )
}

/*
const PCvacios = async (vagones: Vagon[]) => {
  try {
    const respuestas = await Promise.all(
      vagones.map(async (pc) => {
        const response = await fetch(
          "http://localhost:3001/pc",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...pc,
              id: crypto.randomUUID(),
            }),
          }
        );
        return response.json();
      })
    );

    console.log("Formación importada:");
    console.table(respuestas);

    return respuestas;
  } catch (error) {
    console.error("Error al importar la formación:", error);
  }
};

*/