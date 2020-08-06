import React from 'react';
import './CSS/Login.css'

function Login(props) {
    return (
        <div className='loginComp'>
            <div className='flex'>
                <h1 className='title'>Login Page</h1>
                <div className='formWrap'>
                <form className="loginForm">
                    <input id='loginEmail' name='userEmail' type='email' placeholder='EMAIL' onChange={props.setData} />
                    <input id='loginPass'name='userPassword' type='password' placeholder='PASSWORD' onChange={props.setData} />
                    <button id='loginBtn'type='submit' onClick={props.submitForm} >Login</button>
                </form>
                </div>
                <h2 className='message'>{props.message}</h2>
            </div>
        </div>
    );
}

export default Login
