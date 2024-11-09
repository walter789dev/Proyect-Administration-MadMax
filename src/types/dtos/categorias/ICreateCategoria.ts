export interface ICreateCategoria {
   id?: number
   denominacion: string;
   idEmpresa: number | undefined
   idCategoriaPadre?: number | null;
}
