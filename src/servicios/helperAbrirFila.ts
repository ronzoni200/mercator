
import { StateGlobal } from "../hookZustand/useStorega.ts";
import type { Contenedor, Vagon } from "../type/types.ts";
import {useForm}  from "react-hook-form";

export const useHelper = () => {

const {setContenedores,filaSeleccionada, contenedorEditar, setContenedorEditar, tipoIngreso, setTipoFormulario, setFormacionPCvacios, setContenedoresTodos} = StateGlobal()
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

const obtenerContenedoresTodos = async () => {
  try {
    const response = await fetch(`http://localhost:3001/contenedores`);
    const data = await response.json();
    setContenedoresTodos(data);
  } catch (error) {
    console.log(error);
  }
};

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

const actualizarContenedor = async (contenedor: Contenedor) => {
  if (!contenedor.id) {
    throw new Error("El contenedor no tiene id.");
  }

  try {
    const response = await fetch(
      `http://localhost:3001/contenedores/${contenedor.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contenedor),
      }
    );

    if (!response.ok) {
      throw new Error("Error al actualizar el contenedor.");
    }

    const resultado = await response.json();

    console.log("Contenedor actualizado:");
    console.table(resultado);

    return resultado;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const actualizarPC = async (pc: Vagon) => {
  if (!pc.contenedorId) {
    throw new Error("El PC no tiene contenedor asignado.");
  }

  try {
    const response = await fetch(
      `http://localhost:3001/pc/${pc.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pc),
      }
    );

    if (!response.ok) {
      throw new Error("Error al actualizar el PC.");
    }

    const resultado = await response.json();

    console.log("PC actualizado:");
    console.table(resultado);

    return resultado;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const asignarDesdePlaya = async ( contenedor: Contenedor, pc: Vagon) => {
    
  const fechaFormateada = formatearFecha(contenedor.fechaIngreso);

  const contenedorActualizado: Contenedor = {
    ...contenedor,
    estado: "egresado",
    fechaSalida: fechaFormateada,
    salida: "tren",
    pc: pc.pc,          // <-- usar el parámetro
    fila: "",
    ubicacion: "",
  };

  const pcActualizado: Vagon = {
    ...pc,
    estado: "asignado",
    contenedorId: contenedor.contenedorId,
  };

  await actualizarContenedor(contenedorActualizado);
  await actualizarPC(pcActualizado);

  return {
    contenedor: contenedorActualizado,
    pc: pcActualizado,
  };
};

const asignarDesdeCamion = async (pcSeleccionado: Vagon, contenedorCamion: string) => {

    if (!pcSeleccionado) return;
    console.log(pcSeleccionado.pc);
    console.log(contenedorCamion);

    const pcActualizado: Vagon = {
    ...pcSeleccionado,
    estado: "asignado",
    contenedorId: contenedorCamion,
  };
    
    await actualizarPC(pcActualizado);
  };


return {asignarDesdePlaya, asignarDesdeCamion, actualizarPC, actualizarContenedor, obtenerPendientes, importarFormacion, obtenerContenedores, enviarFormulario, formatearFecha, PCvacios, obtenerPCvacios, obtenerContenedoresTodos }

    }