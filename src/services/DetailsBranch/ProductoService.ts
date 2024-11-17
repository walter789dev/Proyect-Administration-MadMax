import { ICreateProducto } from "../../types/dtos/productos/ICreateProducto";
import { IProductos } from "../../types/dtos/productos/IProductos";
import { IUpdateProducto } from "../../types/dtos/productos/IUpdateProducto";
import { BackendClient } from "../BackendClient";

export class ProductoService extends BackendClient<IProductos | ICreateProducto | IUpdateProducto> { }
