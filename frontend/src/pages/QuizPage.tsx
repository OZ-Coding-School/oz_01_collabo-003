import {
  TodayBg,
  TodayQuiz,
  question,
  questionInput,
  questionNumbers,
  quizAnswerDiv,
  quizButton,
  quizContainer,
  quizInput,
  quizTitleContainer,
  quizbuttonDiv,
} from "../styles/QuizStyle.css";

function QuizPage() {
  // const quizs = [
  //   {
  //     문제1: {
  //       문제설명: "다음 단어의 한글 뜻을 쓰시오",
  //       문제: "Apple",
  //     },
  //   },
  //   {
  //     문제2: {
  //       문제설명:
  //         "Choose the correct form of the verb: She __ to the store yesterday.",
  //       보기: ["go", "goes", "went", "gone"],
  //     },
  //   },
  //   {
  //     문제3: {
  //       문제설명: "What was the weather like?",
  //       문제: "Read the following passage and answer the question below: \n\nThe sun was shining brightly in the clear blue sky. Birds were chirping happily in the trees. What was the weather like?",
  //     },
  //   },
  //   {
  //     문제4: {
  //       문제설명: "다음 단어의 영어단어를 쓰시오",
  //       문제: "사과",
  //     },
  //   },
  //   {
  //     문제5: {
  //       문제설명:
  //         "다음 문장을 읽고, 'Why did Sarah go to the park?'라는 질문에 대답하세요",
  //       문제: "Sarah went to the park to play with her friends.",
  //     },
  //   },
  // ];

  return (
    <div className={quizContainer}>
      <div className={quizTitleContainer}>
        <div>
          <img
            className={TodayBg}
            src="../../public/images/user_background_03.png"
            alt="TodayQuizBg"
          />
        </div>
        <p className={TodayQuiz}>TODAY QUIZ</p>

        {/* {quizs.map((quiz, index) => ( */}
        <>
          <p className={questionNumbers}>1/5</p>
          <p className={question}>
            {" "}
            다음 문장을 읽고, 'Why did Sarah go to the park?'라는 질문에
            대답하세요
          </p>

          <div className={quizAnswerDiv}>
            <div className={questionInput}>
              Sarah went to the park to play with her friends
            </div>
            <input
              className={quizInput}
              type="text"
              placeholder="정답을 입력하세요"
            ></input>
          </div>
        </>
        {/* ))} */}
      </div>
      <div className={quizbuttonDiv}>
        <button className={quizButton}>PREV</button>
        <button className={quizButton}>NEXT</button>
      </div>
    </div>
  );
}

export default QuizPage;
{
  /* <p className={questionNumbers}>1/5</p>
<p className={question}>
  다음 문장을 읽고, 'Why did Sarah go to the park?'라는 질문에
  대답하세요
</p>
<div className={quizAnswerDiv}>
  <div className={questionInput}>
    {" "}
    Sarah went to the park to play with her friends
  </div>
  <input
    className={quizInput}
    type="text"
    placeholder="정답을 입력하세요"
  ></input>
</div> */
}
