import {
    question,
    questionInput,
    questionNumbers,
    quizAnswerDiv,
    quizInput,
} from "../styles/QuizStyle.css";
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
}

function QuizInput({ quizs, currentQuizIndex, answers }: QuizInputProps) {
  const handleAnswerChange = (index: number, answer: string) => {
    // const updatedAnswers = [...answers];
    const updatedAnswers = [...answers.current];
    updatedAnswers[index] = answer;
    // setAnswers(updatedAnswers);
    answers.current = updatedAnswers;
  };
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
    </>
  );
}

export default QuizInput;
