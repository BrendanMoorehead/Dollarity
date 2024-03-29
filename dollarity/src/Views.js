import { Route, Routes, Navigate, Redirect, Link, useNavigate } from 'react-router-dom';
import { Button, Layout, Menu, Popconfirm, message, FloatButton, Tooltip, Modal} from 'antd';
import LoginScreen from './Components/LoginScreen';
import Dashboard from './Components/Pages/Dashboard';
import { useContext, useEffect } from 'react';
import { AuthContext } from './AuthProvider';
import { DataContext } from './DataProvider';
import { useState } from 'react';
import { PlusOutlined, DatabaseFilled, CreditCardFilled } from '@ant-design/icons';
import NewAccountForm from './Components/NewAccountForm';
import NewTransactionForm from './Components/NewTransactionForm';
import TransactionPage from './Components/Pages/TransactionPage';
import useFetchAccounts from './Hooks/useFetchAccounts';
const items = new Array(15).fill(null).map((_, index) => ({
  key: index + 1,
  label: `nav ${index + 1}`,
}));

const { Header, Content, Sider } = Layout;




const PrivateRoute = ({children, ...rest }) => {
  
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return <div>Loading...</div>;
  }
  console.log("Private Route Attempt: " + user);
  if (!user) return (<Navigate to='/' replace />);
  return children;
};

const Views = () => {
  const navigate = useNavigate();
  const { login, logout, user, loading } = useContext(AuthContext);
  const {accounts, isLoading, error} = useFetchAccounts();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [newAccountModal, setNewAccountModal] = useState(false);
  const [newTransactionModal, setNewTransactionModal] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState(['1']);
  

  const [accountChildren, setAccountChildren] = useState([]);

  useEffect(() => {
    if (!isLoading && !loading && accounts.length > 0){
      setAccountChildren(
        accounts.map((account) => {
          return {
            key: account.id,
            label: account.name,
            path: `/accounts/${account.id}`
          }
        })
      );
    }
  }, [isLoading, accounts, loading, user]);

  const item = [
    {key: '/dashboard', label: "Dashboard", path: '/dashboard'}, 
    {key: '/transactions', label: "Transactions", path: '/transactions'},
    {key: '/accounts', label: "Accounts", path: '/accounts',
      children: accountChildren
  },  
  ];


  const handleLogout = async () => {
    setConfirmLoading(true);
    console.log("Signing out");
    await logout();
    setConfirmLoading(false);
  };

  const handleMenuClick = (e) => {
    console.log("Menu clicked", e);
    navigate(e.key); // Update selected key when a menu item is clicked
  };

  const showNewAccountModal = () => {
    setNewAccountModal(true);
  }
  
  const hideNewAccountModal = () => {
    setNewAccountModal(false);
  };


  const showNewTransactionModal = () => {
    setNewTransactionModal(true);
  }
  
  const hideNewTransactionModal = () => {
    setNewTransactionModal(false);
  };
  const cancel = (e) => {
    console.log("Logout cancelled");
  };

  return (
    
    <Layout>
      <Header style={{
          display: 'flex',
          alignItems: 'center',
        }}>
      <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
        {user ? ( 
          <Popconfirm
          placement='bottomRight'
          title="Logout"
          description="Are you sure you want to sign out?"
          onConfirm={handleLogout}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
          okButtonProps={{
            loading: confirmLoading,
          }}
          >
          <Button>Logout</Button>
          </Popconfirm>
          ) : (<></>)}
      </Header>
      
      <Layout>
      {user ? (
        <Sider width={200} height={600}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={item}
            onClick={handleMenuClick}
          >{item.map(menuItem => (
            <Menu.Item key={menuItem.key}>
              <Link to={menuItem.path}>{menuItem.label}</Link>
            </Menu.Item>
          ))} </Menu>
        </Sider>) : (<></>)}
        <Layout>
      <Content>
      <FloatButton.Group>
        <Tooltip placement="left" title={<span>Add account</span>}>
        <FloatButton size='large' icon={<CreditCardFilled />} type='primary' onClick={showNewAccountModal} />
        </Tooltip>
        <Tooltip placement="left" title={<span>Add transaction</span>}>
        <FloatButton size='large' icon={<DatabaseFilled />} type='primary' onClick={showNewTransactionModal} />
        </Tooltip>
      </FloatButton.Group>
      <Routes>
          <Route path='' element={<LoginScreen />} />
          <Route path='/dashboard' element={<PrivateRoute> <Dashboard /> </PrivateRoute>} />
          <Route path='/transactions' element={<PrivateRoute> <TransactionPage /> </PrivateRoute>} />
          {/* Nonexistent Routes */}
          <Route path="*" element={<div>404 not found</div>} />
      </Routes>

      <Modal open={newAccountModal} footer={null} onCancel={hideNewAccountModal}>
        <NewAccountForm hideNewAccountModal={hideNewAccountModal}/>
      </Modal>

      <Modal open={newTransactionModal} footer={null} onCancel={hideNewTransactionModal}>
        <NewTransactionForm hideNewTransactionModal={hideNewTransactionModal}/>
      </Modal>

      </Content>
      </Layout>
      </Layout>
      </Layout>
  )
}

export default Views