import { createSlice } from "@reduxjs/toolkit";

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