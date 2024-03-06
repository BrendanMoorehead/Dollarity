import { supabase } from "../supabaseClient"

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
 * Signs in an existing user given thier email and password.
 * 
 * @param {*} email The existing user's email.
 * @param {*} password The existing user's password.
 * @returns The existing user's data.
 */
export const signInWithEmail = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });
    if (error) {
        console.error("Error signing in: " + error.message);
        return null;
    }
    return data;
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