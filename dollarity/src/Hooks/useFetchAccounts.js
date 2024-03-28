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
        const cachedAccounts = localStorage.getItem('accounts');
        if (cachedAccounts) {
            setAccounts(JSON.parse(cachedAccounts));
        } else {
            const fetchData = async () => {
                if (!user) return;
                setIsLoading(true);
                const {data, error} = await supabase
                    .from('accounts')
                    .select('*').order('name')
                    .eq('user_id', user.id);
                if (error) setError("Something went wrong");
                setAccounts(data);
                localStorage.setItem('accounts', JSON.stringify(data));
                setIsLoading(false);
            }
            fetchData();
        }
    }, [user]);
    return {accounts, isLoading, error}
}