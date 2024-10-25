import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEmpresa } from "../../types/dtos/empresa/IEmpresa";


interface CompanyState {
   companies: IEmpresa[],
}
// Estado inicial de Empresa
const initialState: CompanyState = {
   companies: [],
}

// Reducers para manejar información de Empresas
export const companySlice = createSlice({
   name: "Company",
   initialState,
   reducers: {
      // Actualiza el arreglo de Empresas
      setCompaniesData(state, action: PayloadAction<IEmpresa[]>) {
         state.companies = action.payload
      }
   }
})

export const { setCompaniesData } = companySlice.actions
export default companySlice.reducer