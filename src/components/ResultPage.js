import React from 'react';
import '../css/ResultPage.css';

// ResultPage 컴포넌트: 최종 MBTI 결과와 이에 맞는 책 추천 목록을 보여주는 역할
const ResultPage = ({ mbtiResult, books, onSave }) => {
    // books 배열에서 사용자의 MBTI 결과에 맞는 책을 필터링하여 추천
    const filteredBooks = books.filter((book) => book.mbti === mbtiResult);

    return (
        <div className="result-page">
            {/* 사용자의 MBTI 결과를 표시 */}
            <h2>당신의 BBTI는!! {mbtiResult}</h2>

            {/* 추천 책 목록을 보여주는 부분 */}
            <h3>추천 목록</h3>
            <ul>
                {filteredBooks.map((book) => (
                    <li key={book.title}>
                        {/* 책 표지 이미지를 클릭하면 새로운 탭에서 책 링크로 이동 */}
                        <a href={book.link} target="_blank" rel="noopener noreferrer">
                            <img src={book.image} style={{width: '180px', height: 'auto'}} alt={book.title}/>
                        </a>
                        <h5>#{book.divison}</h5>
                        <h4>{book.title}</h4>
                        {/*/!* 책 제목을 클릭하면 새로운 탭에서 책 링크로 이동 *!/*/}
                        {/*<a href={book.link} target="_blank" rel="noopener noreferrer">*/}
                        {/*    {book.title}*/}
                        {/*</a>*/}
                    </li>
                ))}
            </ul>

            {/* '나의 결과 저장하기' 버튼: 클릭 시 부모 컴포넌트의 onSave 함수 호출 */}
            <button onClick={onSave}>나의 결과 저장하기</button>
        </div>
    );
};

export default ResultPage;
