import AbrirFila from "./abrirFila"
import { StateGlobal } from "../hookZustand/useStorega.ts";
import FormularioIngresoCamion from "./ingresoCamion.tsx";
import IngresoTren from "./ingresoTren.tsx";
import IngresoFormacion from "./ingresoFormacion.tsx";
import MostrarPendientes from "./mostrarPendientes.tsx";
import { useEffect, useState} from "react";
import {useHelper} from "./helperAbrirFila.ts"

export default function Home() {
const {obtenerPendientes} = useHelper()
const [verFormacion, setVerFormacion] = useState(false)

  const {filaSeleccionada, 
        setFilaSeleccionada,
        formacionPendiente,
        tipoFormulario,
        setTipoFormulario,
        setFormacionPendiente
      } = StateGlobal()

  const filas = ["F1", "F2", "F3", "F4", "F5", "F6","F7", "F8", "F9", "F10", "F11", "F12", "F13", "F14", "F15", "F16", "F17", "F18", "F19", "F20",""];

    useEffect(() => {
    const cargarPendientes = async () => {
      const pendientes = await obtenerPendientes();
  
      setFormacionPendiente(pendientes)
    };
  
    cargarPendientes();
    
  }, []);

  console.log(formacionPendiente)


  return (
    <div className=" w-full p-5 ">
      <div className="flex justify-around items-center mb-10">

    
        <button 
        className="bg-blue-600 text-white py-2 px-4 rounded hover:cursor-pointer font-bold"
        onClick={() => setTipoFormulario("tren")}
        >
          Ingreso por tren
        </button>

        <button 
        className="bg-blue-600 text-white py-2 px-4 rounded hover:cursor-pointer font-bold"
        onClick={() => setTipoFormulario("formacion")}
        >
          Ingreso formacion
        </button>

        <button 
        className="bg-blue-600 text-white py-2 px-4 rounded hover:cursor-pointer font-bold"
        onClick={() => setTipoFormulario("camion")}
        >
          Ingreso por camion
        </button>

      </div>

      
      
      <div className="w-full flex gap-5 flex-wrap">
        
        {filas.map((fila) => (
          <button
            key={fila}
            className="border rounded font-bold text-3xl p-2 w-20 cursor-pointer hover:bg-blue-200"
            onClick={() =>
              setFilaSeleccionada(fila)
            }
          >
            {fila}
          </button>
        ))}
      </div>

      

        {formacionPendiente.length > 0 && 
            <button
            type="button"
            className={`
              border px-4 py-2 mt-2 rounded-lg font-medium
              transition-all duration-300
              ${
                verFormacion
                  ? "bg-amber-100 border-amber-400 animate-pulse"
                  : "bg-green-100 border-green-400"
              }
            `}
            onClick={() => setVerFormacion(prev => !prev)}
          >
            {!verFormacion
              ? "✓ Formación"
              : "⚠ Formación pendiente"}
          </button>
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

      {tipoFormulario==="tren" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded w-96">
            <IngresoTren />
          </div>
        </div>
      )}

      {tipoFormulario==="formacion" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded w-96">
            <IngresoFormacion />
          </div>
        </div>
      )}
    </div>
  );
}