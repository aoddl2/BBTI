import React from 'react';
import '../css/StartPage.css';


const StartPage = ({ onStart }) => {
    return (
        <div className="start-page">
            <h2> BBTI 테스트</h2>
            <button onClick={onStart}>Start</button>
        </div>
    );
};

export default StartPage;
