import React, {useState, useEffect} from 'react';
import {Questionaire} from './Main';

import './quiz.css'

const API_URL = 'https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple'

function Quiz() {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] =useState(0);
    const [showAnswers, setShowAnswers] = useState(false);
    
    useEffect(() => {
        fetch(API_URL)
        .then((res) => res.json())
        .then((data) => {
            setQuestions(data.results);
        });
    }, []);

    const handleAnswer = (answer) => {
        const newIndex = currentIndex +1
        setCurrentIndex(newIndex);

        if(answer === questions[currentIndex].
        correct_answer){
            setScore(score + 1);
        }

        setShowAnswers(true);

        // const newIndex = currentIndex +1
        // setCurrentIndex(newIndex);
    };

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