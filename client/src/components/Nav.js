import React, { useEffect, useState } from 'react';
import {
    Link
} from "react-router-dom";
import axios from 'axios';
import './CSS/Nav.css';

function Nav(props) {
    console.log(props);
    return (
        <div className='navComp'>
            <ul className='navList'>
                <li><Link tag='li' to="/"><span>Home</span></Link></li>
                {props.login ? <li><Link tag='li' to="/questions"><span>Quiz</span></Link></li> : null}
                {props.login ? <li><Link tag='li' to="/logout"><span>Logout</span></Link></li> : null}
                {props.login ? null : <li><Link tag='li' to="/login"><span>Login</span></Link></li>}
                {props.login ? null : <li><Link tag='li' to="/register"><span>Register</span></Link></li>}
            </ul>
            <ul className='logInd'>
                <li>{props.user}</li>
            </ul>

        </div>
    )
}

export default Nav
