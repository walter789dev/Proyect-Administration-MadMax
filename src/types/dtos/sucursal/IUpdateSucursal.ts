import { baseDto } from "../baseDto/baseDto";
import { ICategorias } from "../categorias/ICategorias";

export interface IUpdateSucursal extends baseDto {
   nombre: string;
   idEmpresa: number;
   eliminado: boolean;
   latitud: number;
   longitud: number;
   domicilio: {
      id?: number | undefined;
      calle: string;
      numero: number | undefined;
      cp: number | undefined;
      piso: number | undefined;
      nroDpto: number | undefined;
      idLocalidad:number | undefined;
   };
   logo: string;
   categorias?: ICategorias[] | undefined;
   esCasaMatriz: boolean;
   horarioApertura: string;
   horarioCierre: string;
}
