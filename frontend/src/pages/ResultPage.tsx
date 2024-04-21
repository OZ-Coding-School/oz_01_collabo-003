import { useEffect, useState } from "react";
import { quizTitleContainer } from "../styles/QuizStyle.css";

import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import {
  FlippedContainer,
  back,
  card,
  flip,
  flipped,
  front,
  qiuzDiv,
  resultAgainButton,
  resultBackground,
  resultBg,
  resultButtonDiv,
  resultCongratulation,
  resultContainer,
  resultDetailButton,
  resultPageDetail,
  resultScoreBox,
  score,
  yourScoreTitle,
} from "../styles/ResultStyle.css";

function ResultPage() {
  useEffect(() => {
    handleSubmit();
  }, []);

  interface result {
    id: number;
    answer: string;
    orderNum: number;
    feedback: string;
    score: number;
    category: number;
  }

  const [result, setResult] = useState<result[]>([]);
  const totalScore = result.reduce((accumulator, currentResult) => {
    return accumulator + currentResult.score;
  }, 0);
  console.log(result);
  const [isFlipped, setIsFlipped] = useState(false);
  const navigate = useNavigate();

  const handleDetailButtonClick = () => {
    setIsFlipped(!isFlipped);
  };
  const handleSubmit = () => {
    async function FetchPostQuiz() {
      const url = `/api/v1/gpt/feedback/${localStorage.getItem("id")}/`;
      try {
        const response = await axios.get(
          url,


          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        console.log(response.data);

        if (response.status === 200) {
          console.log("문제,정답 보내기 성공!");
          setResult(response.data);
          localStorage.setItem("feedback", JSON.stringify(response.data));
          console.log(url);
        } else if (response.status === 400) {
          console.log("문제,정답 보내기 실패");
        }
      } catch (error) {
        console.log(error);
        console.log(url);
      }
    }
    FetchPostQuiz();
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
          <p className={resultCongratulation}>Congratulation!</p>
        </div>
        <p className={resultPageDetail}>
          오늘의 학습을 마쳤습니다 <br />
          상세보기를 눌러 정답을 확인하세요!
        </p>
      </div>
      <div className={flip}>
        <div className={resultScoreBox}>
          <div className={isFlipped ? `${card} ${flipped}` : card}>
            <div className={resultBackground} />
            <div className={front}>
              <p className={yourScoreTitle}>Your Score</p>

              <p className={score}>{totalScore}</p>
            </div>
            <div className={back}>
              <div className={FlippedContainer}>
                {result.map((item, index) => (
                  <div className={qiuzDiv} key={index}>
                    <p>{item.category}</p>
                    <p>답변: {item.answer}</p>
                    <p>정답: {item.feedback}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={resultButtonDiv}>
        <button
          className={resultAgainButton}
          onClick={() => navigate("/level")}
        >
          AGAIN
        </button>
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
