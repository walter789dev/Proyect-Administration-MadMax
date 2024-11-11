import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEmpresa } from "../../types/dtos/empresa/IEmpresa";

interface CompanyState {
   companies: IEmpresa[],
   active: IEmpresa | null | undefined
}
// Listado de Empresas + Empresa Activa para obtener Sucursales
const initialState: CompanyState = {
   companies: [],
   active: null
}

export const companySlice = createSlice({
   name: "Company",
   initialState,
   reducers: {
      // Define el listado de Empresas + Empresa Activa para Sucursal
      setCompaniesData(state, action: PayloadAction<IEmpresa[]>) {
         state.companies = action.payload
         if (!state.active) {
            const element = action.payload.find(item => "id" in item)
            state.active = element
         }
      },
      // Actualizo el listado de empresas con la empresa creada
      updateCompaniesData(state, action: PayloadAction<IEmpresa>) {
         state.companies = [...state.companies, action.payload]
      },
      // Actualizo el listado de empresas con la empresa actualizada
      updateCompany(state, action: PayloadAction<IEmpresa>) {
         const newState = state.companies.map((item) => (
            (item.id === action.payload.id) ? action.payload : item
         ))
         state.companies = newState
      },
      // Actualizo la empresa activa
      setActiveCompany(state, action: PayloadAction<IEmpresa>) {
         state.active = action.payload
      }
   }
})

export const { setCompaniesData, updateCompaniesData, updateCompany, setActiveCompany } = companySlice.actions
export default companySlice.reducer