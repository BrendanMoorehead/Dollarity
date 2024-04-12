import './App.css'; 
import {BrowserRouter} from 'react-router-dom';
import Views from './Views';
import AuthProvider from './AuthProvider';
import DataProvider from './DataProvider';
import { ConfigProvider, theme } from 'antd';

function App() {

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#00c936',
          colorSecondary: '#a3ffdd'
        },
        algorithm: theme.darkAlgorithm,
        Layout: {
          headerBg: 'blue'
        }
      }}
    >
      <BrowserRouter>
        <AuthProvider>
          <DataProvider>
          <Views />
          </DataProvider>
        </AuthProvider>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
