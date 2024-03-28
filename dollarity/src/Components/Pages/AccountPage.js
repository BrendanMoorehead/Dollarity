import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import useFetchAccountById from '../../Hooks/useFetchAccountById';
import AccountBalanceCard from '../AccountBalanceCard';
const AccountPage = () => {
  const { id } = useParams();

   const {account, isLoading, error} = useFetchAccountById(id);


  if (isLoading) return (<p>loading...</p>);
  if (error) return (<p>error</p>);
  if (!account) return(<p>no account</p>);

  return (
    <div>Account ID: {account.name}
    <AccountBalanceCard balance={account.balance}/>
    </div>
  )
}

export default AccountPage