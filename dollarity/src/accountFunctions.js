import { supabase } from "./supabaseClient"

export const createAccount = async (type, name, balance = 0, userId) => {
    const {data, error} = await supabase.from('accounts').insert([{type: type, name: name, balance: balance, user_id: userId}]);
    if (error) {
        console.error("Error creating account: " + error.message);
    }
    console.log(data);
    return data;
}

export const fetchAccounts = async () => {
    const {data, error} = await supabase.from('accounts').select('*');
    if (error) {
        console.error("Error fetching accounts: " + error.message);
    }
    console.log(data);
    return data;
}