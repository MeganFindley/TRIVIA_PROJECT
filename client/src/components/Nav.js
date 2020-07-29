import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from "react-router-dom";
import Register from './Register';
import Question from './Question';
import Home from './Home';
import Quiz from './Quiz';
import Login from './Login';

function Nav() {
    return (
        <div>
            <Router>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/questions">Question</Link></li>
                    <li><Link to="/quiz">Quiz</Link></li>
                    <li><Link to="/register">Register</Link></li>
                </ul>
                <div className='wrapper'>
                    <Route exact path='/' component={Home} />
                    <Route path='/login' component={Login} />
                    <Route path='/questions' component={Question} />
                    <Route path='/quiz' component={Quiz} />
                    <Route path='/register' component={Register} />
                </div>
            </Router>
        </div>
    )
}

export default Nav
