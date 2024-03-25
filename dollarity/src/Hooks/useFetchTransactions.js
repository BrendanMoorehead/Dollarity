import { useState, useEffect } from "react";
import { supabase } from '../supabaseClient';
import { useContext } from 'react';
import { AuthContext } from '../AuthProvider';

export default function useFetchTransactions() {
    const { user } = useContext(AuthContext);

    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const {data, error} = await supabase
                .from('transactions')
                .select('*').order('date', {ascending: false})
                .eq('user_id', user.id);
            //Maybe get account names in here
            if (error) setError("Something went wrong");
            setTransactions(data);
            setIsLoading(false);
        }
        fetchData();
    }, []);
    return {transactions, isLoading, error}
}