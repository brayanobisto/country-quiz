import { configureStore } from '@reduxjs/toolkit'
import { globalSlice } from './slices/global'

export const store = configureStore({
  devTools: false,
  reducer: globalSlice.reducer,
})
