import React, { useState } from 'react';
import axios from 'axios';

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
        <div>
            <h1>Logout Page</h1>
            <h2>{message.message}</h2>
            <form>
                <button type='submit' onClick={submitForm} >Logout</button>
            </form>
        </div>
    );
}

export default Logout