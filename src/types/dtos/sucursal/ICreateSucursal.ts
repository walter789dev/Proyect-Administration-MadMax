import { ICategorias } from "../categorias/ICategorias";

export interface ICreateSucursal {
   id?: number | undefined,
   nombre: string;
   horarioApertura: string;
   horarioCierre: string;
   esCasaMatriz: boolean;
   latitud: number | null;
   longitud: number | null;
   domicilio: {
      id?: number
      calle: string;
      numero: number | null;
      cp: number | null;
      piso: number | null;
      nroDpto: number | null;
      idLocalidad?: number;
   };
   idEmpresa: number;
   logo: string;
   eliminado: boolean;
   categorias?: ICategorias[];
}
