import React from 'react';
import {
    Link
} from "react-router-dom";

function Nav() {
    return (
        <div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/questions">Question</Link></li>
                    <li><Link to="/quiz">Quiz</Link></li>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/logout">Logout</Link></li>
                </ul>
        </div>
    )
}

export default Nav
