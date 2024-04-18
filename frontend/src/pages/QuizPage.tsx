import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import {
  question,
  questionInput,
  questionNumbers,
  quizAnswerDiv,
  quizButton,
  quizButtonDiv,
  quizContainer,
  quizInput,
  quizTitleContainer,
  todayBg,
  todayQuiz,
} from "../styles/QuizStyle.css";
interface QuizDetail {
  id: number;
  question: string;
  category: string;
  level: string;
}
const accessToken = localStorage.getItem("accessToken");
function QuizPage() {
  const navigate = useNavigate();
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<string[]>(Array(5).fill(""));
  const [quizs, setQuizs] = useState<QuizDetail[]>([]);
  const [feedback, setFeedback] = useState({});
  //location으로 문제 받아오기

  const location = useLocation();
  console.log("quiz", location.state.data);
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);

  useEffect(() => {
    if (Array.isArray(location.state.data)) {
      const allQuizzes = location.state.data;
      const randomQuizs: QuizDetail[] = [];

      while (randomQuizs.length < 5) {
        const randomIndex = Math.floor(Math.random() * allQuizzes.length);
        if (!selectedIndexes.includes(randomIndex)) {
          randomQuizs.push(allQuizzes[randomIndex]);
          setSelectedIndexes([...selectedIndexes, randomIndex]);
        }
      }

      setQuizs(randomQuizs);
    }
  }, [location.state.data]);

  //이전문제
  const handlePrevQuiz = () => {
    setCurrentQuizIndex((prevIndex) => prevIndex - 1);
  };
  //다음문제
  const handleNextQuiz = () => {
    if (currentQuizIndex === quizs.length - 1) {
      const confirmSubmit = window.confirm(
        "마지막 문제입니다. 제출 하시겠습니까?"
      );
      if (confirmSubmit) {
        handleSubmit();
      }
    } else {
      setCurrentQuizIndex((prevIndex) => prevIndex + 1);
    }
  };
  const handleSubmit = () => {
    //문제랑 정답 보내는 로직
    async function FetchPostQuiz() {
      try {
        const response = await axios.post(
          `/api/v1/gpt/feedback/`,
          {
            question: quizs,
            answer: answers,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log(response.data);

        if (response.status === 200) {
          console.log("문제,정답 보내기 성공!");
          setFeedback(response.data);
          localStorage.setItem("feedback", JSON.stringify(response.data));
        } else if (response.status === 400) {
          console.log("문제,정답 보내기 실패");
        }
      } catch (error) {
        console.log(error);
      }
    }
    FetchPostQuiz();
    navigate("/result", { state: feedback });
  };
  const handleAnswerChange = (index: number, answer: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = answer;
    setAnswers(updatedAnswers);
  };
  {
    return (
      <div className={quizContainer}>
        <div className={quizTitleContainer}>
          <div>
            <img
              className={todayBg}
              src="../../public/images/user_background_03.png"
              alt="TodayQuizBg"
            />
          </div>
          <p className={todayQuiz}>TODAY QUIZ</p>
        </div>

        {quizs.map(
          (quiz, id) =>
            // 현재 퀴즈 인덱스와 매핑되는 퀴즈를 보여줌
            id === currentQuizIndex && (
              <>
                <p className={questionNumbers}>{currentQuizIndex + 1}/5</p>
                <p className={question}>{quiz.category}</p>
                <div className={quizAnswerDiv}>
                  <div className={questionInput}>{quiz.question}</div>
                  <input
                    className={quizInput}
                    type="text"
                    placeholder="정답을 입력하세요"
                    value={answers[currentQuizIndex]}
                    onChange={(e) =>
                      handleAnswerChange(currentQuizIndex, e.target.value)
                    }
                  />
                </div>
              </>
            )
        )}
        <div className={quizButtonDiv}>
          <button
            className={quizButton}
            disabled={currentQuizIndex === 0}
            onClick={handlePrevQuiz}
          >
            PREV
          </button>

          <button className={quizButton} onClick={handleNextQuiz}>
            {currentQuizIndex === 4 ? " SUBMIT " : "NEXT"}
          </button>
        </div>
      </div>
    );
  }
}
export default QuizPage;
