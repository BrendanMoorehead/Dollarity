import './App.css'; 
import PageLayout from './Components/PageLayout';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Onboarding from './Components/Pages/Onboarding';
import LoginForm from './Components/LoginForm';
function App() {
  return (
    <LoginForm/>
  );
}

export default App;
