import { StateGlobal } from "../../hookZustand/useStorega"

type BotonesFormulariosProp = {
    tipoformulario:"camion" |"formacionFull"| "formacionVacios"| null;
    nombreBoton: string
}


export default function BotonesFormularios({tipoformulario, nombreBoton}:BotonesFormulariosProp){
    
    const {setTipoFormulario} = StateGlobal()

    return(

        <button
          className="bg-blue-600 text-white py-2 px-4 rounded hover:cursor-pointer font-bold uppercase"
          onClick={() => setTipoFormulario(tipoformulario)}
        >
            {nombreBoton}
        </button>

    )
}