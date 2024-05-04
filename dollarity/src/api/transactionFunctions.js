import { supabase } from "../supabaseClient";

export const getTransactionsFromDB = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Cannot fetch transactions since no user is logged in.");
    const {data: transactions, error} = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id);
    if (error) throw new Error("Failed to retrieve transactions data: ", error);
    return transactions;
}