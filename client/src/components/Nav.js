import React, {useEffect, useState} from 'react';
import {
    Link
} from "react-router-dom";
import axios from 'axios';

function Nav() {
    // ---- logged in info --------------------
    // const [loggedin, setLoggedin] = useState({
    //     login: false,
    //     loading: true
    // });
    // useEffect(() => {
    //     getApi();
    // }, []);
    // const getApi = async () => {
    //     const res = await axios.get('/hidden');
    //     setLoggedin({
    //         login: res.data.loggin,
    //         loading: false
    //     });
    // }
    //--------------------------------------------
    return (
        <div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/questions">Quiz</Link></li>
                <li><Link to="/logout">Logout</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>

            </ul>
        </div>
    )
}

export default Nav
