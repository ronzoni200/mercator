import { create } from "zustand";
import type { Contenedor, Vagon } from "../type/types.ts";

type StateGlobalType = {

  filaSeleccionada: string;
  setFilaSeleccionada: (fila: string) => void; // Función para actualizar la fila seleccionada

  contenedores: Contenedor[];
  setContenedores: (contenedores: Contenedor[]) => void; // Función para actualizar la lista de contenedores

  tipoFormulario: "camion" | "tren" | "formacion" | "infoContenedor" |null;
  setTipoFormulario: ( tipo: "camion" | "tren" | "formacion" | "infoContenedor" | null) => void;

  contenedorEditar: Contenedor | null;
  setContenedorEditar: (contenedor: Contenedor | null) => void; // Función para actualizar el contenedor a editar

  tipoIngreso: string;
  setTipoIngreso: (tipo: string) => void; // Función para actualizar el tipo de ingreso

  verFicha:boolean;
  setVerFicha: (valor: boolean) => void;

  formacionPendiente: Contenedor[]; // Lista de contenedores pendientes de ingreso por formación
  setFormacionPendiente: (contenedores: Contenedor[]) => void; // Función para actualizar la lista de contenedores pendientes de ingreso por formación
  limpiarFormacionPendiente: () => void; // Función para limpiar la lista de contenedores pendientes de ingreso por formación

  formacionPCvacios:Vagon[];
  setFormacionPCvacios:(vagon:Vagon[])=>void;
};


export const StateGlobal = create<StateGlobalType>((set) => ({

  filaSeleccionada: "",
  setFilaSeleccionada: (fila) => set({ filaSeleccionada: fila, }), // Función para actualizar la fila seleccionada

  contenedores: [], 
  setContenedores: (contenedores) => set({ contenedores,}), // Función para actualizar la lista de contenedores

  tipoFormulario: null,
  setTipoFormulario: (tipo) => set({tipoFormulario: tipo,}),

 verFicha: false,
 setVerFicha: (valor) =>set({verFicha: valor,}),

  contenedorEditar: null,
  setContenedorEditar: (contenedor) => set({ contenedorEditar: contenedor, }), // Función para actualizar el contenedor a editar

  tipoIngreso: "",
  setTipoIngreso: (tipo) => set({ tipoIngreso: tipo, }), // Función para actualizar el tipo de ingreso

  formacionPendiente: [], // Lista de contenedores pendientes de ingreso por formación
  setFormacionPendiente: (contenedores: Contenedor[]) => set({ formacionPendiente: contenedores }), // Función para actualizar la lista de contenedores pendientes de ingreso por formación
  limpiarFormacionPendiente: () => set({formacionPendiente: [] }), // Función para limpiar la lista de contenedores pendientes de ingreso por formación

  formacionPCvacios:[],
  setFormacionPCvacios:(vagon:Vagon[])=> set({formacionPCvacios: vagon})

}));