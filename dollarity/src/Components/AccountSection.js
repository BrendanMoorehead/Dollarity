import React from 'react'

import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './../AuthProvider';
import { DataContext } from './../DataProvider';
import AccountCard from './AccountCard';

const AccountSection = () => {
    const { user } = useContext(AuthContext);
    const { accounts, getAccounts } = useContext(DataContext);
    const [loading, setLoading] = useState(true);
    const [loadedAccounts, setLoadedAccounts] = useState(null);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const data = await getAccounts();
                console.log(data);
                // setLoadedAccounts(data);
            } catch (error) {
                console.error("Error fetching accounts", error);
            } finally {
                setLoading(false);
            }
        }
        getData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    
    // Ensure accounts data is available and not null or undefined
    if (!accounts) {
        return <div>No accounts data available</div>;
    }
    
    // Render accounts data
    return (
        <div>
            {accounts.map((account) => (
                <div key={account.id}>
                    <AccountCard key={account.id} account={account} />
                </div>
            ))}
        </div>
    );
}

export default AccountSection