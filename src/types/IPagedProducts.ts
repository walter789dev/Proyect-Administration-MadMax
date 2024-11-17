import { IProductos } from "./dtos/productos/IProductos"

export interface IPagedProducts {
   totalPages: number
   totalElements: number
   size: number
   content: IProductos[]
   number: number
   sort: {
      [key: string]: boolean
   }
   pageable: {
      [key: string]: number | boolean | object
      sort: {
         [key: string]: boolean
      }
   }
   numberOfElements: number
   first: boolean
   last: boolean
   empty: boolean
}
