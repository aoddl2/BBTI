import React, { useState } from 'react';
import { questions, books } from './data';
import QuestionPage from './components/QuestionPage';
import ResultPage from './components/ResultPage';
import StartPage from './components/StartPage';
import Modal from './components/Modal';
import axios from 'axios'; // 서버와의 통신을 위한 axios 라이브러리

const App = () => {
  // 질문 페이지에서 현재 위치한 질문의 인덱스 상태
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // 사용자가 선택한 답변을 저장하는 상태 (각각의 MBTI 유형을 저장)
  const [answers, setAnswers] = useState([]);

  // 최종적으로 계산된 MBTI 결과를 저장하는 상태
  const [mbtiResult, setMbtiResult] = useState(null);

  // 모달(팝업)이 표시되는지 여부를 관리하는 상태
  const [showModal, setShowModal] = useState(false);

  // 시작 페이지가 표시되는지 여부를 관리하는 상태
  const [showStartPage, setShowStartPage] = useState(true);

  // 시작 페이지로 돌아가기
  const reset = () => {
    setCurrentQuestionIndex(0); // 질문 초기화
    setAnswers([]); // 저장된 답변 초기화
    setMbtiResult(null); // BBTI 결과 초기화
    setShowStartPage(true); // 시작페이지 표시
  }

  // 시작 버튼 클릭 시 호출, 시작 페이지를 숨기고 질문 페이지를 표시
  const handleStart = () => {
    setShowStartPage(false); // 질문을 시작할 때 시작 페이지를 숨김
  };

  // 사용자가 질문에 답변을 선택할 때 호출되는 함수
  const handleAnswerSelect = (option) => {
    // 기존 답변 배열에 사용자가 선택한 답변 추가
    const newAnswers = [...answers, option.value];
    setAnswers(newAnswers); // 상태 업데이트

    // 다음 질문으로 이동, 만약 마지막 질문이라면 MBTI 결과 계산
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1); // 다음 질문으로 이동
    } else {
      calculateMBTIResult(newAnswers); // 마지막 질문의 답변 후 MBTI 계산
    }
  };

  // 사용자가 선택한 답변을 바탕으로 MBTI 결과를 계산하는 함수
  const calculateMBTIResult = (finalAnswers) => {
    // 선택된 답변들을 모두 합쳐 MBTI 문자열을 생성
    const result = finalAnswers.join('');
    setMbtiResult(result); // 계산된 MBTI 결과를 상태로 저장
  };

  // '결과 저장' 버튼 클릭 시 모달 창을 표시하는 함수
  const handleSave = () => {

    setShowModal(true); // 모달을 열어 학번을 입력받기
  };

  // 학번을 입력한 후 '저장' 버튼 클릭 시 서버로 데이터를 보내는 함수
  const handleModalSubmit = async (studentId) => {
    // 서버로 보낼 데이터 구성: MBTI 결과와 학번
    const data = {
      // mbtiResult: mbtiResult,
      studentId: studentId,
    };

    try {
      // 서버 URL로 POST 요청을 통해 데이터를 전송
      const response = await axios.post('https://ebook.yjc.ac.kr/api/', data);
      alert('이벤트 참여가 성공적으로 되었습니다!');
    } catch (error) {
      alert('이미 참여한 이벤트입니다!') // 중복 참여 에러 메시지 처리
    } finally {
      setShowModal(false); // 서버 요청 후 모달 창 닫기
    }
  };

  return (
      <div className="app">
        {showStartPage ? (
            // 시작 페이지를 보여주며, onStart가 실행되면 질문 페이지로 전환
            <StartPage onStart={handleStart} />
        ) : !mbtiResult ? (
            // MBTI 결과가 없으면 질문 페이지를 보여줌
            <QuestionPage
                question={questions[currentQuestionIndex].question}
                options={questions[currentQuestionIndex].options}
                currentQuestionIndex={currentQuestionIndex}
                totalQuestions={questions.length}
                onAnswerSelect={handleAnswerSelect}
            />
        ) : (
            // BBTI 결과가 있으면 결과 페이지를 보여줌
            <ResultPage mbtiResult={mbtiResult} books={books} onSave={handleSave} onReset={reset}/>
        )}

        {/* 모달 창이 열려 있을 때 표시 */}
        {showModal && <Modal onSubmit={handleModalSubmit} onClose={() => setShowModal(false)} />}
      </div>
  );
};

export default App;