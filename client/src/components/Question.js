import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";

function Question() {
    
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

    const [redirect, setRedirect] =useState({
        redirect: false
    });
    console.log(redirect);

    const [quizDetails, setQuizDetails] = useState({
        amount: '10',
        category: '9',
        difficulty: 'easy'
    });

    const setData = (e) => {
        setQuizDetails({
            ...quizDetails,
            [e.target.name]: e.target.value
        })
    }

    const submitForm = async (e) => {
        e.preventDefault();

        const body = JSON.stringify({
            amount: quizDetails.amount,
            category: quizDetails.category,
            difficulty: quizDetails.difficulty
        });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.post("/questions", body, config);
        console.log(res.data);

        setRedirect({
            redirect: true
        })
    }

    // -----Log in check-----------------------
    if (!loggedin.login && !loggedin.loading) {
        console.log('inside of redirect')
        return <Redirect to='/login' />
    }
    else if(redirect.redirect){
        return <Redirect to={{
            pathname:'/questions',
            state: {
                amount: quizDetails.amount, 
                category: quizDetails.category,
                difficulty: quizDetails.difficulty
             }
        }}/>
    }
    //------------------------------------------
    return (
        <div>
            <h1>Trivia Quiz Set Up</h1>
            <h2>Only Visable to logged in users</h2>
            <form className="quizForm">
                <label>No. of Questions: </label>
                <input type='number' name='amount'defaultValue='10' min='5' max='50' onChange={setData}/>
                <label>Categories: </label>
                <select name='category' onChange={setData}>
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
                <label>Difficulty: </label>
                <select name='difficulty' onChange={setData}>
                    <option defaultValue="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
                <button type='submit' onClick={submitForm}>Make Quiz</button>
            </form>
        </div>
    )
}

export default Question
