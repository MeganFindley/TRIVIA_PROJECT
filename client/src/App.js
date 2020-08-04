import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Route,
  Switch
} from "react-router-dom";
import Nav from './components/Nav';
import Register from './components/Register';
import Question from './components/Question';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Login from './components/Login';
import Logout from './components/Logout';

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
      <Nav />
      <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path="/questions" component={Question} />
          <Route exact path='/quiz' component={Quiz} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/logout' component={Logout} />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
