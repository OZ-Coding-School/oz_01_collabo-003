import { useEffect, useRef, useState } from "react";
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

function QuizPage() {
  console.log("리렌더링된다");
  const navigate = useNavigate();
  const location = useLocation();

  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  // const [answers, setAnswers] = useState<string[]>(Array(5).fill(""));
  const answers = useRef<string[]>(Array(5).fill(""));
  const [quizs, setQuizs] = useState<QuizDetail[]>([]);
  const [feedback, setFeedback] = useState({});

  useEffect(() => {
    setQuizs(location.state.data);
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
        handlePostQuiz();
      }
    } else {
      setCurrentQuizIndex((prevIndex) => prevIndex + 1);
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
      const url = `/api/v1/gpt/feedback/${localStorage.getItem("id")}/`;
      try {
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
      } catch (error) {
        console.log(error);
        console.log(url);
      }
    }
    FetchPostQuiz();
    navigate("/result", { state: feedback });
  };
  const handleAnswerChange = (index: number, answer: string) => {
    // const updatedAnswers = [...answers];
    const updatedAnswers = [...answers.current];
    updatedAnswers[index] = answer;
    // setAnswers(updatedAnswers);
    answers.current = updatedAnswers;
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
              <div key={quiz.id} style={{ width: "100%" }}>
                <p className={questionNumbers}>{currentQuizIndex + 1}/5</p>
                <p className={question}>{quiz.category}</p>
                <div className={quizAnswerDiv}>
                  <div className={questionInput}>{quiz.question}</div>
                  <input
                    className={quizInput}
                    type="text"
                    placeholder="정답을 입력하세요"
                    onChange={(e) =>
                      handleAnswerChange(currentQuizIndex, e.target.value)
                    }
                  />
                </div>
              </div>
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
