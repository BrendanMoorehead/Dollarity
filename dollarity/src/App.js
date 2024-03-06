import './App.css'; 
import PageLayout from './Components/PageLayout';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Onboarding from './Components/Pages/Onboarding';

function App() {
  return (
    <Router>
        <Switch>
          <Route path='/'>
            <Onboarding />
          </Route>
          <Route path='/dashboard'>
            <PageLayout/>
          </Route>
        </Switch>
    </Router> 
  );
}

export default App;
