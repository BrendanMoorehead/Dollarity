import { Breadcrumb, Layout, Menu, theme, Button } from 'antd';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react';
import NewTransactionForm from '../NewTransactionForm';
import NewAccountForm from '../NewAccountForm';
import { useContext } from 'react';
import { AuthContext } from './../../AuthProvider';
import { calculateNetWorth } from './../../accountFunctions';


const Dashboard = () => {
  const { user, loading } = useContext(AuthContext);

  const getNetworth = async () => {
    const nw = await calculateNetWorth(user.id);
    console.log(nw);
  }

  return (
    <div>
      Dashboard
      <Button onClick={getNetworth}>Networth</Button>
    </div>
  )
}

export default Dashboard