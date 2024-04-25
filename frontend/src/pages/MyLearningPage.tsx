import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import axios from "../api/axios";
import ReviewComponent from "../components/ReviewComponent";
import useAuthStore from "../store/useAuth";
import {
  learningBox01Content,
  learningBox01ContentBox,
  learningBox01ContentContainer,
  learningBox01ContentTitle,
  learningBox01Title,
  learningBox01TitleContainer,
  learningBox03GraphBox,
  learningBox03Title,
  learningBox03TitleContainer,
  myLearningPageContentBox01,
  myLearningPageContentBox02,
  myLearningPageContentBox03,
  myLearningPageContentContainer,
  myLearningPageMainContainer,
  myLearningPageTitle,
  rotate,
  widthAnimation,
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

interface QuizDataItem {
  quiz_try: {
    id: number;
    createdAt: string;
    updatedAt: string;
    quizLevel: string;
    user: number;
  };
  quizzes: QuizItem[];
}

interface UserData {
  user: {
    id: number;
    email: string;
    nickName: string;
    imgUrl: string;
  };
  quiz_data: QuizDataItem[];
}

const MyLearningPage = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [userData, setUserData] = useState<UserData | undefined>();
  const [detailUserData, setDetailUserData] = useState<
    QuizDataItem | undefined
  >();
  const [selectedDataIndex, setSelectedDataIndex] = useState<number | null>(
    null
  );
  const [onCardClicked, setOnCardClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { userName } = useAuthStore();
  const getUserData = async () => {
    try {
      const response = await axios.get("/api/v1/user/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setUserData(response.data);
      setIsLoading(false);
      console.log("나의 학습공간", response);
    } catch (error) {
      console.log("학습공간 에러", error);
    }
  };
  console.log("유저데이터", userData);
  // 브라우저 사이즈에 따라 카드 클릭 상태 초기화
  useEffect(() => {
    getUserData();
    const handleResize = () => {
      if (window.innerWidth >= 1310) {
        setOnCardClicked(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  console.log("카드 클릭", onCardClicked);
  const handleCheckAndGetData = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    getData: QuizDataItem,
    index: number
  ) => {
    e.stopPropagation();
    setIsClicked(true);
    setDetailUserData(getData);
    setSelectedDataIndex(index);
    console.log("1111");
  };

  const handleCardClick = () => {
    if (window.innerWidth < 1540) {
      setOnCardClicked(!onCardClicked);
    }
  };

  if (isLoading) return <div>로딩중...</div>;
  const data1 = userData!.quiz_data.map((data) => {
    const dateString = data.quiz_try.createdAt;
    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear()}.${String(
      date.getMonth() + 1
    ).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;

    return {
      id: data.quiz_try.id,
      date: formattedDate,
      score: data.quizzes.reduce((acc, curr) => acc + curr.score, 0),
    };
  });

  if (!userData) return <div>로딩중...</div>;
  const totalQuestions = userData!.quiz_data.reduce(
    (total, data) => total + data.quizzes.length,
    0
  );

  const averageScores = userData.quiz_data.map((data) => {
    return data.quizzes.reduce((acc, curr) => acc + curr.score, 0);
  });
  const totalScore = averageScores.reduce((acc, score) => acc + score, 0);
  const averageScore = (totalScore / averageScores.length).toFixed(2);

  return (
    <div className={myLearningPageMainContainer}>
      <div className={myLearningPageTitle}>
        <p>{userName}님의 학습 공간</p>
      </div>
      <div className={`${myLearningPageContentContainer}`}>
        <div
          className={`${widthAnimation}  ${rotate}`}
          data-clicked={onCardClicked}
          onClick={handleCardClick}
        >
          <div className={myLearningPageContentBox01}>
            <div className={learningBox01TitleContainer}>
              <p className={learningBox01Title}>내가 푼 문제 수</p>
              <p className={learningBox01Title}>{totalQuestions}문제</p>
            </div>
            <div className={learningBox01ContentContainer}>
              <p className={learningBox01ContentTitle}>내가 푼 문제</p>
              <div className={learningBox01ContentBox}>
                {userData.quiz_data.map((data, index) => {
                  const averageScore = data.quizzes.reduce(
                    (acc, curr) => acc + curr.score,
                    0
                  );
                  const dateString = data.quiz_try.createdAt;
                  const date = new Date(dateString);
                  const formattedDate = `${date.getFullYear()}.${String(
                    date.getMonth() + 1
                  ).padStart(2, "0")}.${String(date.getDate()).padStart(
                    2,
                    "0"
                  )}`;
                  return (
                    <div
                      key={index}
                      className={learningBox01Content}
                      data-click={
                        selectedDataIndex === index ? isClicked : null
                      }
                      onClick={(e) => handleCheckAndGetData(e, data, index)}
                    >
                      <p>{`${formattedDate} | `}</p>
                      <p>
                        &nbsp;{data.quiz_try.quizLevel.replace("학교", "")}
                        &nbsp;
                      </p>
                      <p>{`| ${averageScore}점`}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className={myLearningPageContentBox02}></div>
          {isClicked ? (
            <ReviewComponent
              detailUserData={detailUserData}
              selectedDataIndex={selectedDataIndex}
              setIsClicked={setIsClicked}
            />
          ) : (
            <div className={myLearningPageContentBox03}>
              <div className={learningBox03GraphBox}>
                <ResponsiveContainer width={"100%"}>
                  <BarChart
                    height={410}
                    data={data1}
                    margin={{
                      top: 40,
                      right: 0,
                      left: -20,
                      bottom: 20,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis dataKey="score" />
                    <Tooltip />
                    <Legend fontSize="16px" />
                    <Bar
                      dataKey="score"
                      barSize={30}
                      // fill="#7982e8"
                      fill="#d4d8ff"
                      fontSize="16px"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className={learningBox03TitleContainer}>
                <p className={learningBox03Title}>평균점수</p>
                <p className={learningBox03Title}>{averageScore ? averageScore : '0'}점</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyLearningPage;
