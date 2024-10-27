import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEmpresa } from "../../types/dtos/empresa/IEmpresa";


interface CompanyState {
   companies: IEmpresa[],
   activeCompany: IEmpresa | null
}
// Estado inicial de Empresa
const initialState: CompanyState = {
   companies: [],
   activeCompany: null
}

// Reducers para manejar información de Empresas
export const companySlice = createSlice({
   name: "Company",
   initialState,
   reducers: {
      setCompaniesData(state, action: PayloadAction<IEmpresa[]>) {
         state.companies = action.payload
         const active = action.payload.find(item => "id" in item)
         state.activeCompany = active as IEmpresa
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