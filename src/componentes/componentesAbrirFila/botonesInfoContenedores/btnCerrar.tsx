import { StateGlobal } from "../../../hookZustand/useStorega";
export default function BotonCerrar() {

  const{setVerFicha}=StateGlobal()

  const ver=()=>{
    setVerFicha(false)
  }

  return (
    <button
      type="button" 
      aria-label="Cerrar" 
      className="w-10 h-10 flex border items-center justify-center rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-all  duration-200 cursor-pointer font-extrabold"
      onClick={()=>ver()}
    >
      ✕
    </button>
  );
}