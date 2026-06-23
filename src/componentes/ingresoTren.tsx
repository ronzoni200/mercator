

import { StateGlobal } from "../hookZustand/useStorega.ts";
import type { Contenedor } from "../type/types.ts";
import {useForm}  from "react-hook-form";
import { useEffect } from "react";
import { useHelper } from "../servicios/helperAbrirFila.ts";

export default function IngresoTren() {
  const {contenedorEditar, setContenedorEditar, setTipoIngreso, setTipoFormulario} = StateGlobal()
  const {register, handleSubmit, formState: { errors }, reset } = useForm<Contenedor>();

const {enviarFormulario} = useHelper();


useEffect(() => {


  if (contenedorEditar) 
      {reset(contenedorEditar)}
  setTipoIngreso("tren");
}, [contenedorEditar, reset]);
  
const cerrarFormulario = () => {
  setTipoIngreso("");
  setContenedorEditar(null);
  reset();
  setTipoFormulario(null)
}

  return (
        <form 
      noValidate
      onSubmit={handleSubmit(enviarFormulario)}
      className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md flex flex-col gap-4"
    >
      <h2 className="text-2xl font-bold">Carga de Contenedor</h2>
    <button 
    className="bg-red-600 text-white py-1 px-3 rounded hover:cursor-pointer font-bold uppercase self-end"
      onClick={() => cerrarFormulario()}
      >Cerrar
    </button>

    
 {/* ENTRADA */}
 {contenedorEditar && 
  <div>
        <label className="block mb-1 font-medium">Entrada</label>
        <select
          className="w-full border p-2 rounded"
          {...register("ingreso", {
            required: "Este campo es obligatorio",
          })}
        >

          <option value="">Seleccione</option>
          <option value="camion">Camión</option>
          <option value="tren">Tren</option>
        </select>
        {errors.ingreso && (
          <span className="text-red-500 text-sm">
            {errors.ingreso.message}
          </span>
        )}
      </div> 

 }
      

            {/* ESTADO */}
     {contenedorEditar &&
      <div>
        <label className="block mb-1 font-medium">Condición</label>
        
       <select
          className="w-full border p-2 rounded"
          {...register("condicion", {
            required: "Este campo es obligatorio",
          })}
        >
        
            <option value="">Seleccione</option>
            <option value="full">Full</option>
            <option value="vacio naviera">Vacío Naviera</option>
            <option value="vacio alquilado">Vacío Alquilado</option>
            <option value="full trasbasado">Full Trasbasado</option>
      </select>

      {errors.condicion && (
          <p className="text-red-500 text-sm">
            {errors.condicion.message}
          </p>
        )}
      </div>}


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

      {/* FILA */}
      <div>
        <label className="block mb-1 font-medium">Fila</label>
        <select
          className="w-full border p-2 rounded"
          {...register("fila",{
            required:true
          })}
        >
         
            <option value="">Seleccione</option>
            <option value="camion">por camion</option>
            <option value="F1">F1</option>
            <option value="F2">F2</option>
            <option value="F3">F3</option>
            <option value="F4">F4</option>
            <option value="F5">F5</option>
            <option value="F6">F6</option>
            <option value="F7">F7</option>
            <option value="F8">F8</option>
            <option value="F9">F9</option>
            <option value="F10">F10</option>
            <option value="F11">F11</option>
            <option value="F12">F12</option>
            <option value="F13">F13</option>
            <option value="F14">F14</option>
            <option value="F15">F15</option>
            <option value="F16">F16</option>
            <option value="F17">F17</option>
            <option value="F18">F18</option>
            <option value="F19">F19</option>
            <option value="F20">F20</option>

        </select>

         {errors.fila && (
            <p className="text-red-500 text-sm">
              {errors.fila.message}
            </p>
          )}
      </div>

      {/* UBICACION */}
        <div>
          <label className="block mb-1 font-medium">Ubicación</label>
          <input
            type="text"
            placeholder="A2"
            className="w-full border p-2 rounded uppercase"
            {...register("ubicacion", {
              required: "Este campo es obligatorio",
              setValueAs: (value) => value?.toUpperCase()
            })}
          />
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
  );
}