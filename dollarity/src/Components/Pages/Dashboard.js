import { Breadcrumb, Layout, Menu, theme, Button } from 'antd';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react';
import NewTransactionForm from '../NewTransactionForm';
import NewAccountForm from '../NewAccountForm';
import { useContext } from 'react';
import { AuthContext } from './../../AuthProvider';
import { DataContext } from './../../DataProvider';
import { calculateNetWorth } from './../../accountFunctions';  
import AccountSection from '../AccountSection';
import AccountCard from '../AccountCard';


const Dashboard = () => {
  const { user, loading } = useContext(AuthContext);
  const { accounts, getAccounts } = useContext(DataContext);


  const getNetworth = async () => {
    const nw = await calculateNetWorth(user.id);
    console.log(nw);
  }

  const fetchAccounts = async () => {
    const acct = await getAccounts();
  }

  return (
    <div>
      Dashboard
      <Button onClick={getNetworth}>Networth</Button>
      <Button onClick={fetchAccounts}>Accounts</Button>
      <AccountSection />
    </div>
  )
}

export default Dashboard