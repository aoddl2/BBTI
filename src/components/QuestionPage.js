import React from 'react';
import '../css/QuestionPage.css';

// QuestionPage 컴포넌트: 현재 질문과 답변 선택지를 보여주는 역할
const QuestionPage = ({ question, options, onAnswerSelect }) => {
    return (
        <div className="question-page">
            {/* 현재 질문을 보여주는 부분 */}
            <h2>Q1. {question}</h2>

            {/* 답변 선택지들을 보여주는 부분 */}
            <div className="options">
                {options.map((option, index) => (
                    // 각 답변 선택지에 대한 버튼을 생성하고, 클릭 시 onAnswerSelect 호출
                    <button key={index} onClick={() => onAnswerSelect(option)}>
                        {option.text} {/* 답변의 텍스트를 버튼에 표시 */}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QuestionPage;