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

export const fetchCategories = async () => {
    console.log("Fetching...");
    let {data: categories, error} = await supabase.from('categories').select('id, category').order('category');
    if (error) {
        throw error;
    }
    console.log(categories);
    for (const category of categories) {
        let { data: subcategories } = await supabase.from('subcategories').select('id, category')
            .eq('supercategory_id', category.id).order('category');

        // Format subcategories
        category.children = subcategories.map(subcategory => ({
            value: subcategory.id,
            label: subcategory.category
        }));
    }

    const formattedCategories = categories.map(category => ({
        label: <span>{category.category}</span>,
        value: category.id.toString(),
        options: category.children // Subcategories
    }));

    console.log(formattedCategories);
    return formattedCategories;
}

export const createTransaction = async (date, type, amount, note, account_id, category_id, subcategory_id, user_id) => {
    const {data, error} = await supabase.from("transactions").insert([{date: date, type: type, amount: amount, note: note, account_id: account_id, category_id: category_id , subcategory_id: subcategory_id, user_id: user_id}]);
    if (error) {
        console.error("Error creating transaction: " + error.message);
    }
    console.log(data);
    return data;
}

export const calculateNetWorth = async (user_id) => {
    try {
        const {data, error} = await supabase.from("accounts").select('balance').eq('user_id', user_id);
        if (error) throw error;
        const sum = data.reduce((accumulator, currentValue) => {
            // Add the balance of the current object to the accumulator
            return accumulator + parseFloat(currentValue.balance);
          }, 0);
        return sum;

    } catch (error) {
        console.error("Error calculating networth: " + error.message);
        return null;
    }
}