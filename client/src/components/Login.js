import React, { useState } from 'react';
import axios from 'axios';
import './CSS/Login.css'

function Login() {
    const [loginDetails, setLoginDetails] = useState({
        userEmail: '',
        userPassword: ''
    });

    const [message, setMessage] = useState({
        message: ''
    });

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
        setMessage({
            message: res.data
        });
        console.log(res.data);

    }
    return (
        <div className='loginComp'>
            <div className='flex'>
                <h1 className='title'>Login Page</h1>
                <div className='formWrap'>
                <form className="loginForm">
                    <input name='userEmail' type='email' placeholder='EMAIL' onChange={setData} />
                    <input name='userPassword' type='password' placeholder='PASSWORD' onChange={setData} />
                    <button id='loginBtn'type='submit' onClick={submitForm} >Login</button>
                </form>
                </div>
                <h2 className='message'>{message.message}</h2>
            </div>
        </div>
    );
}

export default Login
