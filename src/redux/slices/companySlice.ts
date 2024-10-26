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
      setCompaniesData(state, action: PayloadAction<IEmpresa[]>) {
         state.companies = action.payload
      },
      updateCompaniesData(state, action: PayloadAction<IEmpresa>) {
         state.companies = [...state.companies, action.payload]
      },
      updateCompany(state, action: PayloadAction<IEmpresa>) {
         const newState = state.companies.map((item) => (
            (item.id === action.payload.id) ? action.payload : item
         ))
         state.companies = newState
      }
   }
})

export const { setCompaniesData, updateCompaniesData, updateCompany } = companySlice.actions
export default companySlice.reducer