import { Route, Routes, Navigate, Redirect } from 'react-router-dom';
import { Button, Layout, Menu, Popconfirm, message} from 'antd';
import LoginScreen from './Components/LoginScreen';
import Dashboard from './Components/Pages/Dashboard';
import { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import { useState } from 'react';

const items = new Array(15).fill(null).map((_, index) => ({
  key: index + 1,
  label: `nav ${index + 1}`,
}));

const { Header, Content, Sider } = Layout;

const item = {sub1: 'value', 2: 'test'};

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
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { login, logout, user, loading } = useContext(AuthContext);


  const handleLogout = async () => {
    setConfirmLoading(true);
    console.log("Signing out");
    await logout();
    setConfirmLoading(false);
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
          items={items}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
        {user ? ( 
          <Popconfirm
          placement='bottomRight'
          title="Logout"
          description="Are you sure to sign out?"
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
        <Sider width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={items}
          />
        </Sider>) : (<></>)}
        <Layout>
      <Content>
      <Routes>

          <Route path='' element={<LoginScreen />} />
          <Route path='/dashboard' element={<PrivateRoute> <Dashboard /> </PrivateRoute>} />
          {/* Nonexistent Routes */}
          <Route path="*" element={<div>404 not found</div>} />
      </Routes>
      </Content>
      </Layout>
      </Layout>
      </Layout>
  )
}

export default Views