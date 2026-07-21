import { useHelper } from "../../../servicios/helperAbrirFila"


type salidaDePlayaProp = {
    contenedorID: string | undefined
}
export default function BotonSalida({ contenedorID }: salidaDePlayaProp){

 const {eliminarUnContenedor} = useHelper()

    const salidaDePlaya = ()=>{
       if (!contenedorID) return;
            console.log(contenedorID)
       eliminarUnContenedor(contenedorID)
    }
    return(
        <button 
        type="button" 
        onClick={()=>salidaDePlaya()}
        className="border rounded px-2 uppercase cursor-pointer  hover:bg-blue-400 hover:font-bold transition-all  duration-200">
            salida
        </button>
    )
}