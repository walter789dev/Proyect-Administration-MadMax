import { IDomicilio } from "../../IDomicilio";
import { ICategorias } from "../categorias/ICategorias";
import { IEmpresa } from "../empresa/IEmpresa";

export interface ISucursal {
   id?: number | undefined;
   nombre: string;
   empresa?: IEmpresa;
   domicilio: IDomicilio;
   latitud: number;
   longitud: number;
   categorias?: ICategorias[]
   esCasaMatriz: boolean;
   horarioApertura: string;
   eliminado: boolean;
   horarioCierre: string;
   logo: string;
}
