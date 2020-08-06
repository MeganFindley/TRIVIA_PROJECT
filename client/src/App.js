import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  const [loggedin, setLoggedin] = useState({
    user: 'Please Login or Register',
    login: false,
    loading: true,
  });
  useEffect(() => {
    getApi();
  }, []);
  const getApi = async () => {
    const res = await axios.get('/hidden');
    console.log(res);
    setLoggedin({
      login: res.data.loggin,
      loading: false,
    });
    //console.log(loggedin.user);
  }
  const [loginDetails, setLoginDetails] = useState({
    userEmail: '',
    userPassword: ''
});

const [message, setMessage] = useState('');

const setData = (e) => {
    setLoginDetails({
        ...loginDetails,
        [e.target.name]: e.target.value
    })
}

const submitForm = async (e) => {
    e.preventDefault();

    const body = JSON.stringify({
        userEmail: loginDetails.userEmail,
        userPassword: loginDetails.userPassword
    });

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const res = await axios.post("/login", body, config);
    console.log(res.data);
    console.log(res.data.user);
    const userIn = res.data.user;
    console.log(userIn);
    setMessage(res.data.message);
    if(res.data.message === `${res.data.user} is logged in`){
    setLoggedin({
      user: `Current User: ${userIn}`,
      login: true,
    })}
    setOutMessage('');

}
const [outMessage, setOutMessage] =useState('');
const outSubmitForm = async (e) => {
  e.preventDefault();

  const body = {};

  const config = {
      headers: {
          'Content-Type': 'application/json'
      }
  };

  const res = await axios.post("/logout", body, config);
  setOutMessage(res.data);
  if (res.data === 'User logged out'){
    setLoggedin({
      login: false,
      user: 'Please login or register'
    })
    setMessage('')
  }
  console.log(res.data);
  
}
  return (
    <React.Fragment>
        <BrowserRouter>
          <Nav login={loggedin.login} user={loggedin.user} />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' render={()=> <Login submitForm={submitForm} setData={setData} message={message}/>} />
            <Route exact path="/questions" component={Question} />
            <Route exact path='/quiz' component={Quiz} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/logout' render={()=> <Logout submitForm={outSubmitForm} message={outMessage}/>} />
          </Switch>
        </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
