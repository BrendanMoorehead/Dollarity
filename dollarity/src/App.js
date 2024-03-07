import './App.css'; 
import PageLayout from './Components/PageLayout';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Onboarding from './Components/Pages/Onboarding';
import LoginForm from './Components/LoginForm';
import AuthenticationPage from './Components/Pages/AuthenticationPage';
function App() {
  return (
    <AuthenticationPage/>
  );
}

export default App;
