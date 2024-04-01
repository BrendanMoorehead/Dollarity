import { useState } from "react";
import { supabase } from '../supabaseClient';
/**
 * Contains functions for updating an account's balance.
 * 
 * @returns {boolean} isLoading - true if the updates are in progress.
 * @returns {Function} reduceAccountBalance - Function to reduce the account balance by a specified amount.
 * @returns {Function} increaseAccountBalance - Function to increase the account balance by a specified amount.
 */
export default function useUpdateAccountBalance() {
    const [isLoading, setIsLoading] = useState(false);
    /**
     * Gets the balance and the name of the specified account.
     * 
     * @param {*} accountId The id of the account to retrieve.
     * @returns {JSON} The name and balance of the account.
     * @throws {Error} If the supabase data retrieval fails.
     */
    const getAccountBalanceAndName = async (accountId) => {
        const { data, error } = await supabase
            .from('accounts')
            .select('balance, name')
            .eq('id', accountId)
            .single();
        if (error) throw new Error("Failed to get account name and balance for id: " + accountId + ". Error message: " + error.message);
        return data; 
    }

    /**
     * Sets the balance of the specified account.
     * 
     * @param {*} accountId The id of the account to update the balance of.
     * @param {*} balance The new balance of the account.
     * @returns {JSON} the data of the updated account.
     * @throws {Error} if the supabase data update fails.
     */
    const updateAccountBalance = async (accountId, balance) => {
        const { data, error } = await supabase
            .from('accounts')
            .update({balance: balance})
            .eq('id', accountId);
        if (error) throw new Error("Failed to update balance for account id: " + accountId + ". Error message: " + error.message);
        return data;
    }   

    /**
     * Reduces the balance of an account by a specified amount.
     * 
     * @param {*} accountId The id of the account to reduce the balance of.
     * @param {*} amount The amount to reduce the balance of the account by.
     * @throws {Error} if any of the supabase functions fail.
     */
    const reduceAccountBalance = async (accountId, amount) => {
        setIsLoading(true);
        try {
            const data = getAccountBalanceAndName(accountId);
            const newBalance = parseFloat(data.balance) - parseFloat(amount);
            updateAccountBalance(accountId, newBalance);
        } catch (error) {
            setIsLoading(false);
            throw error;
        }
        setIsLoading(false);
    }

    /**
     * Increases the balance of an account by a specified amount.
     * 
     * @param {*} accountId The id of the account to increase the balance of.
     * @param {*} amount The amount to increase the balance of the account by.
     * @throws {Error} if any of the supabase functions fail.
     */
    const increaseAccountBalance = async (accountId, amount) => {
        setIsLoading(true);
        try {
            const data = getAccountBalanceAndName(accountId);
            const newBalance = parseFloat(data.balance) + parseFloat(amount);
            updateAccountBalance(accountId, newBalance);
        } catch (error) {
            setIsLoading(false);
            throw error;
        }
        setIsLoading(false);
    }
    return {isLoading, reduceAccountBalance, increaseAccountBalance}
}