import { useEffect, useState } from "react";
import ReviewComponent from "../components/ReviewComponent";
import { learningBox01Content, learningBox01ContentBox, learningBox01ContentContainer, learningBox01ContentTitle, learningBox01Title, learningBox01TitleContainer, learningBox03GraphBox, learningBox03Title, learningBox03TitleContainer, myLearningPageContentBox01, myLearningPageContentBox02, myLearningPageContentBox03, myLearningPageContentContainer, myLearningPageMainContainer, myLearningPageTitle, rotate, widthAnimation } from "../styles/MyLearningPage.css";

type dataType = {
  date: string,
  grade: string,
  quiz: undefined | {
    qId: number,
    question: string, answer: string, score: number
  }[]
};

const MyLearningPage = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [data, setData] = useState<dataType | undefined>();
  const [selectedDataIndex, setSelectedDataIndex] = useState<number | null>(null);
  const [onCardClicked, setOnCardClicked] = useState(false);

  // 브라우저 사이즈에 따라 카드 클릭 상태 초기화
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1310) {
        setOnCardClicked(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  console.log("카드 클릭", onCardClicked);
  const handleCheckAndGetData = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, getData: dataType, index: number) => {
    e.stopPropagation();
    setIsClicked(true);
    setData(getData);
    setSelectedDataIndex(index);
    console.log('1111');

  }

  const handleCardClick = () => {
    if (window.innerWidth < 1540) {
      setOnCardClicked(!onCardClicked);
    }
  }

  const getData = [
    {
      date: "23.03.25",
      grade: "초등",
      quiz: [{ qId: 1, question: "1문제당", answer: "1구래~ 푸", score: 10 },
      { qId: 2, question: "1문제당2", answer: "1구래~ 푸2", score: 20 },
      { qId: 3, question: "1문제당3", answer: "1구래~ 푸3", score: 40 },
      { qId: 4, question: "1문제당4", answer: "1구래~ 푸4", score: 50 },
      { qId: 5, question: "1문제당5", answer: "1구래~ 푸5", score: 60 }
      ],
    },
    {
      date: "23.03.25",
      grade: "초등",
      quiz: [{ qId: 1, question: "2문제당", answer: "2구래~ 푸", score: 10 },
      { qId: 2, question: "2121111111", answer: "2구래~ 푸2", score: 20 },
      { qId: 3, question: "22222222", answer: "2구래~ 푸3", score: 30 },
      { qId: 4, question: "23333333", answer: "2구래~ 푸4", score: 40 },
      { qId: 5, question: "24444444", answer: "2구래~ 푸5", score: 50 }
      ],
    },
    {
      date: "23.03.25",
      grade: "초등",
      quiz: [{ qId: 1, question: "문제당", answer: "3구래~ 푸", score: 20 },
      { qId: 2, question: "qqqqqq", answer: "3구래~ 푸2", score: 20 },
      { qId: 3, question: "wwwwww", answer: "3구래~ 푸3", score: 40 },
      { qId: 4, question: "eeeeee", answer: "3구래~ 푸4", score: 30 },
      { qId: 5, question: "rrrrrr", answer: "3구래~ 푸5", score: 10 }
      ],
    },
    {
      date: "23.03.25",
      grade: "초등",
      quiz: [{ qId: 1, question: "문제당", answer: "4구래~ 푸", score: 20 },
      { qId: 2, question: "aaaaaa", answer: "4구래~ 푸2", score: 30 },
      { qId: 3, question: "ssssss", answer: "4구래~ 푸3", score: 40 },
      { qId: 4, question: "dddddd", answer: "4구래~ 푸4", score: 50 },
      { qId: 5, question: "ffffff", answer: "4구래~ 푸5", score: 60 }
      ],
    },
  ];

  return (
    <div className={myLearningPageMainContainer}>
      <div className={myLearningPageTitle}>
        <p>하염빵님의 학습 공간</p>
      </div>
      <div className={`${myLearningPageContentContainer}`} >
        <div className={`${widthAnimation}  ${rotate}`} data-clicked={onCardClicked} onClick={handleCardClick}>
          <div className={myLearningPageContentBox01} >
            <div className={learningBox01TitleContainer}>
              <p className={learningBox01Title}>내가 푼 문제 수</p>
              <p className={learningBox01Title}>13문제</p>
            </div>
            <div className={learningBox01ContentContainer}>
              <p className={learningBox01ContentTitle}>내가 푼 문제</p>
              <div className={learningBox01ContentBox}>
                {getData.map((data, index) => {
                  const averageScore = data.quiz.reduce((acc, curr) => acc + curr.score, 0) / data.quiz.length;
                  return (
                    <div key={index} className={learningBox01Content} data-click={selectedDataIndex === index ? isClicked : null} onClick={(e) => handleCheckAndGetData(e, data, index)}>
                      <p>{data.date} | {data.grade} | {averageScore}</p>
                    </div>
                  )
                })
                }
              </div>
            </div>
          </div>
          <div className={myLearningPageContentBox02}></div>
          {isClicked ? <ReviewComponent data={data} selectedDataIndex={selectedDataIndex} setIsClicked={setIsClicked} /> :
            <div className={myLearningPageContentBox03}>
              <div className={learningBox03GraphBox}>
                구래~ 푸
              </div>
              <div className={learningBox03TitleContainer}>
                <p className={learningBox03Title}>평균점수</p>
                <p className={learningBox03Title}>85점</p>
              </div>
            </div>}
        </div>
      </div>
    </div>
  )
}

export default MyLearningPage