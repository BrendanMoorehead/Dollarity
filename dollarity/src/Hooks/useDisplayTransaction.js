import { useState, useEffect } from "react";
import useFetchAccounts from "./useFetchAccounts";
import useFetchTransactions from "./useFetchTransactions";
import useFetchCategories from "./useFetchCategories";

export default function useDisplayTransaction() {
    const [displayTransaction, setDisplayTransaction] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(true);

    const {transactions, transactionLoading, transactionError, refetch: refetchTransactions} = useFetchTransactions();
    const {accounts, accountLoading, accountError} = useFetchAccounts();
    const {categories, categoriesLoading, categoriesError} = useFetchCategories();

    useEffect(() => {
        const fetchData = async() => {
            setIsLoading(true);
            
            if(!transactionLoading && !accountLoading && !categoriesLoading){
                const accountLookup = accounts.reduce((acc, account) => {
                    acc[account.id] = { name: account.name, color: account.color };
                    console.log(acc);
                    return acc;
                }, {});

                const categoryLookup = categories.reduce((cat, cats) => {
                    cat[cats.id] = cats.category;
                    return cat;
                }, {});
                
                
                
                const transactionsWithAccountNames = transactions.map(transaction => ({
                    ...transaction,
                    sending_account: {
                        name: accountLookup[transaction.sending_account_id].name,
                        color: accountLookup[transaction.sending_account_id].color 
                    },
                    receiving_account: {
                        name: accountLookup[transaction.receiving_account_id].name,
                        color: accountLookup[transaction.receiving_account_id].color
                    },
                    category_name: categoryLookup[transaction.subcategory_id],
                    key: transaction.id
                }));
                console.log("Display:" + transactionsWithAccountNames);
                setDisplayTransaction(transactionsWithAccountNames);
                setIsLoading(false);
            }
        }
        
        fetchData();
    }, [transactionLoading, accountLoading, categoriesLoading, transactions, accounts, categories]);

    const refetchData = () => {
        refetchTransactions();
    }

    return {displayTransaction, isLoading, error, refetchData}
}