import { quizInput } from "../styles/QuizStyle.css";
interface Props {
  currentQuizIndex: number;
  answers: React.MutableRefObject<string[]>;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  focusNextInput: () => void;
}
function QuizAnswer({ answers, currentQuizIndex, handleKeyDown }: Props) {
  const handleAnswerChange = (index: number, answer: string) => {
    // const updatedAnswers = [...answers];
    const updatedAnswers = [...answers.current];
    updatedAnswers[index] = answer;
    // setAnswers(updatedAnswers);
    answers.current = updatedAnswers;
  };
  return (
    <>
      <input
        className={quizInput}
        type="text"
        placeholder="정답을 입력하세요"
        onChange={(e) => handleAnswerChange(currentQuizIndex, e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
      />
    </>
  );
}

export default QuizAnswer;
