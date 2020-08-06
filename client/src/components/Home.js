import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CSS/Home.css'

function Home() {
    const [top10, setTop10] = useState({
        topUsers: [],
        topScores: [],
        topTimes: []
    });
    let usersArray = [];
    let scoresArray = [];
    let timeArray = [];
    useEffect(() => {
        getApi();
        console.log("Page Loaded");
    }, [])

    const getApi = async () => {
        const res = await axios.get('/api');
        console.log(res.data.top10);
        console.log(res.data.top10[0].username);
        for (let i = 0; i < res.data.top10.length; i++) {
            usersArray.push(res.data.top10[i].username);
            scoresArray.push(res.data.top10[i].score);
            timeArray.push(`${res.data.top10[i].minutes}:${res.data.top10[i].seconds}`)
        }
        console.log(usersArray);
        setTop10({
            topUsers: usersArray,
            topScores: scoresArray,
            topTimes: timeArray
        })
    }
    console.log(top10.topScores);
    return (
        <div className='homeComp'>
            <div className='homeWrap'>
                <div className='homeContent'>
                    <h1 className='title'>Top 10 Scores:</h1>
                    <div className='leaderBoard'>
                        <ul className='users'>
                            <li className='tableTitle'>Username:</li>
                            <br />
                            {top10.topUsers.map((name) => (
                                <li key={name}>{name}</li>
                            ))}
                        </ul>
                        <ul className='scores'>
                            <li className='tableTitle'>Score:</li>
                            <br />
                            {top10.topScores.map((score, i) => (
                                <li key={i}>{score}</li>
                            ))}
                        </ul>
                        {/* <ul className='times'>
                            <li className='tableTitle'>Time:</li>
                            <br />
                            {top10.topTimes.map((time) => (
                                <li key={time}>{time}</li>
                            ))}
                        </ul> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
