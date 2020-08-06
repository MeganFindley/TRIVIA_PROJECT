import React, { useState, useEffect } from 'react';
import { Questionaire } from './Main';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import './CSS/quiz.css';

const API_URL = 'https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple'

function Quiz(props) {
    // ---- logged in info --------------------
    const [loggedin, setLoggedin] = useState({
        login: false,
        loading: true,
        username: ''
    });
    useEffect(() => {
        getApi();
    }, []);
    const getApi = async () => {
        const res = await axios.get('/hidden');
        console.log(res);
        setLoggedin({
            login: res.data.loggin,
            username: res.data.user,
            loading: false
        });
    }
    //--------------------------------------------
    const [questions, setQuestions] = useState([]);
    //console.log(questions);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showAnswers, setShowAnswers] = useState(false);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        fetch(props.url)
            .then((res) => res.json())
            .then((data) => {
                setQuestions(data.results);
            });
    }, []);

    const handleAnswer = async (answer) => {
        const newIndex = currentIndex + 1
        setCurrentIndex(newIndex);

        if (answer === questions[currentIndex].correct_answer) {
            setScore(score + 1);
        }

        setShowAnswers(true);
    };

    const scoreToDB = async (e) => {
        e.preventDefault();
        console.log('running quiz end')

        console.log(loggedin.username);
        const body = JSON.stringify({
            user: loggedin.username,
            score: score
        });
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const res = await axios.post("/quiz", body, config);

        console.log(res.data);
        setRedirect(true);

    }



    if (!loggedin.login && !loggedin.loading) {
        console.log('inside of redirect')
        return <Redirect to='/login' />
    }
    if (redirect) {
        return <Redirect to='/' />
    }
    //--------------------------------------------
    console.log(loggedin.username);
    return questions.length > 0 ? (<div className='quizComp'>
        <div className="container">
            {currentIndex >= questions.length ? (
                <div>
                    <h1 className="">
                        Game ended! Your score is: {score}.
                </h1>
                    <button className='button1' onClick={scoreToDB}>Add score to Leader Board</button>
                </div>
            ) : (
                    <div>
                        <Questionaire className="container"
                            data={questions[currentIndex]}
                            showAnswers={showAnswers}
                            handleAnswer={handleAnswer}
                        />
                    </div>
                )}
        </div>
    </div>
    ) : (<div className='quizComp'>
        <h2 className="container">Just loading...!</h2>
    </div>
        );

}

export default Quiz;