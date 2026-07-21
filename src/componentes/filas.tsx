import AbrirFila from "./abrirFila"
import { StateGlobal } from "../hookZustand/useStorega.ts";
import FormularioIngresoCamion from "./ingresoCamion.tsx";
import IngresoFormacion from "./ingresoFormacion.tsx";
import MostrarPendientes from "./mostrarPendientes.tsx";
import { useEffect, useState } from "react";
import { useHelper } from "../servicios/helperAbrirFila.ts"
import BotonesFormularios from "./componentesFila/botonesFormularios.tsx";
import BotonPendientes from "./componentesFila/botonPendientes.tsx";
import BotonesFilas from "./componentesFila/botonesFilas.tsx";
import IngresoPC from "./componenteFormacionVacios/ingresoPC.tsx";
import MostrarPCpendientes from "./componenteFormacionVacios/mostrarPCpendientes.tsx";
import IngresoTren from "../componentes/ingresoTren.tsx";
import BotonPCvacios from "./componentesFila/botonPCvacios.tsx";
import ReubiarContenedor from "./componenteFormacionVacios/reubicarContenedor.tsx";
import ModificarContenedor from "./componenteFormacionVacios/modificarContenedor.tsx";


export default function Home() {

  const { refrescarDatos } = useHelper()
  const [verFormacion, setVerFormacion] = useState(false)
  const [verFormacionVacios, setVerFormacionVacios] = useState(false)
  const { filaSeleccionada, formacionPendiente, tipoFormulario, formacionPCvacios, contenedores} = StateGlobal()

 
 
  useEffect(() => {
  refrescarDatos()
  }, [contenedores]);

console.log("fila")
  return (
    <div className=" w-full p-5 ">

      <div className="flex justify-around items-center mb-10">

        <BotonesFormularios
          tipoformulario="formacionVacios"
          nombreBoton = "formacion vacios"
        />

        <BotonesFormularios
          tipoformulario="formacionFull"
          nombreBoton = "formacion Full"
        />

        

        <BotonesFormularios
          tipoformulario="camion"
          nombreBoton = "Ingreso por camion"
        />

        
      </div>


      <BotonesFilas/>  
      <div className="flex flex-col mt-4">

      {formacionPCvacios.length > 0 && 
      <BotonPCvacios 
        verFormacionVacios={verFormacionVacios}
        setVerFormacionVacios={setVerFormacionVacios}
      />}

      {formacionPCvacios.length > 0 &&
       !verFormacionVacios &&
        <MostrarPCpendientes/>}   
      

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
      </div>



      {tipoFormulario === "camion" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded w-96">
            <FormularioIngresoCamion />
          </div>
        </div>
      )}

      {tipoFormulario === "reubicarContenedor" &&  (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded w-96">
            <ReubiarContenedor />
          </div>
        </div>
      )}

      {tipoFormulario === "editarNumeroContenedor" &&  (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded w-96">
            <ModificarContenedor />
          </div>
        </div>
      )}

      {tipoFormulario === "formacionFull" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded w-96">
            <IngresoFormacion />
          </div>
        </div>
      )}

      {tipoFormulario === "formacionVacios" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded w-96">
            <IngresoPC/>
          </div>
        </div>
      )}

      {tipoFormulario === "tren" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded w-96">
            <IngresoTren/>
          </div>
        </div>
      )}
    </div>
  );
}