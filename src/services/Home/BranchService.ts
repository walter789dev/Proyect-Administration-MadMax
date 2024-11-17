import { ICreateSucursal } from "../../types/dtos/sucursal/ICreateSucursal";
import { ISucursal } from "../../types/dtos/sucursal/ISucursal";
import { IUpdateSucursal } from "../../types/dtos/sucursal/IUpdateSucursal";
import { BackendClient } from "../BackendClient";

export class BranchService extends BackendClient<ISucursal | IUpdateSucursal | ICreateSucursal> { }