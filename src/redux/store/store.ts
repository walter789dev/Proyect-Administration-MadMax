import { configureStore } from '@reduxjs/toolkit'
import companySlice from '../slices/companySlice'
import branchSlice from '../slices/branchSlice'

export const store = configureStore({
   reducer: {
      // Manejo de datos de Empresa
      companyReducer: companySlice,
      branchReducer: branchSlice
   }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch