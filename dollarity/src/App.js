import './App.css'; 
import {BrowserRouter} from 'react-router-dom';
import Views from './Views';
import AuthProvider from './AuthProvider';
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Views />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
