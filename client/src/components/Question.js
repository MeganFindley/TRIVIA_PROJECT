import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Question() {
    const [questions, setQuestions] = useState({
        q1: '',
        q1Ans: '',
        q2: '',
        q2Ans: '',
        q3: '',
        q3Ans: ''
    });

    useEffect(() => {
        getApi();
        console.log("Page Loaded");
    }, [])

    const getApi = async () => {
        const res = await axios.get('https://opentdb.com/api.php?amount=3');
        console.log(res.data);

        setQuestions({
            q1: res.data.results[0].question,
            q1Ans: res.data.results[0].correct_answer,
            q2: res.data.results[1].question,
            q2Ans: res.data.results[1].correct_answer,
            q3: res.data.results[2].question,
            q3Ans: res.data.results[2].correct_answer
        })
        console.log(questions);
    }
    return (
        <div>
            <h1>Trivia Questions Examples</h1>
            <h3>{questions.q1}</h3>
            <h3>{questions.q1Ans}</h3>
            <h3>{questions.q2}</h3>
            <h3>{questions.q2Ans}</h3>
            <h3>{questions.q3}</h3>
            <h3>{questions.q3Ans}</h3>
        </div>
    )
}

export default Question
