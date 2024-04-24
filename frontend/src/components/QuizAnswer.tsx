import { quizInput } from "../styles/QuizStyle.css";
interface Props {
  currentQuizIndex: number;
  // answers: React.MutableRefObject<string[]>;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  answers: string[];
  // setAnswers: React.Dispatch<React.SetStateAction<string[]>>;
  handleAnswerChange: (index: number, answer: string) => void;
}
function QuizAnswer({
  answers,
  currentQuizIndex,
  handleKeyDown,
  // setAnswers,
  handleAnswerChange,
}: Props) {
  return (
    <>
      <input
        className={quizInput}
        type="text"
        placeholder="정답을 입력하세요"
        value={answers[currentQuizIndex]}
        onChange={(e) => handleAnswerChange(currentQuizIndex, e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
      />
    </>
  );
}

export default QuizAnswer;
