import { FlippedContainer, qiuzDiv } from "../styles/ResultStyle.css";
export const quizs = [
  {
    question: "문제1. I have a pet cat",
    userAnswer: "나만 고양이 없어잉",
    correctAnswer: "나는 고양이가 있다",
  },
  {
    question: "문제1. I have a pet cat",
    userAnswer: "나만 고양이 없어잉",
    correctAnswer: "나는 고양이가 있다",
  },
  {
    question: "문제1. I have a pet cat",
    userAnswer: "나만 고양이 없어잉",
    correctAnswer: "나는 고양이가 있다",
  },
  {
    question: "문제1. I have a pet cat",
    userAnswer: "나만 고양이 없어잉",
    correctAnswer: "나는 고양이가 있다",
  },
  {
    question: "문제1. I have a pet cat",
    userAnswer: "나만 고양이 없어잉",
    correctAnswer: "나는 고양이가 있다",
  },
];
function ResultDetail() {
  return (
    <div className={FlippedContainer}>
      {quizs.map((quiz, index) => (
        <div className={qiuzDiv} key={index}>
          <p>{quiz.question}</p>
          <p>답변: {quiz.userAnswer}</p>
          <p>정답: {quiz.correctAnswer}</p>
        </div>
      ))}
    </div>
  );
}

export default ResultDetail;
