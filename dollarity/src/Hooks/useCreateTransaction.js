import { useState, useContext } from "react";
import { supabase } from '../supabaseClient';
import { AuthContext } from '../AuthProvider';

export default function useCreateTransaction() {
    const { user } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const createTransaction = async (data) => {
        setIsLoading(true);
        console.log(data);
        const {data: tempdata, error} = await supabase
            .from("transactions")
            .insert([{
                date: data.date,
                type: data.type,
                amount: data.amount,
                user_id: user.id,
                note: data.note,
                receiving_account_id: data.receiving_account,
                sending_account_id: data.sending_account_id,
                category_id: data.category_id,
                subcategory_id: data.subcategory_id,
            }]);
            if (error) throw new Error(error.message);
        setIsLoading(false);

    }
    return {createTransaction, isLoading, error}
}