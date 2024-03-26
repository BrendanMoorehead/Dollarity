import { useState } from "react";
import { supabase } from '../supabaseClient';
import { useContext } from 'react';
import { AuthContext } from '../AuthProvider';

export default function useDeleteTransaction() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteTransactionById = async (transactionId) => {
        setIsLoading(true);
        const {error} = await supabase
            .from('transactions')
            .delete()
            .eq('id', transactionId)
        setIsLoading(false);
        if (error) setError(error);
    }

    return {deleteTransactionById, isLoading, error};
}