import React, { useState } from 'react';
import axios from 'axios';
import './CSS/Logout.css'

function Logout() {
    const [message, setMessage] =useState({
        message:'' 
    });
    const submitForm = async (e) => {
        e.preventDefault();

        const body = {};

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.post("/logout", body, config);
        setMessage({
            message: res.data
        });
        console.log(res.data);
        
    }
    return (
        <div className='logoutComp'>
            <h1 className='title'>Logout Page</h1>
            <form className='loginForm'>
                <button type='submit' onClick={submitForm} >Logout</button>
            </form>
            <h2 className='message'>{message.message}</h2>
        </div>
    );
}

export default Logout