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
          colorPrimary: '#a3ffdd',
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
