import {useState, useEffect} from 'react';
import { supabase } from './../supabaseClient';
import { useContext } from 'react';
import { AuthContext } from './AuthProvider';

function useTransactions() {
    const { user } = useContext(AuthContext);
    const [transactionList, setTransactionList] = useState([]);
    const [transactionsLoading, setTransactionsLoading] = useState(true);

    useEffect(() => {
        const cachedTransactions = localStorage.getItem('transactions');
        if (cachedTransactions) setTransactionList(JSON.parse(cachedTransactions));
        else {
            const fetchTransactions = async () => {
            const {data, error} = await supabase
                .from('transactions')
                .select('*').order('date', {ascending: false})
                .eq('user_id', user.id);
                if (error){
                    setTransactionsLoading(false);
                    throw new Error("Failed to get transactions: " + error.message);
                }
                localStorage.setItem('transactions', JSON.stringify(data));
                setTransactionList(JSON.stringify(data));
                setTransactionsLoading(false);
            }       
            fetchTransactions();     
        }
    }, []);

    const transactionToTable = () => {
        console.log(transactionList);
    }

    return {transactionsLoading, transactionList, transactionToTable}
}
export default useTransactions;