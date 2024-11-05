import { ICategorias } from "../categorias/ICategorias";

export interface ICreateSucursal {
   id?: number | undefined,
   nombre: string;
   horarioApertura: string;
   horarioCierre: string;
   esCasaMatriz: boolean;
   latitud: number;
   longitud: number;
   domicilio: {
      id?: number
      calle: string;
      numero: number;
      cp: number;
      piso: number;
      nroDpto: number;
      idLocalidad?: number;
   };
   idEmpresa: number;
   logo: string;
   eliminado: boolean;
   categorias?: ICategorias[];
}
