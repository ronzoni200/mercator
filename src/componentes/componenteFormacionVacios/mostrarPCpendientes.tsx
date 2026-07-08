
import FiltrarPC from "./filtrarPC";
import FiltrarContenedores from "./filtrarContenedores";
import MostrarPCstate from "./mostrarStatePC";

export default function MostrarPCpendientes() {

  return (

    <div className="w-full flex flex-col border mt-2 p-2 ">
        <h1 className="text-xl font-bold text-center uppercase">asignacion de contenedores vacios naviera al tren</h1>
      <div className="grid grid-cols-2">
        <FiltrarPC/>
        <FiltrarContenedores/>
      </div>
      <MostrarPCstate/>

    </div>
  );
}