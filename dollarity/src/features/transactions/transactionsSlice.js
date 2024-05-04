import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTransactionsFromDB } from "../../api/transactionFunctions";

const initialState = {
    transactions: [],
    status: "idle",
    error: null
}

export const fetchTransactions = createAsyncThunk('transactions/fetchTransactions', async () => {
    try {
        const transactions = getTransactionsFromDB();
        return transactions;
    } catch (error) {
        //TODO: Decide what to do with fetch error
        console.error("Fetch transactions error: " + error);
    }
})

export const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(fetchTransactions.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.transactions = state.transactions.concat(action.payload);
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message;
            })
    }
})
export const { transactionAdded } = transactionsSlice.actions;
export default transactionsSlice.reducer;
export const selectAllTransactions = (state) => state.transactions.transactions;
