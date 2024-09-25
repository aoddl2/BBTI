import React from 'react';
import '../css/ResultPage.css';

// ResultPage 컴포넌트: 최종 MBTI 결과와 이에 맞는 책 추천 목록을 보여주는 역할
const ResultPage = ({mbtiResult, books, bbtiTypes, onSave, onReset}) => {
    // books 배열에서 사용자의 MBTI 결과에 맞는 책을 필터링하여 추천
    const filteredBooks = books.filter((book) => book.mbti === mbtiResult);
    const filteredBBTI = bbtiTypes.filter((bbti) => bbti.mbti === mbtiResult);

    return (
        <div className="result-page page">
            <div className="result-section">
                {/* 사용자의 MBTI 결과를 표시 */}
                <p className="result-intro">나의 BBTI는</p>
                <p className="result-title">{mbtiResult}</p>
                {filteredBBTI.length > 0 && (
                    <p className="result-text">{filteredBBTI[0].text}</p>
                )}
                <p className="result-text">아래 책을 추천해 드릴게요!</p>

                {/* 추천 책 목록을 보여주는 부분 */}
                <div className="books-section">
                    {filteredBooks.map((book) => (
                        <div className="book" key={book.title}>
                            {/* 책 표지 이미지를 클릭하면 새로운 탭에서 책 링크로 이동 */}
                            <a href={book.link} target="_blank" rel="noopener noreferrer">
                                <img src={book.image} style={{width: '180px', height: 'auto'}} alt={book.title}/>
                            </a>
                            <p className="book-tags">#{book.divison}</p>
                            <p className="book-title">{book.title}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="buttons-section">
                <button className="black-btn" onClick={onSave}>이벤트 참여하기</button>
                <button className="black-btn" onClick={onReset}>테스트 다시 하기</button>
            </div>
        </div>
    );
};

export default ResultPage;
