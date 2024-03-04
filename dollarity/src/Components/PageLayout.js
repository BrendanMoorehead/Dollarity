import React from 'react'
import { Layout, Menu, theme } from 'antd';
import {LayoutFilled, AreaChartOutlined, SwapOutlined, WalletFilled} from '@ant-design/icons';
import NewTransactionFloatButton from './NewTransactionFloatButton';
import NewAccountForm from './NewAccountForm';
import NewAccountDrawer from './NewAccountDrawer';
const { Header, Content, Footer, Sider } = Layout;


function getItem(label, key, icon) {
  return {
    key,
    icon,
    label,
  };
}

const items = [
  getItem('Dashboard', '1', <LayoutFilled />), 
  getItem('Accounts', '2', <WalletFilled />),
  getItem('Transactions', '3', <SwapOutlined />),
  getItem('Spending', '4', <AreaChartOutlined />)
];

const PageLayout = () => {
  return (
    <Layout 
    style={styles.layout}>
      <Sider style={styles.sider} width={160}>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Content><NewAccountForm/></Content>
      <NewTransactionFloatButton />
      <NewAccountDrawer />
    </Layout>
  )
}

export const styles = {
  sider: {
    paddingTop: 80,
    backgroundColor: '#1c1c1c',
  },
  layout : {
    minHeight: '100vh',
    backgroundColor: '#0d0d0d'
  },
}

export default PageLayout