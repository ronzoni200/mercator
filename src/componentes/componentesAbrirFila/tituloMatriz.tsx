import { StateGlobal } from "../../hookZustand/useStorega"
import { useHelper } from "../../servicios/helperAbrirFila"
export default function TituloMatriz(){
    
    const {contenedores, filaSeleccionada} = StateGlobal()
    const {eliminarContenedoresFila} = useHelper()
    
    const borrarContenedoresDeFila=()=>{
        const confirmar = confirm(`estas seguro de eliminar todos los contenedores de la fila ${filaSeleccionada}` )
        console.log(filaSeleccionada)
        confirmar && eliminarContenedoresFila()
       
    }

    return(
        <div className="w-full max-w-6xl flex items-center justify-around mt-2 px-4">

            <button 
            type="button"
            onClick={()=>borrarContenedoresDeFila()}
            className="bg-red-500 px-4 py-2 rounded-lg border border-amber-600 text-amber-200 uppercase text-2xl cursor-pointer">salida Fila Completa</button>

            <h2 className="text-3xl font-bold text-white uppercase underline">
                Fila <span className="text-amber-200 border rounded p-2 bg-gray-700">{filaSeleccionada}</span>
            </h2>

            <div className="bg-gray-700 px-4 py-2 rounded-lg border border-amber-200">
                <span className="text-gray-300 text-sm">Cantidad</span>
                <p className="text-3xl font-bold text-amber-200 text-center">
                    {contenedores.length}
                </p>
            </div>

            
        </div>
    )
}