
import { StateGlobal } from "../hookZustand/useStorega.ts";
import type { Contenedor, Vagon } from "../type/types.ts";
import {useForm}  from "react-hook-form";
import { collection, query, where, getDocs, updateDoc, doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/config"; // ajustá la ruta
export const useHelper = () => {

const {setContenedores,filaSeleccionada, contenedorEditar, setContenedorEditar, tipoIngreso, setTipoFormulario, setFormacionPCvacios, setContenedoresTodos, setFormacionPendiente, setVerFicha, pcSeleccionado, numeroDePc} = StateGlobal()
const { reset} = useForm<Contenedor>();
// Función para obtener los contenedores de la fila seleccionada

const cargarPendientes = async () => {
    const pendientes = await obtenerPendientes();
    setFormacionPendiente(pendientes)
  };
 
const refrescarDatos = async () => {
  await Promise.all([
    cargarPendientes(),
    obtenerPCvacios(),
    obtenerContenedoresTodos(),
    
  ]);
};

  const obtenerPCvacios = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "egresoFormacion"));

    const data: Vagon[] = querySnapshot.docs.map((doc) => ({
      ...(doc.data() as Vagon),
      pc: Number(doc.id),
    }));

    setFormacionPCvacios(data);
    

  } catch (error) {
    console.error(error);
  }
};

const limpiarPC = async () => {
  try {
    const querySnapshot = await getDocs(
      collection(db, "egresoFormacion")
    );

    await Promise.all(
      querySnapshot.docs.map((documento) =>
        deleteDoc(doc(db, "egresoFormacion", documento.id))
      )
    );

    console.log("Formación eliminada correctamente");
    
  } catch (error) {
    console.error("Error al eliminar la formación:", error);
  }
};

// Función traspasada para obtener todos los contenedores
const obtenerContenedoresTodos = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "contenedores"));
    const data: Contenedor[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Contenedor, "id">),
    }));
    setContenedoresTodos(data);
  } catch (error) {
    console.error(error);
  }};

// funcion traspasada para obtener los contenedores de la fila seleccionada
    const obtenerContenedores = async () => {
  try {
    const q = query(
      collection(db, "contenedores"),
      where("fila", "==", filaSeleccionada)
    );

    const querySnapshot = await getDocs(q);

    const data: Contenedor[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Contenedor, "id">),
    }));

    setContenedores(data);
    
  } catch (error) {
    console.error(error);
  }
};

const actualizarContenedor = async (contenedor: Contenedor) => {
  if (!contenedor.contenedorId) {
    throw new Error("El contenedor no tiene contenedorId.");
  }

  try {
    const { contenedorId, ...datosActualizar } = contenedor;

    await updateDoc(
      doc(db, "contenedores", contenedorId),
      datosActualizar
    );

    console.log("Contenedor actualizado:", contenedorId);
    
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const enviarFormulario = async (data: Contenedor) => {
  try {
    if (contenedorEditar?.contenedorId) {
      console.log("Actualizando:", data);

      const actualizado = {
        ...data,
        estado: "ubicado",
      };

      await setDoc(
        doc(db, "contenedores", actualizado.contenedorId),
        actualizado
      );

      await deleteDoc(
        doc(db, "ingresoFormacion", actualizado.contenedorId)
      );

      setVerFicha(false);

console.log("Contenedor movido a contenedores");

    } else {
      const dataFinal: Contenedor = {
        ...data,
        ingreso: tipoIngreso,
        estado: "ubicado",
        fechaIngreso: new Date().toISOString().split("T")[0],
      };

      if (tipoIngreso === "tren") {
        dataFinal.condicion = "full";
      }

      console.log("Creando:", dataFinal);

      await setDoc(
        doc(db, "contenedores", dataFinal.contenedorId),
        dataFinal
      );

      console.log("Contenedor creado");
    }

    reset();
    setContenedorEditar(null);
    setTipoFormulario(null);
  
  } catch (error) {
    console.error(error);
  }
};

const importarFormacion = async (formacion: Contenedor[]) => {
  try {
      await Promise.all(
        formacion.map((contenedor) =>
          setDoc(
            doc(db, "ingresoFormacion", contenedor.contenedorId),
            contenedor
          )
        )
      );
    console.log("Formación importada");
    
  } catch (error) {
    console.error("Error al importar la formación:", error);
    throw error;
  }
};

const obtenerPendientes = async (): Promise<Contenedor[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "ingresoFormacion"));

    const resultado: Contenedor[] = querySnapshot.docs.map((doc) => ({
      contenedorId: doc.id,
      ...(doc.data() as Omit<Contenedor, "contenedorId">),
    }));

    return resultado;
  } catch (error) {
    console.error(error);
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
    await Promise.all(
      vagones.map((vagon) =>
        setDoc(
          doc(db, "egresoFormacion", vagon.pc.toString()),
          vagon
        )
      )
    );

    console.log("Formación de egreso importada");

  } catch (error) {
    console.error("Error al importar la formación:", error);
    throw error;
  }
};

const actualizarPC = async (pc: Vagon) => {
  if (!pc.contenedorId) {
    throw new Error("El PC no tiene contenedor asignado.");
  }

  try {
    await updateDoc(
      doc(db, "egresoFormacion", pc.pc.toString()),
      {
        estado: pc.estado,
        contenedorId: pc.contenedorId,
      }
    );

    console.log("PC actualizado:", pc.pc);
    
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
    pc: pc.pc,
    fila: contenedor.fila,
    ubicacion: contenedor.ubicacion,
  };

  const pcActualizado: Vagon = {
    ...pc,
    estado: "asignado",
    contenedorId: contenedor.contenedorId,
  };

  await actualizarContenedor(contenedorActualizado);
  await actualizarPC(pcActualizado);
  obtenerContenedores();
  setVerFicha(false);
  return {
    contenedor: contenedorActualizado,
    pc: pcActualizado,
  };
};

const asignarDesdeCamion = async (
  pcSeleccionado: Vagon,
  contenedorCamion: string
) => {

  const pcActualizado: Vagon = {
    ...pcSeleccionado,
    estado: "asignado",
    contenedorId: contenedorCamion.toUpperCase(),
  };

  await actualizarPC(pcActualizado);

  return pcActualizado;
};


const reubicarContenedorDelPC = async (data: Contenedor) => {

try {
    // Volver a guardar el contenedor en playa
    const contenedorReubicado: Contenedor = {
      ...data,
      estado: "ubicado",
      salida: "",
      fechaSalida: ""
    };

    await setDoc(
      doc(db, "contenedores", data.contenedorId),
      contenedorReubicado
    );

    // Eliminarlo del egreso
    await deleteDoc(
      doc(db, "egresoFormacion", String(numeroDePc))
    );

    console.log("PC seleccionado", numeroDePc);
    console.log("Documento que voy a actualizar:", String(numeroDePc));

    // Liberar el vagón
    const pcLiberado = {
      pc: numeroDePc,
      estado: "pendiente",
      contenedorId: "",
    };

    await setDoc(
      doc(db, "egresoFormacion", String(numeroDePc)),
      pcLiberado
    );

    console.log("Contenedor reubicado correctamente.");
    setTipoFormulario(null)
    return {
      contenedor: contenedorReubicado,
      pc: pcLiberado,
    };

  } catch (error) {
    console.error("Error al reubicar el contenedor:", error);
    throw error;
  }
};

type FormModificarContenedor = {
  contenedorId: string;
};

const modificarConte = async (data: FormModificarContenedor) => {
  try {
    await updateDoc(
      doc(db, "egresoFormacion", String(numeroDePc)),
      {
        contenedorId: data.contenedorId,
      }
    );

    setTipoFormulario(null);

  } catch (error) {
    console.error("Error al modificar el contenedor:", error);
    throw error;
  }
};


return {modificarConte, reubicarContenedorDelPC, refrescarDatos, limpiarPC, asignarDesdePlaya, asignarDesdeCamion, actualizarPC, actualizarContenedor, obtenerPendientes, importarFormacion, obtenerContenedores, enviarFormulario, formatearFecha, PCvacios, obtenerPCvacios, obtenerContenedoresTodos }

    }

    /*
const obtenerContenedoresTodos = async () => {
  try {
    const response = await fetch(`http://localhost:3001/contenedores`);
    const data = await response.json();
    setContenedoresTodos(data);
  } catch (error) {
    console.log(error);
  }
};
*/

/* const obtenerContenedores = async () => {

      try {
        const response = await fetch(
          `http://localhost:3001/contenedores?fila=${filaSeleccionada}`
        );
        const data = await response.json();
        setContenedores(data);
      } catch (error) {
        console.log(error);
      }
    }; */

    /* const actualizarContenedor = async (contenedor: Contenedor) => {
  if (!contenedor.contenedorId) {
    throw new Error("El contenedor no tiene id.");
  }

  try {
    const response = await fetch(
      `http://localhost:3001/contenedores/${contenedor.contenedorId}`,
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
}; */


/*  const enviarFormulario = async (data: Contenedor) => {
  try {
    let response;
    if (contenedorEditar?.contenedorId !== undefined) {
      console.log("Actualizando:", data);

      const actualizado = {
        ...data,
        estado: "ubicado"
      }

      response = await fetch(
        `http://localhost:3001/contenedores/${contenedorEditar.contenedorId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...actualizado,
            id: contenedorEditar.contenedorId,
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
}; */

/* const importarFormacion = async (formacion: Contenedor[]) => {
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
}; */

/* const obtenerPendientes = async () => {
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
}; */

/* const asignarDesdePlaya = async ( contenedor: Contenedor, pc: Vagon) => {
    
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
}; */

/* const asignarDesdeCamion = async (pcSeleccionado: Vagon, contenedorCamion: string) => {

    if (!pcSeleccionado) return;
    console.log(pcSeleccionado.pc);
    console.log(contenedorCamion);

    const pcActualizado: Vagon = {
    ...pcSeleccionado,
    estado: "asignado",
    contenedorId: contenedorCamion,
  };
    
    await actualizarPC(pcActualizado);
  }; */

  /* const PCvacios = async (vagones: Vagon[]) => {
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
}; */

/* const actualizarPC = async (pc: Vagon) => {
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
}; */

/* const obtenerPCvacios = async () => {
  try{
    const response = await fetch(
      `http://localhost:3001/pc`
    );
    const data = await response.json();
    setFormacionPCvacios(data)
  }catch(error){
    console.log(error)
  }
} */

  /* const limpiarPC = async () => {
  try {
    // Obtener todos los PC
    const response = await fetch("http://localhost:3001/pc");
    const pcs = await response.json();

    // Eliminar todos
    await Promise.all(
      pcs.map((pc: { id: string }) =>
        fetch(`http://localhost:3001/pc/${pc.id}`, {
          method: "DELETE",
        })
      )
    );

    console.log("Formación eliminada correctamente");
  } catch (error) {
    console.error("Error al eliminar la formación:", error);
  }
}; */