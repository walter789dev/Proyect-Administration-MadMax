import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEmpresa } from "../../types/dtos/empresa/IEmpresa";

interface CompanyState {
   companies: IEmpresa[],
   id: number | undefined
}
// Listado de Empresas + ID Empresa activa para obtener Sucursales
const initialState: CompanyState = {
   companies: [],
   id: undefined
}
// Reducers para manejar información de Empresas
export const companySlice = createSlice({
   name: "Company",
   initialState,
   reducers: {
      // Define Empresas[] + Empresa Activa para Sucursal
      setCompaniesData(state, action: PayloadAction<IEmpresa[]>) {
         state.companies = action.payload
         const active = action.payload.find(item => "id" in item)
         state.id = active?.id
      },
      // Recibo las empresas de la API
      updateCompaniesData(state, action: PayloadAction<IEmpresa>) {
         state.companies = [...state.companies, action.payload]
      },
      // Actualizo las empresas con la Empresa creada / actualizada
      updateCompany(state, action: PayloadAction<IEmpresa>) {
         const newState = state.companies.map((item) => (
            (item.id === action.payload.id) ? action.payload : item
         ))
         state.companies = newState
      },
      // Actualizo la empresa activa
      setActiveCompany(state, action: PayloadAction<number | undefined>) {
         state.id = action.payload
      }
   }
})

export const { setCompaniesData, updateCompaniesData, updateCompany, setActiveCompany } = companySlice.actions
export default companySlice.reducer