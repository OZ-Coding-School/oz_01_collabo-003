import { useState } from "react";
import ReviewComponent from "../components/ReviewComponent";
import { learningBox01Content, learningBox01ContentBox, learningBox01ContentContainer, learningBox01ContentTitle, learningBox01Title, learningBox01TitleContainer, learningBox03GraphBox, learningBox03Title, learningBox03TitleContainer, myLearningPageContentBox01, myLearningPageContentBox02, myLearningPageContentBox03, myLearningPageContentContainer, myLearningPageMainContainer, myLearningPageTitle } from "../styles/MyLearningPage.css";

type dataType = {
  date: string,
  grade: string,
  score: string,
  quiz: undefined | { qId: number, 문제: string, 답: string }[]
};

const MyLearningPage = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [data, setData] = useState<dataType | undefined>();
  console.log(isClicked);


  const handleCheckAndGetData = (getData: dataType) => {
    setIsClicked(!isClicked);
    setData(getData);
  }
  const getData = [
    {
      date: "23.03.25",
      grade: "초등",
      score: "10점",
      quiz: [{ qId: 1, 문제: "문제당", 답: "구래~ 푸" },
      { qId: 2, 문제: "문제당2", 답: "구래~ 푸2" },
      { qId: 3, 문제: "문제당3", 답: "구래~ 푸3" },
      { qId: 4, 문제: "문제당4", 답: "구래~ 푸4" },
      { qId: 5, 문제: "문제당5", 답: "구래~ 푸5" }
      ],
    },
    {
      date: "23.03.25",
      grade: "초등",
      score: "20점",
      quiz: [{ qId: 1, 문제: "문제당", 답: "구래~ 푸" },
      { qId: 2, 문제: "11111111", 답: "구래~ 푸2" },
      { qId: 3, 문제: "2222222", 답: "구래~ 푸3" },
      { qId: 4, 문제: "3333333", 답: "구래~ 푸4" },
      { qId: 5, 문제: "4444444", 답: "구래~ 푸5" }
      ],
    },
    {
      date: "23.03.25",
      grade: "초등",
      score: "30점",
      quiz: [{ qId: 1, 문제: "문제당", 답: "구래~ 푸" },
      { qId: 2, 문제: "qqqqqq", 답: "구래~ 푸2" },
      { qId: 3, 문제: "wwwwww", 답: "구래~ 푸3" },
      { qId: 4, 문제: "eeeeee", 답: "구래~ 푸4" },
      { qId: 5, 문제: "rrrrrr", 답: "구래~ 푸5" }
      ],
    },
    {
      date: "23.03.25",
      grade: "초등",
      score: "40점",
      quiz: [{ qId: 1, 문제: "문제당", 답: "구래~ 푸" },
      { qId: 2, 문제: "aaaaaa", 답: "구래~ 푸2" },
      { qId: 3, 문제: "ssssss", 답: "구래~ 푸3" },
      { qId: 4, 문제: "dddddd", 답: "구래~ 푸4" },
      { qId: 5, 문제: "ffffff", 답: "구래~ 푸5" }
      ],
    },
  ];

  return (
    <div className={myLearningPageMainContainer}>
      <div className={myLearningPageTitle}>
        <p>하염빵님의 학습 공간</p>
      </div>
      <div className={myLearningPageContentContainer}>
        <div className={myLearningPageContentBox01}>
          <div className={learningBox01TitleContainer}>
            <p className={learningBox01Title}>내가 푼 문제 수</p>
            <p className={learningBox01Title}>13문제</p>
          </div>
          <div className={learningBox01ContentContainer}>
            <p className={learningBox01ContentTitle}>내가 푼 문제</p>
            <div className={learningBox01ContentBox}>
              {getData.map((data, index) => (
                <div key={index} className={learningBox01Content} onClick={() => handleCheckAndGetData(data)}>
                  <p>{data.date} | {data.grade} | {data.score}</p>
                </div>
              ))
              }
            </div>
          </div>
        </div>
        <div className={myLearningPageContentBox02}></div>
        {isClicked ? <ReviewComponent data={data} /> :
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
  )
}

export default MyLearningPage