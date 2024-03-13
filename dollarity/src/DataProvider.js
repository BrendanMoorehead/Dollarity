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
        console.log(data);
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

    
    const createAccount = async (type, name, balance) => {
        const {data, error} = await supabase
            .from('accounts')
            .insert([{type: type, name: name, balance: balance, user_id: user.id}]);
        if (error) {
            console.error("Error creating account: " + error.message);
        }
        getAccounts();
        return data;
    }

    const transfer = async (fromAccountId, toAccountId, transferAmount) => {

        //Get required data about the account the funds are leaving from.
        const { data: fromAccountData, error: fromAccountError } = await supabase
            .from('accounts')
            .select('balance, name')
            .eq('id', fromAccountId)
            .single();
        if (fromAccountError) throw new Error(fromAccountError.message);
        
        //Get required data about the account the funds are being transferred to.
        const { data: toAccountData, error: toAccountError } = await supabase
            .from('accounts')
            .select('balance, name')
            .eq('id', toAccountId)
            .single();
        if (toAccountError) throw new Error(toAccountError.message);
        
        //Calculate new balances.
        const newFromAccountBalance = parseFloat(fromAccountData.balance) - parseFloat(transferAmount);
        const newToAccountBalance = parseFloat(toAccountData.balance) + parseFloat(transferAmount);

        //Update balance of the account the funds are leaving from.
        const {data: updatedFromAccountData, error: updatedFromAccountError} = await supabase
            .from('accounts')
            .update({balance: newFromAccountBalance})
            .eq('id', fromAccountId);
        if (updatedFromAccountError) throw Error (updatedFromAccountError.message);

        //Update balance of the account the funds are leaving from.
        const {data: updatedToAccountData, error: updatedToAccountError} = await supabase
            .from('accounts')
            .update({balance: newToAccountBalance})
            .eq('id', toAccountId);
        if (updatedToAccountError) throw Error (updatedToAccountError.message);

        //Refresh the account information.
        await getAccounts();

        const fromName = fromAccountData.name;
        const toName = toAccountData.name;
        return {fromAccountData, toAccountData};
    }


    return (
        <DataContext.Provider value={{
            networth, 
            accounts, 
            transactions,
            getAccounts,
            getTransactions,
            createAccount,
            transfer
            }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider