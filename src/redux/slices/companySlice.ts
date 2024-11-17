import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEmpresa } from "../../types/dtos/empresa/IEmpresa";

interface CompanyState {
   active: IEmpresa | null | undefined
}
// Listado de Empresas + Empresa Activa para obtener Sucursales
const initialState: CompanyState = {
   active: null
}

export const companySlice = createSlice({
   name: "Company",
   initialState,
   reducers: {
      setActiveCompany(state, action: PayloadAction<IEmpresa | undefined>) {
         state.active = action.payload
      }
   }
})

export const { setActiveCompany } = companySlice.actions
export default companySlice.reducer