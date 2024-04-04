import { quizTitleContainer } from "../styles/QuizStyle.css";
import {
  resultAgainButton,
  resultBg,
  resultBoxbg,
  resultButtonDiv,
  resultCongratulation,
  resultContainer,
  resultDetailButton,
  resultImg,
  resultPageDetail,
  resultScoreBox,
  score,
  yourScoreTitle,
} from "../styles/ResultStyle.css";

function ResultPage() {
  return (
    <div className={resultContainer}>
      <div>
        <div className={quizTitleContainer}>
          <div>
            <img
              className={resultBg}
              src="../../public/images/user_background_03.png"
              alt="TodayQuizBg"
            />
          </div>
          <p className={resultCongratulation}>Congratulation</p>
        </div>
        <p className={resultPageDetail}>
          오늘의 학습을 마쳤습니다 <br />
          상세보기를 눌러 정답을 확인하세요!
        </p>
      </div>
      <div className={resultScoreBox}>
        {/* <img src="../../public/images/resultDog.png" className={resultDogImg} /> */}
        <div className={resultBoxbg}>
          <img src="../../public/images/resultBg.png" className={resultImg} />
          <div>
            {" "}
            <p className={yourScoreTitle}>Your Score</p>
            <p className={score}>80</p>
          </div>

          <div className={resultButtonDiv}>
            <button className={resultAgainButton}>AGAIN</button>
            <button className={resultDetailButton}>상세보기</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultPage;
