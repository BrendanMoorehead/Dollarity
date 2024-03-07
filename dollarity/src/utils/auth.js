import { supabase } from "../supabaseClient"


export const userAuth = async (email, password) => {
    try {
        const signIn = await signInWithEmail(email, password);
        if (signIn == null) await signUpWithEmail(email, password); 
    } catch (error) {
        console.error("Unable to authenticate user: " + error.message);
    }
}

/**
 * Signs a user up using their provided email and password.
 * 
 * @param {*} email The new user's email address.
 * @param {*} password The new user's password.
 * @returns The signed up user's data.
 */
export const signUpWithEmail = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
    });
    if (error) {
        console.error("Error signing up: " + error.message);
        return null;
    }
    return data;
}

/**
 * Signs in an existing user given their email and password.
 * If the user does not exist, attempts to sign them up.
 * 
 * @param {*} email The existing user's email.
 * @param {*} password The existing user's password.
 * @returns The existing user's data if sign-in is successful, 
 *          or the signed up user's data if sign-up is successful.
 */
export const signInWithEmail = async (email, password) => {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });
        if (error) {
            console.error("Error signing in: " + error.message);
            // If the error indicates that the user does not exist, attempt sign-up
            if (error.code === 'USER_NOT_VERIFIED') {
                console.log("User not found, attempting sign-up...");
                return signUpWithEmail(email, password);
            }
            return null;
        }
        return data;
    } catch (error) {
        console.error("Error signing in: " + error.message);
        return null;
    }
}

/**
 * Signs out a logged in user.
 */
export const signOutUser = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error("Error signing out: " + error.message);
    }
}

/**
 * Checks local storage for a user token and returns it if it exists.
 * 
 * @returns the token if it exists in local storage.
 */
const isAuthenticated = () => {
    const token = localStorage.getItem('supabaseToken');
    return token !== null;
  };


/**
 * Gets the actively logged in user.
 * 
 * @returns The user id of the active user.
 */
export const getCurrentUser = () => {
    return supabase.auth.user();
};

