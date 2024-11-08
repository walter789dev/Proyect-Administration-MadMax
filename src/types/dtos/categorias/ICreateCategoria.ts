export interface ICreateCategoria {
   id?: number
   denominacion: string;
   idSucursales: number[];
   idCategoriaPadre?: number;
}
