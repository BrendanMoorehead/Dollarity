import { Breadcrumb, Layout, Menu, theme, Button } from 'antd';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react';
import NewTransactionForm from '../NewTransactionForm';
import NewAccountForm from '../AccountForm';
import { useContext } from 'react';
import { AuthContext } from './../../AuthProvider';
import { DataContext } from './../../DataProvider';
import { calculateNetWorth } from './../../accountFunctions';  
import AccountSection from '../AccountSection';
import AccountCard from '../AccountCard';
import TransactionSection from '../TransactionSection';
import useCategories from '../../Hooks/useCategories';
import TestChart from '../TestChart';
import LightTransactionTable from '../LightTransactionTable';
import NetworthCard from '../NetworthCard';

import AverageSpendingChart from '../Charts/AverageSpendingChart';
const Dashboard = () => {
  const { user, loading } = useContext(AuthContext);
  const { accounts, getAccounts } = useContext(DataContext);
  const {categoryList} = useCategories();

  const getNetworth = async () => {
    const nw = await calculateNetWorth(user.id);
    console.log(nw);
  }

  const fetchAccounts = async () => {
    const acct = await getAccounts();
  }

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.upperContent}>
      <div style={{...styles.placeholderBox, ...styles.netWorth}}>
        <NetworthCard />
      </div>
      <div style={{...styles.placeholderBox, ...styles.spending}}>Spending</div>
      <div style={{...styles.placeholderBox, ...styles.spendingChart}}><AverageSpendingChart /></div>
      </div>
      <div style={styles.lowerContent}>
      <AccountSection />
      <div style={styles.tableWrapper}>
        <h2 style={styles.transactionHeader}>Recent Transactions</h2>
      <LightTransactionTable />
      </div>
      </div>
    </div>
  )
}

const styles = ({
  pageWrapper: {
    display: 'grid',
    gap: '60px',
    padding: '60px'
  },
  placeholderBox: {
    borderRadius: 10,
    backgroundColor: '#242424'
  },
  upperContent: {
    display: 'grid',
    gridTemplateColumns: '2fr 5fr',
    gridTemplateRows: 'repeat(2, 1fr)',
    gridGap: '60px',
    height: '400px'
  },
  lowerContent: {
    display: 'grid',
    gridTemplateColumns: '2fr 3fr',
    gridGap: '60px',
    height: '400px'
  },
  netWorth : {
    gridArea: '1 / 1 / 2 / 2'
  },
  spending: {
    gridArea: '2 / 1 / 3 / 2'
  },
  spendingChart: {
    gridArea: '1 / 2 / 3 / 3'
  },
  tableWrapper: {
    borderRadius: 10,
    backgroundColor: '#242424',
    padding: 40
  },
  transactionHeader:{
    margin: 0,
    paddingBottom: 40,
    color: '#ededed',
  }
})

export default Dashboard