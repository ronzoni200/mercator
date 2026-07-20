import * as XLSX from "xlsx";
import type { Vagon } from "../type/types";

export const exportarFormacion = (formacion: Vagon[]) => {

  // Ordenar por PC (opcional)
  const formacionOrdenada = [...formacion].sort(
    (a, b) => a.pc - b.pc
  );

  const datos = formacionOrdenada.map((vagon) => ({
    PC: vagon.pc,
    Contenedor: vagon.contenedorId,
  }));

  const hoja = XLSX.utils.json_to_sheet(datos);
  const fecha = new Date().toLocaleDateString("es-AR");
  const libro = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(libro, hoja, "Formación");

  XLSX.writeFile(libro, `Formacion_${fecha}.xlsx`);
};