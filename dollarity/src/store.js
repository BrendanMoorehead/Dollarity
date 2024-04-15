import { configureStore } from '@reduxjs/toolkit'
import transactionsReducer from '../src/features/transactions/transactionsSlice'
import accountsReducer from '../src/features/accounts/accountsSlice'

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    accounts: accountsReducer
  },
})