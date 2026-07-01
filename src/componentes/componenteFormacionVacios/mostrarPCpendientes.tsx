import {useHelper} from "../../servicios/helperAbrirFila"
import { useEffect } from "react";
import { StateGlobal } from "../../hookZustand/useStorega";

export default function MostrarPCpendientes(){

    const {obtenerPCvacios} = useHelper();
    const {formacionPCvacios} = StateGlobal();
    useEffect(() => {
         obtenerPCvacios();
        }, []);
        
        console.log(formacionPCvacios)

    return(
        <div>

        </div>
    )
}