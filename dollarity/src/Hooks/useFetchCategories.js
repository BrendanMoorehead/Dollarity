import { useState, useEffect } from "react";
import { supabase } from '../supabaseClient';


export default function useFetchCategories() {

    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const {data, error} = await supabase
                .from('subcategories')
                .select('*').order('category')
            if (error) setError("Something went wrong");
            setCategories(data);
            setIsLoading(false);
        }
        fetchData();
    }, []);
    return {categories, isLoading, error}
}