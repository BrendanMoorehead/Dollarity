import { useState } from "react";
import { supabase } from '../supabaseClient';
import { useContext } from 'react';
import { AuthContext } from '../AuthProvider';


export default function useDeleteTransaction() {
    const { user } = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteTransactionsById = async (transactionIds) => {
        setIsLoading(true);
        const { error } = await supabase
            .from('transactions')
            .delete()
            .in('id', transactionIds)
            .eq('user_id', user.id)
        setIsLoading(false);
        if (error) setError(error);
    }

    return {deleteTransactionsById, isLoading, error};
}