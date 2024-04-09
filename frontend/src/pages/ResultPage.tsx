import { useState } from "react";
import { quizTitleContainer } from "../styles/QuizStyle.css";

import { useNavigate } from "react-router-dom";
import {
  FlippedContainer,
  back,
  card,
  flip,
  flipped,
  front,
  qiuzDiv,
  resultAgainButton,
  resultBg,
  resultButtonDiv,
  resultCongratulation,
  resultContainer,
  resultDetailButton,
  resultImg,
  resultPageDetail,
  resultScoreBox,
  score,
  yourScoreTitle,
} from "../styles/ResultStyle.css";
import { quizs } from "./ResultDetail";

function ResultPage() {
  const [isFlipped, setIsFlipped] = useState(false);
  const navigate = useNavigate();
  const handleDetailButtonClick = () => {
    setIsFlipped(!isFlipped);
  };
  return (
    <div className={resultContainer}>
      <div>
        <div className={quizTitleContainer}>
          <div>
            <img
              className={resultBg}
              src="../../public/images/user_background_03.png"
              alt="TodayQuizBg"
            />
          </div>
          <p className={resultCongratulation}>Congratulation</p>
        </div>
        <p className={resultPageDetail}>
          오늘의 학습을 마쳤습니다 <br />
          상세보기를 눌러 정답을 확인하세요!
        </p>
      </div>
      <div className={flip}>
        <div className={resultScoreBox}>
          <div className={isFlipped ? `${card} ${flipped}` : card}>
            <img src="../../public/images/resultBg.png" className={resultImg} />
            <div className={front}>
              <p className={yourScoreTitle}>Your Score</p>
              <p className={score}>80</p>
            </div>
            <div className={back}>
              <div className={FlippedContainer}>
                {quizs.map((quiz, index) => (
                  <div className={qiuzDiv} key={index}>
                    <p>{quiz.question}</p>
                    <p>답변: {quiz.userAnswer}</p>
                    <p>정답: {quiz.correctAnswer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={resultButtonDiv}>
        <button className={resultAgainButton} onClick={() => navigate('/level')}>AGAIN</button>
        <button
          className={resultDetailButton}
          onClick={handleDetailButtonClick}
        >
          {isFlipped ? "점수보기" : "상세보기"}
        </button>
      </div>
    </div>
  );
}

export default ResultPage;
