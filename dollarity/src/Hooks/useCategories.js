import {useState, useEffect} from 'react';
import { supabase } from './../supabaseClient';

function useCategories() {
    const [categoryList, setCategoryList] = useState([]);
    const [categoriesLoading, setCategoriesLoading] = useState(true);

    useEffect(() => {
        const cachedCategories = localStorage.getItem('categories');

        if (cachedCategories) {
            setCategoryList(JSON.parse(cachedCategories));
        } else {
            const fetchCategories = async () => {
                //Fetch categories
                const {data: categoryData, error: categoryError} = await supabase
                    .from('categories')
                    .select('*')
                if (categoryError){
                    setCategoriesLoading(false);
                    throw new Error("Failed to fetch categories: ", categoryError);
                } 
                //Fetch subcategories
                const {data: subcategoryData, error: subcategoryError} = await supabase
                    .from('subcategories')
                    .select('*')
                if (subcategoryError){
                    setCategoriesLoading(false);
                    throw new Error("Failed to fetch subcategories: ", subcategoryError);
                } 
                //Map subcategories to categories
                const categoriesWithSubs = categoryData.map(category => {
                    const subcategories = subcategoryData.filter(subcategory => subcategory.supercategory_id === category.id);
                    return {...category, subcategories};
                });
                localStorage.setItem('categories', JSON.stringify(categoriesWithSubs));
                setCategoryList(categoriesWithSubs);
                setCategoriesLoading(false);
            }

            fetchCategories();
        }
        
    }, []);

    const getSubcategoryNameById = (subcategoryId) => {
        for (const category of categoryList) {
            const foundSubcategory = category.subcategories.find(subcategory => subcategory.id === subcategoryId);
            if (foundSubcategory){
                return foundSubcategory.category;
            } 
        }
        return null;
    };


    return {categoriesLoading, categoryList, getSubcategoryNameById};
}

export default useCategories;