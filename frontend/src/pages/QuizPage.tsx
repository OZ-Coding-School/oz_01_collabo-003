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
  문제설명: string;
  문제: string;
  답변: string;
}
interface Quiz {
  [key: string]: QuizDetail;
}
const accessToken = localStorage.getItem("accessToken");
function QuizPage() {
  const navigate = useNavigate();
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<string[]>(Array(5).fill(""));
  const [quiz, setQuiz] = useState([]);
  //location으로 문제 받아오기
  const location = useLocation();
  useEffect(() => {
    setQuiz(location.state);
  }, [location.state]);

  const quizs: Quiz[] = [
    {
      문제1: {
        문제설명: "다음 단어의 한글 뜻을 쓰시오",
        문제: "Apple",
        답변: "",
      },
    },
    {
      문제2: {
        문제설명:
          "Choose the correct form of the verb: She __ to the store yesterday.",
        문제: "go, goes, went, gone",
        답변: "",
      },
    },
    {
      문제3: {
        문제설명: "Read the following passage and answer the question below",
        문제: "The sun was shining brightly in the clear blue sky. Birds were chirping happily in the trees. \n\n What was the weather like?",
        답변: "",
      },
    },
    {
      문제4: {
        문제설명: "다음 단어의 영어단어를 쓰시오",
        문제: "사과",
        답변: "",
      },
    },
    {
      문제5: {
        문제설명:
          "다음 문장을 읽고, 'Why did Sarah go to the park?'라는 질문에 대답하세요",
        문제: "Sarah went to the park to play with her friends.",
        답변: "",
      },
    },
  ];
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
            question: quiz,
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
        } else if (response.status === 400) {
          console.log("문제,정답 보내기 실패");
        }
      } catch (error) {
        console.log(error);
      }
    }
    FetchPostQuiz();
    navigate("/result");
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
          (quiz, index) =>
            // 현재 퀴즈 인덱스와 매핑되는 퀴즈를 보여줌
            index === currentQuizIndex && (
              <>
                <p className={questionNumbers}>{index + 1}/5</p>
                <p className={question}>{quiz[`문제${index + 1}`].문제설명}</p>
                <div className={quizAnswerDiv}>
                  <div className={questionInput}>
                    {quiz[`문제${index + 1}`].문제}
                  </div>
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
