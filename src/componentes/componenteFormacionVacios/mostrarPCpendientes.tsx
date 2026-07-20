
import FiltrarPC from "./filtrarPC";
import FiltrarContenedores from "./filtrarContenedores";
import MostrarPCstate from "./mostrarStatePC";
import { exportarFormacion } from "../exportarExcel";
import { StateGlobal } from "../../hookZustand/useStorega";
import {useHelper} from "../../servicios/helperAbrirFila";

export default function MostrarPCpendientes() {

  const { limpiarPC, refrescarDatos } = useHelper();
  const { formacionPCvacios, setFormacionPCvacios } = StateGlobal();

  const borrarFormacion = async () => {
    if (confirm("¿Está seguro de que desea eliminar la formación?")) {
      await limpiarPC();
      setFormacionPCvacios([]);
      refrescarDatos()
    }
  }
  return (

    <div className="w-full flex flex-col border mt-2 p-2 ">
      <div className="flex justify-between items-center mb-2">
        <button type="button" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          onClick={() =>borrarFormacion()}
        >
          eliminar formacion
        </button>
        <h1 className="text-xl font-bold text-center uppercase">asignacion de contenedores vacios naviera al tren</h1>
        <button
            onClick={() => exportarFormacion(formacionPCvacios)}
            className="bg-green-600 cursor-pointer text-white px-4 py-2 rounded"
        >
    Exportar Excel
</button>

      </div>
      <div className="grid grid-cols-2">
        <FiltrarPC/>
        <FiltrarContenedores/>
      </div>
      <MostrarPCstate/>

    </div>
  );
}