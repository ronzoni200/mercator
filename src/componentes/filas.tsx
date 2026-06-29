import AbrirFila from "./abrirFila"
import { StateGlobal } from "../hookZustand/useStorega.ts";
import FormularioIngresoCamion from "./ingresoCamion.tsx";
import IngresoTren from "./ingresoTren.tsx";
import IngresoFormacion from "./ingresoFormacion.tsx";
import MostrarPendientes from "./mostrarPendientes.tsx";
import { useEffect, useState } from "react";
import { useHelper } from "../servicios/helperAbrirFila.ts"
import BotonesFormularios from "./componentesFila/botonesFormularios.tsx";
import BotonPendientes from "./componentesFila/botonPendientes.tsx";
import BotonesFilas from "./componentesFila/botonesFilas.tsx";

export default function Home() {

  const { obtenerPendientes } = useHelper()
  const [verFormacion, setVerFormacion] = useState(false)
  const { filaSeleccionada, formacionPendiente, tipoFormulario, setFormacionPendiente } = StateGlobal()


  const cargarPendientes = async () => {
    const pendientes = await obtenerPendientes();
    setFormacionPendiente(pendientes)
  };
 
  useEffect(() => {
    cargarPendientes();
  }, []);



  return (
    <div className=" w-full p-5 ">

      <div className="flex justify-around items-center mb-10">
        <BotonesFormularios
          tipoformulario="tren"
          nombreBoton = "ingreso tren"
        />

        <BotonesFormularios
          tipoformulario="formacion"
          nombreBoton = "Ingreso formacion"
        />

        <BotonesFormularios
          tipoformulario="camion"
          nombreBoton = "Ingreso por camion"
        />
      </div>

      <BotonesFilas/>        

      {formacionPendiente.length > 0 &&
        <BotonPendientes
          verFormacion={verFormacion }
          setVerFormacion={setVerFormacion}
        />
      }

      {formacionPendiente.length > 0 && !verFormacion && (
        <MostrarPendientes />
      )}
      
      {filaSeleccionada && (
        <AbrirFila 
        fila={filaSeleccionada} 
        />
      )}



      {tipoFormulario === "camion" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded w-96">
            <FormularioIngresoCamion />
          </div>
        </div>
      )}

      {tipoFormulario === "tren" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded w-96">
            <IngresoTren />
          </div>
        </div>
      )}

      {tipoFormulario === "formacion" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded w-96">
            <IngresoFormacion />
          </div>
        </div>
      )}
    </div>
  );
}