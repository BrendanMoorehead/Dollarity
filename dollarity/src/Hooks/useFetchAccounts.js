import { useState, useEffect } from "react";
import { supabase } from '../supabaseClient';
import { useContext } from 'react';
import { AuthContext } from '../AuthProvider';

export default function useFetchAccounts() {
    const { user } = useContext(AuthContext);

    const [accounts, setAccounts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const {data, error} = await supabase
                .from('accounts')
                .select('*').order('name')
                .eq('user_id', user.id);
            if (error) setError("Something went wrong");
            setAccounts(data);
            setIsLoading(false);
        }
        fetchData();
    }, []);
    return {accounts, isLoading, error}
}