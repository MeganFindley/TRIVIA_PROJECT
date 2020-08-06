import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import Quiz from "./Quiz"
import './CSS/Question.css'

function Question() {

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
        console.log(res.data.user.username);
        setLoggedin({
            login: res.data.loggin,
            username: res.data.user.username,
            loading: false
        });
    }
    //--------------------------------------------

    const [redirect, setRedirect] = useState({
        redirect: false
    });

    const [quizDetails, setQuizDetails] = useState({
        amount: '10',
        category: '9',
        difficulty: 'easy'
    });

    // const [questions, setQuestions] = useState([]);

    const [apiLink, setApiLink] = useState('https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple')

    const setData = (e) => {
        setQuizDetails({
            ...quizDetails,
            [e.target.name]: e.target.value
        })
    }

    const submitForm = async (e) => {
        e.preventDefault();
        setApiLink(`https://opentdb.com/api.php?amount=${quizDetails.amount}&category=${quizDetails.category}&difficulty=${quizDetails.difficulty}&type=multiple`)

        // const API_URL = `https://opentdb.com/api.php?amount=${quizDetails.amount}&category=${quizDetails.category}&difficulty=${quizDetails.difficulty}&type=multiple`


        // fetch(API_URL)
        //     .then((res) => res.json())
        //     .then((data) => {
        //         console.log(data.results);
        //         setQuestions(...questions, data.results);
        //     });




        setRedirect({
            redirect: true
        })
    }

    // -----Log in check-----------------------
    if (!loggedin.login && !loggedin.loading) {
        console.log('inside of redirect')
        return <Redirect to='/login' />
    }
    else if (redirect.redirect) {
        return (
            <div>
                <Quiz url={apiLink} />
            </div>
        )
    }

    //------------------------------------------
    console.log(loggedin);
    return (
        <div className='quizComp'>
            <div className='flex'>
            <h1 className='title'>Trivia Quiz Set Up</h1>
            <h2 className='quizMessage'>{loggedin.username} please choose your quiz:</h2>
            <div className='formWrap'>
            <form className="quizForm">
                <div className='flexStart'>
                <label className='quizLabel'>No. of Questions: </label>
                <br/>
                <label className='quizLabel'>Categories: </label>
                <br/>
                <label className='quizLabel'>Difficulty: </label>
                </div>
                <div className='flexEnd'>      
                <input id='amou' className='quizBtns' type='number' name='amount' defaultValue='10' min='5' max='50' onChange={setData} />  
                <br/>    
                <select id='cate' className='quizBtns' name='category' onChange={setData}>
                    <option defaultValue="9" >General Knowledge</option>
                    <option value="10">Books</option>
                    <option value="11">Film</option>
                    <option value="12">Music</option>
                    <option value="13">Musicals & Theatre</option>
                    <option value="14">TV</option>
                    <option value="15">Video Games</option>
                    <option value="16">Board Games</option>
                    <option value="17">Science & Nature</option>
                    <option value="18">Computers</option>
                    <option value="19">Mathematics</option>
                    <option value="20">Mythology</option>
                    <option value="21">Sports</option>
                    <option value="22">Geography</option>
                    <option value="23">History</option>
                    <option value="24">Politics</option>
                    <option value="25">Art</option>
                    <option value="26">Celebrities</option>
                    <option value="27">Animals</option>
                    <option value="28">Vehicles</option>
                    <option value="29">Comics</option>
                    <option value="30">Gadgets</option>
                    <option value="31">Anime & Manga</option>
                    <option value="32">Cartoon & Animations</option>
                </select>
                <br/>
                <select id='diff' className='quizBtns'name='difficulty' onChange={setData}>
                    <option defaultValue="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
                </div>
                <div className='btnWrap'>
                <button id='quizBtn' type='submit' onClick={submitForm}>Make Quiz</button>
                </div>
            </form>
            </div>
            </div>
        </div>
    )
}

export default Question
