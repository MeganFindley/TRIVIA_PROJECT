import React from 'react';
import './CSS/Logout.css'

function Logout(props) {
    return (
        <div className='logoutComp'>
            <div className='logoutPage'>
            <h1 className='title'>Logout Page</h1>
            <form className='loginForm'>
                <button id='logoutBtn'type='submit' onClick={props.submitForm} >Logout</button>
            </form>
            <h2 className='message'>{props.message}</h2>
            </div>
        </div>
    );
}

export default Logout