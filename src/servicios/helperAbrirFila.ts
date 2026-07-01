
import { StateGlobal } from "../hookZustand/useStorega.ts";
import type { Contenedor, Vagon } from "../type/types.ts";
import {useForm}  from "react-hook-form";

export const useHelper = () => {

const {setContenedores,filaSeleccionada, contenedorEditar, setContenedorEditar, tipoIngreso, setTipoFormulario, setFormacionPCvacios} = StateGlobal()
const { reset} = useForm<Contenedor>();
// Función para obtener los contenedores de la fila seleccionada
 
const obtenerPCvacios = async () => {
  try{
    const response = await fetch(
      `http://localhost:3001/pc`
    );
    const data = await response.json();
    setFormacionPCvacios(data)
  }catch(error){
    console.log(error)
  }
}


const obtenerContenedores = async () => {


      try {
        const response = await fetch(
          `http://localhost:3001/contenedores?fila=${filaSeleccionada}`
        );
        const data = await response.json();
        setContenedores(data);
      } catch (error) {
        console.log(error);
      }
    };


    // funcion que edita o crea un contenedor
 const enviarFormulario = async (data: Contenedor) => {

  try {

    let response;

    if (contenedorEditar?.id !== undefined) {
      console.log("Actualizando:", data);

      const actualizado = {
        ...data,
        estado: "ubicado"
      }

      response = await fetch(
        `http://localhost:3001/contenedores/${contenedorEditar.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...actualizado,
            id: contenedorEditar.id,
          }),
        }
      );

    } else {
      
   
const dataFinal = {
  ...data,
  ingreso: tipoIngreso,
  estado: "ubicado",
  fechaIngreso: new Date().toISOString().split("T")[0],
};


if (tipoIngreso === "tren") {
  dataFinal.condicion = "full";
}
      console.log("Creando:", dataFinal);

      response = await fetch(
        "http://localhost:3001/contenedores",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataFinal),
        }
      );
    }

    const resultado = await response.json();

    console.log("Respuesta:", resultado);

    reset();
    setContenedorEditar(null);
    setTipoFormulario(null)

  } catch (error) {
    console.log(error);
  }
};

const importarFormacion = async (formacion: Contenedor[]) => {
  try {
    const respuestas = await Promise.all(
      formacion.map(async (contenedor) => {
        const response = await fetch(
          "http://localhost:3001/contenedores",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...contenedor,
              id: crypto.randomUUID(),
            }),
          }
        );

        return response.json();
      })
    );

    console.log("Formación importada:");
    console.table(respuestas);

    return respuestas;
  } catch (error) {
    console.error("Error al importar la formación:", error);
  }
};

const obtenerPendientes = async () => {
  try {
    const response = await fetch(
      "http://localhost:3001/contenedores?estado=pendiente"
    );

    const resultado: Contenedor[] = await response.json();

    return resultado;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const formatearFecha = (fecha: string | undefined): string => {
  if (!fecha) return "";

  const fechaObj = new Date(fecha);

  return fechaObj.toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
  });
};

const PCvacios = async (vagones: Vagon[]) => {
  try {
    const respuestas = await Promise.all(
      vagones.map(async (pc) => {
        const response = await fetch(
          "http://localhost:3001/pc",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...pc,
              id: crypto.randomUUID(),
            }),
          }
        );
        return response.json();
      })
    );

    console.log("Formación importada:");
    console.table(respuestas);

    return respuestas;
  } catch (error) {
    console.error("Error al importar la formación:", error);
  }
};



    return{obtenerPendientes, importarFormacion,obtenerContenedores, enviarFormulario, formatearFecha, PCvacios, obtenerPCvacios}

    }