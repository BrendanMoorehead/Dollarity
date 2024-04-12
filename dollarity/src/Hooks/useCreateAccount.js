import { useState, useContext } from "react";
import { supabase } from '../supabaseClient';
import { AuthContext } from '../AuthProvider';

export default function useCreateAccount() {
    const { user } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);

    const createAccount = async (accountFormData) => {
        if (!accountFormData) throw new Error("Cannot create account without any form data.");

        setIsLoading(true);
        const { data, error } = await supabase
            .from('accounts')
            .insert([{
                type: accountFormData.type,
                name: accountFormData.name,
                balance: accountFormData.balance,
                user_id: user.id,
            }]);
        //TODO: Add data to Redux
        setIsLoading(false);
        if (error) throw new Error(error.message);
    }

    return { createAccount, isLoading }
}