import { IImagen } from "../../IImagen";

export interface ICreateProducto {
   id?: number
   denominacion: string;
   precioVenta: number | null;
   descripcion: string;
   habilitado: boolean;
   codigo: string;
   imagenes: IImagen[]
   idCategoria: number;
   idAlergenos: number[];
}
