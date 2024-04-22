import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAccountsFromDB, addNewAccountToDB } from "../../api/accountFunctions";
const initialState = {
    accounts: [],
    status: "idle",
    error: null
}

export const fetchAccounts = createAsyncThunk('accounts/fetchAccounts', async () =>{
    try{
        const accounts = await getAccountsFromDB();
        return accounts;
    } catch (error) {
        //TODO: Decide what to do with error
        console.error("Fetch accounts error: " + error);
    }
});

export const addNewAccount = createAsyncThunk('accounts/addNewAccount', async newAccount => {
    try {
        const account = await addNewAccountToDB(newAccount);
        return account;
    } catch (error) {
        console.error("Add account error: " + error);
    }
});

export const accountsSlice = createSlice({
    name: 'accounts',
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder
            .addCase(fetchAccounts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchAccounts.fulfilled, (state, action) => {
                state.status = 'succeeded';
               state.accounts = state.accounts.concat(action.payload);
            })
            .addCase(fetchAccounts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message;
            })
            .addCase(addNewAccount.fulfilled, (state, action) => {
                state.accounts.push(action.payload);
            })
    }
})

export const { accountAdded } = accountsSlice.actions;
export default accountsSlice.reducer

export const selectAllAccounts = (state) => state.accounts.accounts;