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
                    acc[account.id] = account.name;
                    return acc;
                }, {});

                const categoryLookup = categories.reduce((cat, cats) => {
                    cat[cats.id] = cats.category;
                    return cat;
                }, {});
                

                const transactionsWithAccountNames = transactions.map(transaction => ({
                    ...transaction,
                    sending_account: accountLookup[transaction.sending_account_id],
                    receiving_account: accountLookup[transaction.receiving_account_id],
                    category_name: categoryLookup[transaction.subcategory_id],
                    key: transaction.id
                }));
                setDisplayTransaction(transactionsWithAccountNames);
                console.log(transactionsWithAccountNames);
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