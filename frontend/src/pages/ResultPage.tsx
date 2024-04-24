import { useEffect, useState } from "react";
import { quizTitleContainer } from "../styles/QuizStyle.css";

import { useLocation, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import {
  FlippedContainer,
  back,
  border,
  card,
  feedBack,
  flip,
  flipped,
  front,
  qiuzDiv,
  resultAgainButton,
  resultAnswer,
  resultBackground,
  resultBg,
  resultButtonDiv,
  resultCongratulation,
  resultContainer,
  resultDetailButton,
  resultMargin,
  resultNum,
  resultPageDetail,
  resultScoreBox,
  score,
  yourScoreTitle,
} from "../styles/ResultStyle.css";

function ResultPage() {
  const location = useLocation();
  console.log(location.state.id);
  interface result {
    id: number;
    answer: string;
    orderNum: number;
    feedback: string;
    score: number;
    category: number;
    gptanswer: string;
  }
  const [result, setResult] = useState<result[]>([]);
  const [isLoading, setIsLoading] = useState(false); //고치기
  const [isFlipped, setIsFlipped] = useState(false);
  
  const totalScore = result.reduce((accumulator, currentResult) => {
    return accumulator + currentResult.score;
  }, 0);
  console.log(result);
  const navigate = useNavigate();

  const handleDetailButtonClick = () => {
    setIsFlipped(!isFlipped);
  };
  const handleGetResult = () => {
    async function FetchGetResult() {
      const url = `/api/v1/gpt/feedback/${
        location.state.id ? location.state.id : localStorage.getItem("id")
      }/`;
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        console.log(response.data);
        if (response.status === 200) {
          console.log("결과 가져오기 성공!");
          setResult(response.data);
          setIsLoading(false);
        } else if (response.status === 400) {
          console.log("결과 가져오기 실패");
        }
      } catch (error) {
        console.log(error);
        console.log(url);
      }
    }
    FetchGetResult();
  };

  useEffect(() => {
    handleGetResult();
  }, []);

  if (isLoading) return <div>로딩중...</div>;
  else {
    return (
      <div className={resultContainer}>
        <div>
          <div className={quizTitleContainer}>
            <div>
              <img
                className={resultBg}
                src="images/user_background_03.png"
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
                  {result.map((item, index: number) => (
                    <div className={qiuzDiv} key={index}>
                      <p className={resultNum}>문제{index + 1}</p>

                      {/* <p>{item.category}</p> */}
                      <p className={resultAnswer}>
                        <span className={resultMargin}>답 &nbsp; 변:</span>{" "}
                        <span className={feedBack}>{item.answer}</span>
                      </p>
                      <p className={resultAnswer}>
                        <span className={resultMargin}>정 &nbsp; 답: </span>
                        <span className={feedBack}> {item.gptanswer}</span>
                      </p>
                      <p className={resultAnswer}>
                        {" "}
                        <span className={resultMargin}>피드백:</span>
                        <span className={feedBack}>{item.feedback}</span>
                      </p>
                      <p className={border}></p>
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
}

export default ResultPage;
