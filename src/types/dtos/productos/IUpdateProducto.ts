import { IImagen } from "../../IImagen";
import { baseDto } from "../baseDto/baseDto";

export interface IUpdateProducto extends baseDto {
   denominacion: string;
   precioVenta: number;
   descripcion: string;
   habilitado: boolean;
   codigo: string;
   imagenes: IImagen[];
   idCategoria: number;
   idAlergenos: number[];
}
