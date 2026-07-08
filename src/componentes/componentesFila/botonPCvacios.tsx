
type BotonPCvaciosProp ={
     verFormacionVacios: boolean;
     setVerFormacionVacios: React.Dispatch<React.SetStateAction<boolean>>
    }
export default function BotonPCvacios({ verFormacionVacios, setVerFormacionVacios }: BotonPCvaciosProp){


    return(
        <button
          type="button"
          className={`
              border px-4 py-2 mt-2 rounded font-medium max-w-xl
              transition-all duration-300
              ${verFormacionVacios
              ? "bg-amber-100 border-amber-400 animate-pulse"
              : "bg-green-100 border-green-400"
            }
            `}
          onClick={() => setVerFormacionVacios(prev => !prev)}
        >
          {!verFormacionVacios
            ? "✓ Formación VACIOS Ubicaciones"
            : "⚠ Formación VACIOS pendiente"}
        </button>
    )
}