import React from 'react'

import { useContext } from 'react';
import { AuthContext } from './../AuthProvider';
import { DataContext } from './../DataProvider';

const AccountSection = () => {
    const { user } = useContext(AuthContext);
    const { accounts, getAccounts } = useContext(DataContext);
  return (
    <div>
        {/* {accounts.map((account) => {
            return (
                <div>
            <p>{account.name}</p>
            <p>{account.balance}</p>
            </div>
            )
        })} */}
    </div>
  )
}

export default AccountSection