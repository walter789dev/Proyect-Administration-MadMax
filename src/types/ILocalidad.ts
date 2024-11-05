import { IProvincia } from "./IProvincia";

export interface ILocalidad {
  id: number | undefined;
  nombre: string;
  provincia: IProvincia;
}
