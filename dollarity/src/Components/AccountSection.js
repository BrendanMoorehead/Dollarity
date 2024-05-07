import React from 'react'
import { selectAllAccounts, fetchAccounts } from '../features/accounts/accountsSlice';
import { useContext, useEffect, useState, useRef } from 'react';
import { AuthContext } from './../AuthProvider';
import { DataContext } from './../DataProvider';
import { useSelector, useDispatch } from 'react-redux'
import AccountCard from './AccountCard';
import { Divider } from 'antd';

const AccountSection = () => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [loadedAccounts, setLoadedAccounts] = useState(null);

    const dispatch = useDispatch();
    const accounts = useSelector(selectAllAccounts);
    const accountsStatus = useSelector(state => state.accounts.status);
    const accountsError = useSelector(state => state.accounts.error);
    

    useEffect(() => {
        if (accountsStatus === 'idle'){
            dispatch(fetchAccounts());
        }
    }, [accountsStatus, dispatch]);

    if (accountsStatus === 'loading'){
        return <div>Loading...</div>;
    }
    if (accountsStatus === 'succeeded'){
        return(
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
            }}>Accounts</h2>
            

            {accounts && accounts.map((account) => (
               account && account.id ? (<div key={account.id} style={{marginBottom: '20px'}}>
                    <AccountCard key={account.id} account={account} />
                </div>) : (
                    <div>Loading...</div>
                )
            ))}
        </div>
        )
    }
    if (accountsStatus === 'failed'){
        return <div>Failed to get accounts</div>
    }
}

export default AccountSection