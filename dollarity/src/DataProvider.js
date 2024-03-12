import { createContext, useEffect, useState } from "react"
import { supabase } from './supabaseClient';
import { signInWithEmail, signOutUser } from './utils/auth';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './AuthProvider';

export const DataContext = createContext();

const DataProvider = ({children}) => {

    const { user } = useContext(AuthContext);
    const [networth, setNetworth] = useState(0);
    const [accounts, setAccounts] = useState(null);
    const [transactions, setTransactions] = useState(null);

    useEffect(() => {
        const setData = async () => {

        }
    })

    /**
     * Gets the logged in user's accounts and sets them in the provider.
     * 
     * @throws Error if supabase request fails.
     * @returns All of the user's accounts.
     */
    const getAccounts = async () => {
        const {data, error} = await supabase
            .from('accounts')
            .select('*')
            .eq('user_id', user.id);
        if (error) throw error;
        setAccounts(data);
        return data;
    }

    /**
     * Gets the logged in user's transactions and sets them in the provider.
     * 
     * @throws Error if supabase request fails.
     * @returns All of the user's transactions.
     */
    const getTransactions = async () => {
        const {data, error} = await supabase
            .from('transactions')
            .select('*')
            .eq('user_id', user.id);
        if (error) throw error;
        setTransactions(data);
        return data;
    }

    return (
        <DataContext.Provider value={{
            networth, 
            accounts, 
            transactions,
            getAccounts,
            getTransactions
            }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider