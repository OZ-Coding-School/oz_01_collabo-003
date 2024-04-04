import { useState } from "react";
import ReviewComponent from "../components/ReviewComponent";
import { learning_box_01_content, learning_box_01_content_box, learning_box_01_content_container, learning_box_01_content_title, learning_box_01_title, learning_box_01_title_container, learning_box_03_graph_box, learning_box_03_title, learning_box_03_title_container, my_learning_page_content_box01, my_learning_page_content_box02, my_learning_page_content_box03, my_learning_page_content_container, my_learning_page_main_container, my_learning_page_title } from "../styles/MyLearningPage.css";

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
    <div className={my_learning_page_main_container}>
      <div className={my_learning_page_title}>
        <p>하염빵님의 학습 공간</p>
      </div>
      <div className={my_learning_page_content_container}>
        <div className={my_learning_page_content_box01}>
          <div className={learning_box_01_title_container}>
            <p className={learning_box_01_title}>내가 푼 문제 수</p>
            <p className={learning_box_01_title}>13문제</p>
          </div>
          <div className={learning_box_01_content_container}>
            <p className={learning_box_01_content_title}>내가 푼 문제</p>
            <div className={learning_box_01_content_box}>
              {getData.map((data, index) => (
                <div key={index} className={learning_box_01_content} onClick={() => handleCheckAndGetData(data)}>
                  <p>{data.date} | {data.grade} | {data.score}</p>
                </div>
              ))
              }
            </div>
          </div>
        </div>
        <div className={my_learning_page_content_box02}></div>
        {isClicked ? <ReviewComponent data={data} /> :
          <div className={my_learning_page_content_box03}>
            <div className={learning_box_03_graph_box}>
              구래~ 푸
            </div>
            <div className={learning_box_03_title_container}>
              <p className={learning_box_03_title}>평균점수</p>
              <p className={learning_box_03_title}>85점</p>
            </div>
          </div>}
      </div>
    </div>
  )
}

export default MyLearningPage