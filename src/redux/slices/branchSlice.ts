import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ISucursal } from "../../types/dtos/sucursal/ISucursal"

interface BranchState {
   companies: ISucursal[],
}
// Listado de Empresas + ID Empresa activa para obtener Sucursales
const initialState: BranchState = {
   companies: [],
}

export const branchSlice = createSlice({
   name: "Branch",
   initialState,
   reducers: {
      setBranchesData(state, action: PayloadAction<ISucursal[]>) {
         state.companies = action.payload
      },
      updateBranchesData(state, action: PayloadAction<ISucursal>) {
         state.companies = [...state.companies, action.payload]
      },
      // Actualizo las empresas con la Empresa creada / actualizada
      updateBranch(state, action: PayloadAction<ISucursal>) {
         const newState = state.companies.map((item) => (
            (item.id === action.payload.id) ? action.payload : item
         ))
         state.companies = newState
      },
   }
})

export const { setBranchesData, updateBranchesData, updateBranch } = branchSlice.actions
export default branchSlice.reducer