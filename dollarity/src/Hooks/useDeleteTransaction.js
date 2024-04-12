import { useState } from "react";
import { supabase } from '../supabaseClient';
import { useContext } from 'react';
import { AuthContext } from '../AuthProvider';
/**
 * A hook to delete a single transaction from the database.
 */
export default function useDeleteTransaction() {
    const { user } = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(false);

    const deleteTransactionsById = async (transactionIds) => {
        setIsLoading(true);
        const { error } = await supabase
            .from('transactions')
            .delete()
            .in('id', transactionIds)
            .eq('user_id', user.id)
        setIsLoading(false);
        if (error) throw new Error(error.message);
    }

    return { deleteTransactionsById, isLoading };
}