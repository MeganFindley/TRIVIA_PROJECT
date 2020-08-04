import React, { useState, useEffect } from 'react';
import { Questionaire } from './Main';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import './quiz.css'

//const API_URL = 'https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple'

function Quiz(props) {
    const [questions] = useState({
        questions: props.quizData
    });
    //console.log(questions);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showAnswers, setShowAnswers] = useState(false);

    // useEffect(() => {
    //     fetch(API_URL)
    //         .then((res) => res.json())
    //         .then((data) => {
    //             setQuestions(data.results);
    //         });
    // }, []);

    const handleAnswer = (answer) => {
        const newIndex = currentIndex + 1
        setCurrentIndex(newIndex);

        if (answer === questions[currentIndex].
            correct_answer) {
            setScore(score + 1);
        }

        setShowAnswers(true);

        // const newIndex = currentIndex +1
        // setCurrentIndex(newIndex);
    };
     // ---- logged in info --------------------
     const [loggedin, setLoggedin] = useState({
        login: false,
        loading: true
    });
    useEffect(() => {
        getApi();
    }, []);
    const getApi = async () => {
        const res = await axios.get('/hidden');
        setLoggedin({
            login: res.data.loggin,
            loading: false
        });
    }
    //--------------------------------------------
    if (!loggedin.login && !loggedin.loading) {
        console.log('inside of redirect')
        return <Redirect to='/login' />
    }
    //--------------------------------------------
    return questions.length > 0 ? (
        <div className="container">
            {currentIndex >= questions.length ? (
                <h1 className="">
                    Game ended! Your score is: {score}.
                </h1>
            ) : (
                    <Questionaire className="container"
                        data={questions[currentIndex]}
                        showAnswers={showAnswers}
                        handleAnswer={handleAnswer}
                    />
                )}
        </div>
    ) : (
            <h2 class="container">Just loading...!</h2>
        );

}

export default Quiz;