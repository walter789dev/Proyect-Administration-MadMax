import { IImagen } from "../../IImagen";

export interface ICreateProducto {
   id?: number
   denominacion: string;
   precioVenta: number;
   descripcion: string;
   habilitado: boolean;
   codigo: string;
   imagenes: IImagen[]
   idCategoria: number;
   idAlergenos: number[];
}
