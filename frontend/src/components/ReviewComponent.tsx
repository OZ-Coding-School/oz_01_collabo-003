import { useEffect, useRef, useState } from "react";
import useOnclickOutside from "../hooks/useOnClickOutSide";
import { line, myLearningPageContentComponent, reviewInputContainer, reviewItem, reviewItemAnswerText, reviewItemAnswerTextContainer, reviewItemContainer, reviewItemText, reviewQuestion, reviewScreen, userAnswer, userAnswerButton } from "../styles/MyLearningPage.css";

type ReviewComponentProps = {
  data?: {
    date: string,
    grade: string,
    quiz: undefined | { qId: number, question: string, answer: string }[]
  }
  selectedDataIndex: number | null;
  setIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
};

const ReviewComponent = ({ data, selectedDataIndex, setIsClicked }: ReviewComponentProps) => {
  const [inputValues, setInputValues] = useState<string[]>(Array(data?.quiz?.length || 0).fill(''));
  const [errors, setErrors] = useState<string[]>(Array(data?.quiz?.length).fill(''));
  const [counts, setCounts] = useState<number[]>(Array(data?.quiz?.length).fill(0));
  const ref = useRef(null);
  console.log(counts);

  useEffect(() => {
    setInputValues(Array(data?.quiz?.length).fill(''));
    setErrors(Array(data?.quiz?.length).fill(''));
    setCounts(Array(data?.quiz?.length).fill(0));

  }, [selectedDataIndex])

  useOnclickOutside(ref, () => {
    setIsClicked(false);
  });

  const handleAnswerCheck = (index: number) => {

    const newErrors = inputValues.map((text, idx) => {
      if (idx === index && !text) {
        return '답을 입력해주세요';
      } else if (idx === index && text !== data?.quiz?.[idx].answer) {
        return '정답이 과 일치하지 않습니다.';
      } else {
        return '';
      }
    });
    setErrors(newErrors);

    setCounts(prev => {
      console.log(inputValues);
      if (inputValues[index] === '') return prev;
      return prev.map((count, idx) =>
        idx === index ? (count >= 4 ? 0 : count + 1) : count
      );
    })
  }

  const handleAnswer = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = e.target.value;
    setInputValues(newInputValues);
  }

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  if (!data) {
    return <div>No data available</div>; // 데이터가 없는 경우 처리
  }



  return (
    <div className={myLearningPageContentComponent} ref={ref} onClick={(e) => handleCardClick(e)}>
      <div className={reviewItemContainer}>
        {data.quiz?.map((data, index) => (
          <div className={reviewItem} key={index}>
            <div className={reviewQuestion}>
              <p className={reviewItemText}>{`Q${data.qId})`}&nbsp;</p>
              <p className={reviewItemText}>{data.answer}</p>
            </div>
            <div className={reviewInputContainer}>
              <button className={userAnswerButton} disabled={counts[index] === 4 ? true : false} onClick={() => handleAnswerCheck(index)}>확인</button>
              <input className={userAnswer} value={inputValues[index]} type="text" onChange={(e) => handleAnswer(e, index)} />
            </div>
            <div className={reviewItemAnswerTextContainer}>
              {counts[index] === 4 || inputValues[index] === data.answer ? null : <div className={reviewScreen}>{errors[index]}</div>}
              <p className={reviewItemAnswerText}>{`정답: ${data.answer}`}</p>
            </div>
            <div className={line}></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ReviewComponent