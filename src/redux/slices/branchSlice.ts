import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ISucursal } from "../../types/dtos/sucursal/ISucursal"

interface BranchState {
   branches: ISucursal[],
   activeBranch: ISucursal | null
}
// Listado de Sucursales + Sucursal para Página de Información Sucursal
const initialState: BranchState = {
   branches: [],
   activeBranch: null
}

export const branchSlice = createSlice({
   name: "Branch",
   initialState,
   reducers: {
      // Establece la lista de sucursales
      setBranchesData(state, action: PayloadAction<ISucursal[]>) {
         state.branches = action.payload
      },
      // Define la sucursal activa para mostrar su información
      setActiveBranch(state, action: PayloadAction<ISucursal>) {
         state.activeBranch = action.payload
      },
      // Actualiza la lista de sucursales cuando se cree una sucursal
      updateBranchesData(state, action: PayloadAction<ISucursal>) {
         state.branches = [...state.branches, action.payload]
      },
      // Actualiza la lista de sucursales cuando se actualize una sucursal
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