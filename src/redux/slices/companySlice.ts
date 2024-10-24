import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEmpresa } from "../../types/dtos/empresa/IEmpresa";
import { IUpdateEmpresaDto } from "../../types/dtos/empresa/IUpdateEmpresaDto";

interface CompanyState {
   companies: IEmpresa[],
   selectCompany: IUpdateEmpresaDto | null
}

// Estado inicial de Empresa
const initialState: CompanyState = {
   companies: [],
   selectCompany: null
}

// Reducers para manejar información de Empresas
export const companySlice = createSlice({
   name: "Company",
   initialState,
   reducers: {
      // Actualiza el arreglo de Empresas
      setCompaniesData(state, action: PayloadAction<IEmpresa[]>) {
         state.companies = action.payload
      },
      // Inidica la Empresa seleccionada para obtener Sucursales
      setSelectCompany(state, action: PayloadAction<IUpdateEmpresaDto>) {
         state.selectCompany = action.payload
      }
   }
})

export const { setCompaniesData, setSelectCompany } = companySlice.actions
export default companySlice.reducer