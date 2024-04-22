import { supabase } from '../supabaseClient';

export const getAccountsFromDB = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Cannot fetch accounts since no user is logged in.");
    const {data: accounts, error} = await supabase
        .from('accounts')
        .select('*')
        .eq('user_id', user.id)
    if (error) throw new Error("Failed to retrieve accounts data: ", error);
    return accounts;
}

export const addNewAccountToDB = async (newAccount) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Cannot add new account since no user is loggged in.");
    const { data: account, error } = await supabase
        .from('accounts')
        .insert([{type: newAccount.type, 
                  name: newAccount.name,
                  balance: newAccount.balance, 
                  user_id: user.id
                }]);
    if (error) throw new Error("Failed to add account to database: ", error);
    return account;
}