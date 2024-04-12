// //Create slice is main function
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { useContext } from 'react';
// import { AuthContext } from './AuthProvider';
// import { supabase } from './supabaseClient';

// export const getTransactionsAsync = createAsyncThunk(
//     'transactions/getTransactionsAsync',
//     async (userId) => {
//         const {data, error} = await supabase
//             .from('transactions')
//             .select('*').order('date', {ascending: false})
//             .eq('user_id', userId);
//         if (error) return error;
//         return data;
//     }
// )

// const initialState = {
//     value: [],
//     loading: false,
//     error: null
// }

// export const transactionsSlice = createSlice({
//     name: 'transactions',
//     initialState,
//     reducers: {
        
//     },
//     extraReducers: {
//         [getTransactionsAsync.fulfilled]: (state, action) => {
//             return action.payload.transactions;
//         }
//     }
// })

// export const {} = transactionsSlice.actions;

// export default transactionsSlice.reducer