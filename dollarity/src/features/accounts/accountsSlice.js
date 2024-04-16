import { createSlice } from "@reduxjs/toolkit";

const loadAccountsFromLocalStorage = () => {
    try {
        const serializedAccounts = localStorage.getItem('accounts');
        if (serializedAccounts === null){
            //TODO: Call fetch from DB
        }
        return JSON.parse(serializedAccounts);
    } catch (error){
        //TODO: Error msg
    }
}

const initialState = {
    value: [],
    loading: false,
    error: null
}

export const accountsSlice = createSlice({
    name: 'accounts',
    initialState,
    reducers: {
        accountAdded(state, action) {
            state.push(action.payload);
        }
    }
})

export const { accountAdded } = accountsSlice.actions;

export default accountsSlice.reducer