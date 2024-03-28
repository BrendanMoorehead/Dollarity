import useFetchAccounts from "./useFetchAccounts"
import {useState, useEffect} from 'react'
import { supabase } from '../supabaseClient';
import { useContext } from 'react';
import { AuthContext } from '../AuthProvider';
export default function useFetchAccountById (accountId) {
    const { user } = useContext(AuthContext);
    const [account, setAccount] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!user) return;
            setIsLoading(true);
            const {data, error} = await supabase
                .from('accounts')
                .select('*')
                .eq('user_id', user.id)
                .eq('id', accountId)
                .single();
            if (error) setError("Something went wrong");
            setAccount(data);
            setIsLoading(false);
        }
        fetchData();
    },[user, accountId]);
    return {account, isLoading, error}
}