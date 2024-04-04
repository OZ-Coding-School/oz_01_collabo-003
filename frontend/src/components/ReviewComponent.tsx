import { useRef, useState } from "react";
import { line, myLearningPageContentComponent, reviewInputContainer, reviewItem, reviewItemAnswerText, reviewItemAnswerTextContainer, reviewItemContainer, reviewItemText, reviewQuestion, reviewScreen, userAnswer, userAnswerButton } from "../styles/MyLearningPage.css";

type ReviewComponentProps = {
  data?: {
    date: string,
    grade: string,
    score: string,
    quiz: undefined | { qId: number, 문제: string, 답: string }[]
  }
};

const ReviewComponent = ({ data }: ReviewComponentProps) => {
  const reviewText = useRef<string[]>(Array(data?.quiz?.length || 0).fill(''));
  const [errors, setErrors] = useState<string[]>(Array(data?.quiz?.length).fill(''));
  const [counts, setCounts] = useState<number[]>(Array(data?.quiz?.length).fill(0));
  console.log(counts);
  const handleAnswerCheck = (index: number) => {
    const newErrors = reviewText.current.map((text, idx) => {
      if (idx === index && !text) {
        return '답을 입력해주세요';
      } else if (idx === index && text !== data?.quiz?.[idx].답) {
        return '정답이 과 일치하지 않습니다.';
      } else {
        return '';
      }
    });
    setErrors(newErrors);

    setCounts(prev => {
      console.log(reviewText);
      if (reviewText.current[index] === '') return prev;
      return prev.map((count, idx) =>
        idx === index ? (count >= 4 ? 0 : count + 1) : count
      );
    })
  }

  const handleAnswer = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    console.log(e.target.value);
    reviewText.current[index] = e.target.value as string;
  }

  if (!data) {
    return <div>No data available</div>; // 데이터가 없는 경우 처리
  }

  return (
    <div className={myLearningPageContentComponent}>
      <div className={reviewItemContainer}>
        {data.quiz?.map((data, index) => (
          <div className={reviewItem} key={index}>
            <div className={reviewQuestion}>
              <p className={reviewItemText}>{`Q${data.qId})`}&nbsp;</p>
              <p className={reviewItemText}>{data.문제}</p>
            </div>
            <div className={reviewInputContainer}>
              <button className={userAnswerButton} disabled={counts[index] === 4 ? true : false} onClick={() => handleAnswerCheck(index)}>확인</button>
              <input className={userAnswer} type="text" onChange={(e) => handleAnswer(e, index)} />
            </div>
            <div className={reviewItemAnswerTextContainer}>
              {counts[index] === 4 || reviewText.current[index] === data.답 ? null : <div className={reviewScreen}>{errors[index]}</div>}
              <p className={reviewItemAnswerText}>{`정답: ${data.답}`}</p>
            </div>
            <div className={line}></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ReviewComponent