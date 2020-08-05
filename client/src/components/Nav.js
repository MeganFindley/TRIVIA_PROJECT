import React, {useEffect, useState} from 'react';
import {
    Link
} from "react-router-dom";
import axios from 'axios';
import './CSS/Nav.css';

function Nav() {
    // ---- logged in info --------------------
    const [loggedin, setLoggedin] = useState({
        login: false,
        loading: true,
        user: 'Please Login or Register'
    });
    useEffect(() => {
        getApi();
    }, []);
    const getApi = async () => {
        const res = await axios.get('/hidden');
        setLoggedin({
            login: res.data.loggin,
            loading: false,
            user: res.data.theUser
        });
        console.log(loggedin.user);
    }
    // --------------------------------------------
    return (
        <div className='navComp'>
            <ul className='navList'>
                <li><Link tag='li' to="/"><span>Home</span></Link></li>
                <li><Link tag='li' to="/questions"><span>Quiz</span></Link></li>
                <li><Link tag='li' to="/logout"><span>Logout</span></Link></li>
                <li><Link tag='li' to="/login"><span>Login</span></Link></li>
                <li><Link tag='li' to="/register"><span>Register</span></Link></li>
            </ul>
            {/* <ul className='logInd'>
                <li><span>{loggedin.user}</span></li>
            </ul> */}
            
        </div>
    )
}

export default Nav
