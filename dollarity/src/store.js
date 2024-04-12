import { configureStore } from '@reduxjs/toolkit'
import transactionsReducer from '../src/features/transactions/transactionsSlice'

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
  },
})