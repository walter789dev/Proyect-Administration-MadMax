import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEmpresa } from "../../types/dtos/empresa/IEmpresa";
import { IUpdateEmpresaDto } from "../../types/dtos/empresa/IUpdateEmpresaDto";

interface CompanyState {
   companies: IEmpresa[],
   updateCompany: IUpdateEmpresaDto | null
}

const initialState: CompanyState = {
   companies: [],
   updateCompany: null
}

export const companySlice = createSlice({
   name: "Company",
   initialState,
   reducers: {
      setCompaniesData(state, action: PayloadAction<IEmpresa[]>) {
         state.companies = action.payload
      },
      setUpdateCompany(state, action: PayloadAction<IUpdateEmpresaDto>) {
         state.updateCompany = action.payload
      }
   }
})

export const { setCompaniesData, setUpdateCompany } = companySlice.actions

export default companySlice.reducer