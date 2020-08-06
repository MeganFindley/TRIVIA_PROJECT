import React, { useState } from 'react';
import axios from 'axios';
import './CSS/Register.css'

function Register() {
    const [userDetails, setUserDetails] = useState({
        userName: '',
        userEmail: '',
        userPassword: '',
        confirmPass: ''
    });

    const [message, setMessage] = useState({
        message: ''
    })
    const setData = (e) => {
        setUserDetails({
            ...userDetails,
            [e.target.name]: e.target.value
        })
    }

    const submitForm = async (e) => {
        e.preventDefault();

        const body = JSON.stringify({
            userName: userDetails.userName,
            userEmail: userDetails.userEmail,
            userPassword: userDetails.userPassword,
            confirmPass: userDetails.confirmPass
        });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.post("/register", body, config);
        setMessage({
            message: res.data
        });
        console.log(res.data);
    }
    return (
        <div className='registerComp'>
            <div className='flex'>
                <h1 className='title'>Registration Form</h1>
                <div className='formWrap'>
                    <form className="regForm">
                        <input id='regNam'type='text' name='userName' onChange={setData} placeholder="Username" />
                        <input id='regEm'type='email' name='userEmail' onChange={setData} placeholder="Email" />
                        <input id='regP1'type='password' name='userPassword' onChange={setData} placeholder="Password" />
                        <input id='regP2'type='password' name='confirmPass' onChange={setData} placeholder="Confirm Password" />
                        <button id='regBtn'type='submit' onClick={submitForm}>Register</button>
                    </form>
                </div>
                <h2 className='message'>{message.message}</h2>
            </div>
        </div>
    )
}

export default Register
