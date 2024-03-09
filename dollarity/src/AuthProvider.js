import { Session, User } from '@supabase/supabase-js'
import { createContext, useEffect } from "react"
import { supabase } from './supabaseClient';
//Make a new context for authentication.
const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const setData = async () => {
            //Extract the session data and captures any potential error.
            const {data: { session }, error } = await supabase.auth.getSession();
            if (error) throw error;
            //Updates the session to the retrieved session.
            setSession(session);
            //Sets the user state to the user object, if the session exists.
            setUser(session?.user);
            setLoading(false);
        }

        //A callback function for when the authentication state changes.
        //_event is the event object assoicated with the authentication state change.
        //session is the updated session data.
        const {data: listener} = supabase.auth.onAuthStateChange((_event, session) => {
            //Updates to new session.
            setSession(session);
            setUser(session?.user);
            setLoading(false);
        });

        setData();

        //Unsubscribes form the event listener.
        return () => {
            listener?.subscription.unsubscribe();
        }
    }, []);
  return (
    
  )
}

export default AuthProvider