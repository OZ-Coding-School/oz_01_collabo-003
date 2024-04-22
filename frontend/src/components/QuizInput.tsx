import {
  question,
  questionInput,
  questionNumbers,
  quizAnswerDiv,
} from "../styles/QuizStyle.css";
import QuizAnswer from "./QuizAnswer";
interface QuizDetail {
  id: number;
  question: string;
  category: string;
  level: string;
}

interface QuizInputProps {
  quizs: QuizDetail[];
  currentQuizIndex: number;
  answers: React.MutableRefObject<string[]>;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;

}

function QuizInput({
  quizs,
  currentQuizIndex,
  answers,
  handleKeyDown,

}: QuizInputProps) {
  return (
    <>
      {quizs.map(
        (quiz, id) =>
          // 현재 퀴즈 인덱스와 매핑되는 퀴즈를 보여줌
          id === currentQuizIndex && (
            <div key={quiz.id} style={{ width: "100%" }}>
              <p className={questionNumbers}>{currentQuizIndex + 1}/5</p>
              <p className={question}>{quiz.category}</p>
              <div className={quizAnswerDiv}>
                <div className={questionInput}>{quiz.question}</div>
                <QuizAnswer
                  answers={answers}
                  currentQuizIndex={currentQuizIndex}
                  handleKeyDown={handleKeyDown}

                />
              </div>
            </div>
          )
      )}
    </>
  );
}

export default QuizInput;
