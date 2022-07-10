import { configureStore } from '@reduxjs/toolkit'
import { globalSlice } from './slices/global'

export const store = configureStore({
  reducer: globalSlice.reducer,
})
