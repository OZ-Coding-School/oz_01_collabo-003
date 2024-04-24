import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useHorizontalScroll3 } from "../hooks/useHorizontalScroll";
import useAuthStore from "../store/useAuth";
import {
  weekBackgroundImage01,
  weekBackgroundImage02,
  weekContainer,
  weekMainContentContainer,
  weekPageSubtitleDate,
  weekPageTitle,
  weekPageTitleContainer,
  weekSelectBox,
  weekSelectBoxContainer,
  weekSelectText,
} from "../styles/WeekPage.css";

interface DateObject {
  day: string;
  date: string;
  totalScore?: number;
  quizTryCount?: number;
  clickable?: boolean;
}

interface ScoreData {
  day: string;
  total_score: number;
  quiz_try_count: number;
}

const WeekPage = () => {
  const navigate = useNavigate();
  const { levelName } = useAuthStore();
  const date = new Date();
  const today = date.getDay(); // 현재 요일 (0: 일요일, 1: 월요일, ..., 6: 토요일)
  const monday = new Date(date); // 현재 날짜를 복제하여 월요일로 설정
  monday.setDate(monday.getDate() - today + 1); // 월요일로 설정
  const lastDays = new Date(monday.getTime() + 6 * 24 * 60 * 60 * 1000); // 다음 일요일까지의 날짜 계산
  const [scoreData, setScoreData] = useState<ScoreData[]>([]);
  console.log("todayWeek", today);
  const ref = useHorizontalScroll3();

  const getUserScore = async () => {
    try {
      const response = await axios.get(
        `/api/v1/user/userscore/${localStorage.getItem("level")}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log("levelName", levelName), console.log("score", response);
      setScoreData(response.data.scores_and_quiz_tries_by_day);
    } catch (error) {
      console.log("week get 에러 : ", error);
    }
  };

  useEffect(() => {
    getUserScore();
  }, []);

  const getDate = (): (string | DateObject)[] => {
    const result: (string | DateObject)[] = [];
    const week = ["MON", "TUE", "WED", "THU", "FRI", "SAT"]; // 월요일부터 시작하도록 수정
    for (let i = 0; i < 6; i++) {
      const currentDate = new Date(monday.getTime() + i * 24 * 60 * 60 * 1000);
      const formattedDate: DateObject = {
        day: week[i],
        date: currentDate
          .toLocaleDateString()
          .replace(/\./g, "")
          .replace(/ /g, "/")
          .replace("2024", ""),
        totalScore: 0,
        quizTryCount: 0,
        clickable: currentDate.getDay() === today,
      };
      const scoreDataForCurrentDate = scoreData.find(
        (data) => data.day.toUpperCase().slice(0, 3) === formattedDate.day
      );

      if (scoreDataForCurrentDate) {
        formattedDate.quizTryCount = scoreDataForCurrentDate.quiz_try_count;
        formattedDate.totalScore = scoreDataForCurrentDate.total_score;
        console.log(formattedDate.totalScore);
      }

      result.push(formattedDate);
    }
    return result;
  };

  const handleGetData = async (day: string | DateObject) => {
    const todayWeekDay = ["일", "월", "화", "수", "목", "금", "토"][
      new Date().getDay()
    ];
    // 문자열인 경우 무시
    if (typeof day === "string") return;

    // 클릭 가능하지 않은 경우 알림 표시
    if (!day.clickable) {
      alert(`오늘은 ${todayWeekDay}요일 입니다!`);
      return;
    }
    try {
      const response = await axios.get(`/api/v1/gpt/quiz//${levelName}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      console.log("week", response.data);
      if (response.status === 200) {
        if (response.data.length === 0) return alert("문제가 없습니다.");
        navigate("/quiz", {
          state: {
            data: response.data,
            day: day,
          },
        });
      }
    } catch (error) {
      console.log("week get 에러 : ", error);
    }
  };

  return (
    <div className={weekContainer}>
      <img
        className={weekBackgroundImage01}
        src="/images/week_background_01.png"
        alt="week 배경01"
      />
      <img
        className={weekBackgroundImage02}
        src="/images/week_background_02.png"
        alt="week 배경02"
      />
      <div className={weekMainContentContainer}>
        <div className={weekPageTitleContainer}>
          <div className={weekPageTitle}>
            <p style={{ fontFamily: "Space Mono" }}>QUIZ OF THIS WEEK</p>
          </div>
          <div className={weekPageSubtitleDate}>
            <p style={{ fontFamily: "Space Mono" }}>{`${
              monday.getMonth() + 1
            }/${monday.getDate()} ~ ${lastDays.getDate()}`}</p>
          </div>
        </div>

        <div className={weekSelectBoxContainer} ref={ref}>
          {getDate().map((day, index) => {
            const dateObject =
              typeof day === "string" ? { day: "", date: day } : day;
            return (
              <div
                className={weekSelectBox}
                key={index}
                data-score={dateObject.totalScore !== 0}
                onClick={() => handleGetData(day)}
              >
                <div className={weekSelectText}>
                  <p>{dateObject.day}</p>
                  <p>{dateObject.totalScore}</p>
                  {/* <p>{dateObject.quizTryCount}</p> */}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WeekPage;
