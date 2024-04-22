
import { supabase } from './supabaseClient';

export const fetchAccountsFromDatabase = async () => {
    try {
        const {data: { session }, error } = await supabase.auth.getSession();
        if (session.user){
            const {data, error} = await supabase
                .from('accounts')
                .select('*').order('name')
                .eq('user_id', session.user.id);
            if (error) {
                console.error("Supabase error fetching accounts", error);
                throw error;
            }
        }
    } catch (error) {
        console.error("Error fetching accounts from DB: ", error);
        throw error;
    }
}