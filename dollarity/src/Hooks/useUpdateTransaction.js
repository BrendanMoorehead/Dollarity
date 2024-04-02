import { useState } from "react";
import { supabase } from '../supabaseClient';


export default function useUpdateTransaction() {
    const [isLoading, setIsLoading] = useState(false);

    const updateTransaction = async (data) => {
        console.log(data);
        setIsLoading(true);
        const { error } = await supabase
            .from("transactions")
            .update({
                date: data.date,
                type: data.type,
                amount: data.amount,
                note: data.note,
                sending_account_id: data.sending_account_id,
                receiving_account_id: data.receiving_account_id,
                category_id: data.category_id,
                subcategory_id: data.subcategory_id
            })
            .eq('id', data.id);
        setIsLoading(false);
        if (error) throw new Error ("Failed to update transaction id: " + data.id + ". Error message: " + error.message);
    }

    return {isLoading, updateTransaction}
}