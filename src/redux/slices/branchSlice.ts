import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ISucursal } from "../../types/dtos/sucursal/ISucursal"

interface BranchState {
   activeBranch: ISucursal | null
}
// Listado de Sucursales + Sucursal para Página de Información Sucursal
const initialState: BranchState = {
   activeBranch: null
}

export const branchSlice = createSlice({
   name: "Branch",
   initialState,
   reducers: {
      setActiveBranch(state, action: PayloadAction<ISucursal>) {
         state.activeBranch = action.payload
      },
   }
})

export const { setActiveBranch } = branchSlice.actions
export default branchSlice.reducer