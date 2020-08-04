import React, { useState } from 'react';
import axios from 'axios';

function Register() {
    const [userDetails, setUserDetails] = useState({
        userName: '',
        userEmail: '',
        userPassword: '',
        confirmPass: ''
    });

    const [message, setMessage] =useState({
        message:'' 
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
        <div>
            <h1>Registration Form</h1>
            <h2>{message.message}</h2>
            <form className="regForm">
                <input type='text' name='userName' onChange={setData} placeholder="USERNAME" />
                <input type='email' name='userEmail' onChange={setData} placeholder="EMAIL" />
                <input type='password' name='userPassword' onChange={setData} placeholder="PASSWORD" />
                <input type='password' name='confirmPass' onChange={setData} placeholder="CONFIRM PASSWORD" />
                <button type='submit' onClick={submitForm}>Register</button>
            </form>
        </div>
    )
}

export default Register
