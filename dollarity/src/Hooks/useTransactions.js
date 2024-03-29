import {useState, useEffect, useContext} from 'react';
import { supabase } from './../supabaseClient';
import { AuthContext } from './AuthProvider';

/**
 * Retrieves the user's transactions from local storage or the DB.
 * 
 * @returns {array, boolean, error}
 * transactions - An array of all of the user's transactions
 * isLoading - A boolean representation of if the transaction retrieval is in progress
 * error - The error code returned by supabase if the query fails
 */
function useTransactions() {
    const { user } = useContext(AuthContext);
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        //Check for cached transactions to reduce DB calls
        const cachedTransactions = localStorage.getItem('transactions');
        if (cachedTransactions) setTransactions(JSON.parse(cachedTransactions));
        //No cached transactions
        else {
            const fetchTransactions = async () => {
            //Make call for users transaction data
            const {data, error} = await supabase
                .from('transactions')
                .select('*').order('date', {ascending: false})
                .eq('user_id', user.id);
                if (error) {
                    setError(error);
                }
                //Set transaction data
                else {
                    localStorage.setItem('transactions', JSON.stringify(data));
                    setTransactions(data);
                }
                setTransactionsLoading(false);
            }       
            fetchTransactions();     
        }
    }, []);

    return {transactions, isLoading, error}
}
export default useTransactions;