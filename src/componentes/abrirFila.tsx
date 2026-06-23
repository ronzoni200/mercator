import { useEffect} from "react";
import { StateGlobal } from "../hookZustand/useStorega.ts";
import {useHelper} from "../componentes/helperAbrirFila.ts";
import type { Contenedor } from "../type/types.ts";
import dibujarUbicaciones from "./helper/crearMapa&Fila.ts"

type Props = {
  fila: string;
};


export default function AbrirFila({ fila }: Props) {

const {obtenerContenedores, formatearFecha} = useHelper();

const {contenedores, setContenedorEditar, setTipoFormulario} = StateGlobal()

  useEffect(() => {
    obtenerContenedores(); // useHelper para obtener los contenedores de la fila seleccionada
  }, [fila]);


  const mapa = dibujarUbicaciones(contenedores);

  console.log(mapa);

  const botonEditar = (contenedor: Contenedor) => {
    setContenedorEditar(contenedor);
    setTipoFormulario('camion')
  }

  const botonEgreso = (contenedor: Contenedor) => {
    console.log("Enviando contenedor:", contenedor.id);
  }

  return (
  <div className=" mt-10 p-5 flex flex-col items-center">
    <h2 className="text-2xl font-bold mb-6">
      Información de {fila}
    </h2>

    <ul className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {contenedores.map((contenedor) => (
        <li
          key={contenedor.id}
          className="bg-white shadow-md border rounded-xl p-4 flex flex-col gap-2"
        >
          <p className="uppercase break-all text-lg">
              Contenedor:
            <strong className="uppercase text-lg">
            {" "}
            {contenedor.contenedorId}
            </strong>
          </p>

          <p className="uppercase text-lg">
              Fecha de Ingreso:
            <strong className="uppercase">
            {" "}
             {formatearFecha(contenedor.fechaIngreso)}
             </strong>
          </p>

          <p className="uppercase text-lg">
              Ubicacion:
            <strong className="uppercase">
            {" "}
            {contenedor.fila} {contenedor.ubicacion}
            </strong>
          </p>

          <p className="uppercase text-lg">
            Condición:{" "}
            <strong className="uppercase">{contenedor.condicion}</strong>
          </p>

          <div className="mt-4 flex flex-col gap-2">
            <button
              onClick={() => botonEditar(contenedor)}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition hover:cursor-pointer"
            >
              EDITAR
            </button>

            <button
              onClick={() => botonEgreso(contenedor)}
              className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition hover:cursor-pointer"
            >
              EGRESO
            </button>

            <button
              className="w-full bg-yellow-500 text-white py-2 rounded-lg font-semibold hover:bg-yellow-600 transition hover:cursor-pointer"
            >
              MOVIMIENTO
            </button>
          </div>
        </li>
      ))}
    </ul>
  </div>
);
}