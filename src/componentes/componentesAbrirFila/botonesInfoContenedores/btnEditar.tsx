import { StateGlobal } from "../../../hookZustand/useStorega"
export default function BotonEditar(){
    const {setTipoFormulario} = StateGlobal()

    const ejecutarEdicion=()=>{
        setTipoFormulario("tren")
        
    }
    
    return(
        <button 
        type="button"
        className="border rounded px-2 uppercase cursor-pointer  hover:bg-green-400 hover:font-bold transition-all  duration-200"
        onClick={()=>ejecutarEdicion()}>
            editar
        </button>
    )
}