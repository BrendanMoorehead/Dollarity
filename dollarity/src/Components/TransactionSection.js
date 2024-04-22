import React from 'react'
import { useContext, useEffect, useState } from 'react';
import { DataContext } from './../DataProvider';
import AccountCard from './AccountCard';
import TransactionCard from './TransactionCard';
import useCategories from '../Hooks/useCategories';
const TransactionSection = () => {
    const {categoriesLoading, categoryList} = useCategories();
    const { transactions, getTransactions } = useContext(DataContext);
    const [loading, setLoading] = useState(true);
    const [loadedTransactions, setLoadedTransactions] = useState(null);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const data = await getTransactions();
                console.log("TRANSFOUND:" , data);
                setLoadedTransactions(data);
            } catch (error) {
                console.error("Error fetching accounts", error);
            } finally {
                setLoading(false);
            }
        }
        getData();
    }, []);
    
    if (categoryList){
        console.log(categoryList);
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!transactions) {
        return <div>No accounts data available</div>;
    }

    return (
        <div style={{backgroundColor: '#dbdbdb', 
        borderRadius: 10, 
        paddingLeft: '20px', 
        paddingRight: '20px', 
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',

        }}>
            <h2 style={{
                alignSelf: 'flex-start'
            }}>Transactions</h2>


            {transactions.map((transaction) => (
                
                <div key={transaction.id} style={{marginBottom: '20px',}}>
                    <TransactionCard key={transaction.id} transaction={transaction}/>
                </div>
            ))}
        </div>
    );
}

export default TransactionSection