import { supabase } from "../supabaseClient"
export const signUpWithEmail = async (email, password) => {
    const {data, error} = await supabase.auth.signUp({
        email: email,
        password: password,
    });
    return data;
}