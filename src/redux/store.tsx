import { configureStore } from '@reduxjs/toolkit'
import { incremented } from './action'

export const store = configureStore({
  reducer: {
    incremented,
  },
})
