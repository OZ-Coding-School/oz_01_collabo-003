import { quizInput } from "../styles/QuizStyle.css";
interface Props {
  currentQuizIndex: number;
  answers: React.MutableRefObject<string[]>;
}
function QuizAnswer({ answers, currentQuizIndex }: Props) {
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
      />
    </>
  );
}

export default QuizAnswer;
