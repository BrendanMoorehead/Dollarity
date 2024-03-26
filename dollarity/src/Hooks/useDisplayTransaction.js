import { useState, useEffect } from "react";
import useFetchAccounts from "./useFetchAccounts";
import useFetchTransactions from "./useFetchTransactions";

export default function useDisplayTransaction() {
    const [displayTransaction, setDisplayTransaction] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(true);

    const {transactions, transactionLoading, transactionError} = useFetchTransactions();
    const {accounts, accountLoading, accountError} = useFetchAccounts();

    useEffect(() => {
        const fetchData = async() => {
            setIsLoading(true);
            
            if(!transactionLoading && !accountLoading){
                const accountLookup = accounts.reduce((acc, account) => {
                    acc[account.id] = account.name;
                    return acc;
                }, {});
                

                const transactionsWithAccountNames = transactions.map(transaction => ({
                    ...transaction,
                    sending_account: accountLookup[transaction.sending_account_id],
                    receiving_account: accountLookup[transaction.receiving_account_id],
                    key: transaction.id
                }));
                setDisplayTransaction(transactionsWithAccountNames);
                console.log(transactionsWithAccountNames);
                setIsLoading(false);
            }
        }
        
        fetchData();
    }, [transactionLoading, accountLoading, transactions, accounts]);

    return {displayTransaction, isLoading, error}
}