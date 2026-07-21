
import { useEffect } from "react";
import { StateGlobal } from "../../hookZustand/useStorega.ts";
import {useForm}  from "react-hook-form";
import { useHelper } from "../../servicios/helperAbrirFila.ts";


export default function ModificarContenedor(){

    type FormModificarContenedor = {
  contenedorId: string;
};

const {contenedorEditar, setContenedorEditar, setTipoIngreso, setTipoFormulario, numeroDeContenedor} = StateGlobal()        
const {register, handleSubmit, formState:{errors}, reset, setValue } = useForm<FormModificarContenedor>();
const {modificarConte} = useHelper();

useEffect(() => {
    setValue("contenedorId", numeroDeContenedor ?? "");
    console.log(numeroDeContenedor);
}, [numeroDeContenedor, setValue]);



const cerrarFormulario = () => {
  setTipoIngreso("");
  setContenedorEditar(null);
  reset();
  setTipoFormulario(null)
}

    return(
        <form 
      noValidate
      onSubmit={handleSubmit(modificarConte)}
      className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md flex flex-col gap-4"
    >
      <h2 className="text-2xl font-bold">Carga de Contenedor 1</h2>
            <button 
            type="button"
            className="bg-red-600 text-white py-1 px-3 rounded hover:cursor-pointer font-bold uppercase self-end"
            onClick={() => cerrarFormulario()}
            >Cerrar
            </button>

          {/* contenedor */}
            <div>
                <label className="block mb-1 font-medium">Número de Contenedor</label>
                <input
                type="text"
                placeholder="CMAU1234567"
                className="w-full border p-2 rounded uppercase"
                {...register("contenedorId", {
                setValueAs: (value) => value?.toUpperCase(),
                required: "El número de contenedor es obligatorio",
                pattern: {
                    value: /^[A-Za-z]{3}[Uu]\d{7}$/,
                    message: "Formato Ej: CMAU9857520",
                },
                })}
                />
                {errors.contenedorId && (
                <span className="text-red-500 text-sm">
                    {errors.contenedorId.message}
                </span>
                )}
            </div>

                <button
            type="submit"
            className={`text-white py-2 rounded font-semibold transition-colors ${
                contenedorEditar
                ? "bg-green-600 hover:bg-green-700"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            >
            {contenedorEditar ? "Actualizar" : "Guardar"}
            </button>
    </form>
    )
}