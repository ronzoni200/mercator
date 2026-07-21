import { StateGlobal } from "../../hookZustand/useStorega"
import { useHelper } from "../../servicios/helperAbrirFila";
import BotonCerrar from "./botonesInfoContenedores/btnCerrar";
import BotonEditar from "./botonesInfoContenedores/btnEditar";
import BotonSalida from "./botonesInfoContenedores/btnSalida";


export default function InfoContenedor(){

    const { contenedorEditar} =StateGlobal()
    const {formatearFecha} = useHelper()
    const fechaFormato = formatearFecha(contenedorEditar?.fechaIngreso)

    console.log(contenedorEditar)


return (
  <section className=" max-w-md bg-gray-900 border border-blue-500 rounded-xl shadow-lg p-4 my-2">

    <div className="flex items-center justify-between border-b border-gray-700 pb-2 mb-4">
      {/* Espacio para mantener el título centrado */}
      <div className="w-24" />

      <h3 className="flex-1 text-center text-3xl font-bold text-yellow-200 uppercase">
        {contenedorEditar?.contenedorId}
      </h3>

      <BotonCerrar />
    </div>

    <div className="space-y-2 text-gray-200 text-2xl">
      <p className="font-semibold uppercase  text-yellow-400">
          Fecha de ingreso:
        <span className=" uppercase font-bold text-white">
        {" "}  {fechaFormato}
        </span>
      </p>

      <p className="font-semibold uppercase  text-yellow-400">
          Estado:
        <span className=" uppercase font-bold text-white">
        {" "} {contenedorEditar?.condicion}
        </span>
      </p>

      <p className="font-semibold uppercase  text-yellow-400">
          Ingreso:
        <span className=" uppercase font-bold text-white">
        {" "} {contenedorEditar?.ingreso}
        </span>
      </p>

      <p className="font-semibold uppercase  text-yellow-400">
          Ubicación:
        <span className=" uppercase font-bold text-white">
        {" "} {contenedorEditar?.fila} - {contenedorEditar?.ubicacion}
        </span>
      </p>

      <div className=" flex justify-around">
        <BotonEditar/> <BotonSalida contenedorID={contenedorEditar?.contenedorId}/>
      </div>
    </div>
  </section>
);
}
// <BotonSalida contenedorID={contenedorEditar?.contenedorId}/>
