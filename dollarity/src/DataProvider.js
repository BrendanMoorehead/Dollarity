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
    const [transactions, setTransactions] = useState();

    useEffect(() => {
        console.log("Transactions updated: ", transactions);
    }, [transactions])

    /**
     * Gets the logged in user's accounts and sets them in the provider.
     * 
     * @throws Error if supabase request fails.
     * @returns All of the user's accounts.
     */
    const getAccounts = async () => {
        const {data, error} = await supabase
            .from('accounts')
            .select('*').order('name')
            .eq('user_id', user.id);
        if (error) throw error;
        setAccounts(data);
        console.log("Accounts set: ", data);
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
            .select('*').order('date', {ascending: false})
            .eq('user_id', user.id);
        if (error) throw error;
        setTransactions(data);
        
        return data;
    }

    
    const createAccount = async (type, name, balance, color) => {
        const {data, error} = await supabase
            .from('accounts')
            .insert([{type: type, name: name, balance: balance, user_id: user.id, color: color}]);
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

        return {fromAccountData, toAccountData};
    }

    const addTransaction = async (date, type, amount, note, sendingAccount = null, receivingAccount = null, category, subcategory = null) => {

        if (type === 'Transfer') {
            const {data, error} = await supabase
            .from("transactions")
            .insert([{
                date: date, 
                type: type, 
                amount: amount, 
                note: note, 
                receiving_account_id: receivingAccount, 
                sending_account_id: sendingAccount, 
                category_id: category, 
                subcategory_id: subcategory, 
                user_id: user.id}]);
            if (error) throw new Error(error.message);
            return data;
        }
        else {
            const {data, error} = await supabase
            .from("transactions")
            .insert([{
                date: date, 
                type: type, 
                amount: amount.toFixed(2), 
                note: note, 
                receiving_account_id: receivingAccount, 
                sending_account_id: sendingAccount, 
                category_id: category, 
                subcategory_id: subcategory, 
                user_id: user.id}]);
            if (error) throw new Error(error.message);

            if (type === "Income"){
                console.log("Income: " + receivingAccount);
                const updateAccount = await changeAccountValue(receivingAccount, amount, "add");
                const accountData = await getAccounts();
                console.log(updateAccount);
                return updateAccount;
            }
            else if (type === 'Expense'){
                const updateAccount = await changeAccountValue(sendingAccount, amount, "subtract");
                const accountData = await getAccounts();
                return updateAccount ;
            }
        }

    }

    const changeAccountValue = async (accountId, amount, symbol) => {
        const { data: accountData, error: accountError } = await supabase
        .from('accounts')
        .select('balance, name')
        .eq('id', accountId)
        .single();
        if (accountError) throw new Error(accountError.message);
        
        
        let newAccountBalance = parseFloat(accountData.balance);
        symbol === 'add' ? newAccountBalance += parseFloat(amount) : newAccountBalance -= parseFloat(amount);

        //Update balance of the account the funds are leaving from.
        const {data: updatedAccountData, error: updatedAccountError} = await supabase
            .from('accounts')
            .update({balance: newAccountBalance})
            .eq('id', accountId);
        if (updatedAccountError) throw Error (updatedAccountError.message);

        return accountData;
    }

    const deleteAccount = async (accountId) => {
        const { error } = await supabase
            .from('accounts')
            .delete()
            .eq('id', accountId);
        if (error) throw new Error(error.message);
    }

    return (
        <DataContext.Provider value={{
            networth, 
            accounts, 
            transactions,
            getAccounts,
            getTransactions,
            createAccount,
            transfer,
            addTransaction,
            deleteAccount
            }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider