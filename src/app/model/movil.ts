  export interface Bateria {
      capacidad: number;
  }

  export interface Pantalla {
      pulgadas: number;
  }

  export interface Ram {
      memoria: number;
  }

  export interface Procesador {
      nucleos: number;
      frecuencia: number;
  }

  export interface Movil {
      marca: string;
      modelo: string;
      bateria: Bateria;
      pantalla: Pantalla;
      ram: Ram;
      procesador: Procesador;
      antutu: number;
      precio: number;
      id: number;
  }
