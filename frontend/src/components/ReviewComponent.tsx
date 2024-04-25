import { useEffect, useRef, useState } from "react";
import useOnclickOutside from "../hooks/useOnClickOutSide";
import {
  line,
  myLearningPageContentComponent,
  reviewInputContainer,
  reviewItem,
  reviewItemAnswerText,
  reviewItemAnswerTextContainer,
  reviewItemContainer,
  reviewItemText,
  reviewQuestion,
  reviewScreen,
  userAnswer,
  userAnswerButton,
} from "../styles/MyLearningPage.css";

interface QuizItem {
  id: number;
  answer: string;
  orderNum: number;
  feedback: string;
  score: number;
  quiz_try: number;
  question: string;
  gptanswer: string;
}

type ReviewComponentProps = {
  detailUserData?: {
    quiz_try: {
      id: number;
      createdAt: string;
      updatedAt: string;
      quizLevel: string;
      user: number;
    };
    quizzes: QuizItem[];
  };
  selectedDataIndex: number | null;
  setIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
};

const ReviewComponent = ({
  detailUserData,
  selectedDataIndex,
  setIsClicked,
}: ReviewComponentProps) => {
  const [inputValues, setInputValues] = useState<string[]>(
    Array(detailUserData?.quizzes?.length || 0).fill("")
  );
  const [errors, setErrors] = useState<string[]>(
    Array(detailUserData?.quizzes?.length).fill("")
  );
  const [counts, setCounts] = useState<number[]>(
    Array(detailUserData?.quizzes?.length).fill(0)
  );
  const ref = useRef(null);
  // console.log("디테일 데이터", detailUserData);

  useEffect(() => {
    setInputValues(Array(detailUserData?.quizzes?.length).fill(""));
    setErrors(Array(detailUserData?.quizzes?.length).fill(""));
    setCounts(Array(detailUserData?.quizzes?.length).fill(0));
  }, [selectedDataIndex]);

  useOnclickOutside(ref, () => {
    setIsClicked(false);
  });

  const handleAnswerCheck = (index: number) => {
    const newErrors = inputValues.map((text, idx) => {
      if (idx === index && !text) {
        return "답을 입력해주세요";
      } else if (
        idx === index &&
        text !== detailUserData?.quizzes?.[idx].answer
      ) {
        return "정답이 과 일치하지 않습니다.";
      } else {
        return "";
      }
    });
    setErrors(newErrors);

    setCounts((prev) => {
      // console.log(inputValues);
      if (inputValues[index] === "") return prev;
      return prev.map((count, idx) =>
        idx === index ? (count >= 4 ? 0 : count + 1) : count
      );
    });
  };

  const handleAnswer = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = e.target.value;
    setInputValues(newInputValues);
  };

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  if (!detailUserData) {
    return <div>No data available</div>; // 데이터가 없는 경우 처리
  }

  return (
    <div
      className={myLearningPageContentComponent}
      ref={ref}
      onClick={(e) => handleCardClick(e)}
    >
      <div className={reviewItemContainer}>
        {detailUserData.quizzes?.map((data, index) => (
          <div className={reviewItem} key={index}>
            <div className={reviewQuestion}>
              <p className={reviewItemText}>{`Q${data.id})`}&nbsp;</p>
              <p className={reviewItemText}>{data.question}</p>
            </div>
            <div className={reviewInputContainer}>
              <button
                className={userAnswerButton}
                disabled={counts[index] === 4 ? true : false}
                onClick={() => handleAnswerCheck(index)}
              >
                확인
              </button>
              <input
                className={userAnswer}
                value={inputValues[index]}
                type="text"
                onChange={(e) => handleAnswer(e, index)}
              />
            </div>
            <div className={reviewItemAnswerTextContainer}>
              {counts[index] === 4 ||
              inputValues[index] === data.answer ? null : (
                <div className={reviewScreen}>{errors[index]}</div>
              )}
              <p
                className={reviewItemAnswerText}
              >{`정답: ${data.gptanswer}`}</p>
            </div>
            <div className={line}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewComponent;
