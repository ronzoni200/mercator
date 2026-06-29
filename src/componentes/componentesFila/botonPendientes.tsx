

type BotonPendientesProp ={
     verFormacion: boolean;
     setVerFormacion: React.Dispatch<React.SetStateAction<boolean>>
    }
export default function BotonPendientes({ verFormacion, setVerFormacion }: BotonPendientesProp){

    

    return(
        <button
          type="button"
          className={`
              border px-4 py-2 mt-2 rounded-lg font-medium
              transition-all duration-300
              ${verFormacion
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
    )
}