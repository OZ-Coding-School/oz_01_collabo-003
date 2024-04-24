import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import QuizInput from "../components/QuizInput";
import useAuthStore from "../store/useAuth";
import {
  quizButton,
  quizButtonDiv,
  quizContainer,
  quizTitleContainer,
  todayBg,
  todayQuiz,
} from "../styles/QuizStyle.css";
import { handleSubmitKeyPress } from "../utils/keyDownHandler";
interface QuizDetail {
  id: number;
  question: string;
  category: string;
  level: string;
}

function QuizPage() {
  console.log("리렌더링된다");
  const navigate = useNavigate();
  const location = useLocation();

  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<string[]>(Array(5).fill(""));
  // const answers = useRef<string[]>(Array(5).fill(""));
  const [quizs, setQuizs] = useState<QuizDetail[]>([]);
  // const [answers, setAnswers] = useState<string[]>(quizs.map(() => ""));
  const [feedback, setFeedback] = useState({});
  const { levelName } = useAuthStore();
  useEffect(() => {
    setQuizs(location.state.data);
  }, [location.state.data]);

  //이전문제
  const handlePrevQuiz = () => {
    setCurrentQuizIndex((prevIndex) => prevIndex - 1);
    setCurrentQuizIndex((prevIndex) => {
      if (prevIndex > 0) {
        return prevIndex - 1;
      } else {
        return prevIndex;
      }
    });
  };
  //다음문제
  const handleNextQuiz = () => {
    if (currentQuizIndex === quizs.length - 1) {
      const confirmSubmit = window.confirm(
        "마지막 문제입니다. 제출 하시겠습니까?"
      );
      if (confirmSubmit) {
        handlePostQuiz();
      }
    } else {
      // setCurrentQuizIndex((prevIndex) => prevIndex + 1);
      setCurrentQuizIndex((prevIndex) => {
        if (prevIndex < quizs.length - 1) {
          return prevIndex + 1;
        } else {
          return prevIndex;
        }
      });
    }
  };
  const handlePostQuiz = () => {
    console.log(
      "문제",
      quizs.map((quiz) => quiz.question)
    );
    console.log("답변", answers);
    console.log(
      "정답",
      quizs.map((quiz) => quiz.id)
    );
    //문제 제출하는 로직

    async function FetchPostQuiz() {
      try {
        const request = await axios.post(
          "/api/v1/quiz/",
          {
            quizLevel: levelName,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        console.log(request.data.id);
        localStorage.setItem("id", request.data.id);
        if (request.status === 201) {
          const url = `/api/v1/gpt/feedback/${request.data.id}/`;

          const response = await axios.post(
            url,
            {
              question: quizs.map((quiz) => quiz.question),
              answer: answers,
              orderNum: quizs.map((quiz) => quiz.id),
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          );
          console.log(response.data);
          console.log(url);

          if (response.status === 200) {
            console.log("문제,정답 보내기 성공!");
            setFeedback(response.data);
            navigate("/result");
            localStorage.setItem("feedback", JSON.stringify(response.data));
          } else if (response.status === 400) {
            console.log("문제,정답 보내기 실패");
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    FetchPostQuiz();
    navigate("/result", { state: feedback });
  };
  const handleKeyDown = handleSubmitKeyPress(handleNextQuiz);
  const handleAnswerChange = (index: number, answer: string) => {
    const updatedAnswers = [...answers];
    // const updatedAnswers = [...answers.current];
    updatedAnswers[index] = answer;
    setAnswers(updatedAnswers);
    // answers.current = updatedAnswers;
  };
  console.log(answers);
  {
    return (
      <div className={quizContainer}>
        <div className={quizTitleContainer}>
          <div>
            <img
              className={todayBg}
              src="images/user_background_03.png"
              alt="TodayQuizBg"
            />
          </div>
          <p className={todayQuiz}>TODAY QUIZ</p>
        </div>

        <QuizInput
          quizs={quizs}
          currentQuizIndex={currentQuizIndex}
          answers={answers}
          setAnswers={setAnswers}
          handleKeyDown={handleKeyDown}
          handleAnswerChange={handleAnswerChange}
        />

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
