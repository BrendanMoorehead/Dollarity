import './App.css'; 
import {BrowserRouter} from 'react-router-dom';
import Views from './Views';
import AuthProvider from './AuthProvider';
import DataProvider from './DataProvider';
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
        <Views />
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
