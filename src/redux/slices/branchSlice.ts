import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ISucursal } from "../../types/dtos/sucursal/ISucursal"

interface BranchState {
   branches: ISucursal[],
   activeBranch: ISucursal | null
}
// Listado de Empresas + ID Empresa activa para obtener Sucursales
const initialState: BranchState = {
   branches: [],
   activeBranch: null
}

export const branchSlice = createSlice({
   name: "Branch",
   initialState,
   reducers: {
      setBranchesData(state, action: PayloadAction<ISucursal[]>) {
         state.branches = action.payload
      },
      setActiveBranch(state, action: PayloadAction<ISucursal>) {
         state.activeBranch = action.payload
      },
      updateBranchesData(state, action: PayloadAction<ISucursal>) {
         state.branches = [...state.branches, action.payload]
      },
      // Actualizo las empresas con la Empresa creada / actualizada
      updateBranch(state, action: PayloadAction<ISucursal>) {
         const newState = state.branches.map((item) => (
            (item.id === action.payload.id) ? action.payload : item
         ))
         state.branches = newState
      },
   }
})

export const { setBranchesData, setActiveBranch, updateBranchesData, updateBranch } = branchSlice.actions
export default branchSlice.reducer