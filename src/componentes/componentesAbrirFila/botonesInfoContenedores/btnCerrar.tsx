export default function BotonCerrar() {
  return (
    <button
      type="button" 
      aria-label="Cerrar" 
      className="w-10 h-10 flex border items-center justify-center rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-all  duration-200 cursor-pointer font-extrabold"
    >
      ✕
    </button>
  );
}