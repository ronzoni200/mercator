export type Contenedor = {
  
  id?: string;// Identificador interno  
  contenedorId: string;// Número de contenedor 
  fila?: string;  // Ubicación en el patio
  ubicacion?: string;
  condicion?: | "full" | "vacio naviera" | "vacio alquilado" | "full trasbasado";  // Estado físico del contenedor
  estado: "pendiente" | "ubicado" | "egresado"; // Estado dentro del depósito
  ingreso: "camion" | "tren" | "";  // Cómo ingresó al depósito
  salida?: "camion" | "tren" | ""; // Cómo salió del depósito
  // Fechas
  fechaIngreso: string;
  fechaSalida?: string;
};

export type EntradaTren = {

}

export type SalidaTren = {
    vagon:number
    contenedor:string
}

export type Fila= {
  fila: string
}

  type Columna = "H"| "G" | "F" | "E" | "D" | "C" | "B" | "A";
  type Nivel = 1 | 2 | 3;
  export type Ubicacion = `${Columna}${Nivel}`;

  export type Posiciones = Record<Ubicacion, Contenedor | null>;