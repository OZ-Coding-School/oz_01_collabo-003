import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useHorizontalScroll3 } from "../hooks/useHorizontalScroll";
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

  const date = new Date();
  const lastDays = new Date(date.getTime() + 5 * 24 * 60 * 60 * 1000);
  // const day = lastDays.getDate();
  const lastDayOfWeek = lastDays.getDay(); // 토요일이 6, 일요일이 0
  const daysToAdd = lastDayOfWeek === 0 ? 1 : 0; // 일요일인 경우에만 하루를 더해줌
  lastDays.setDate(lastDays.getDate() + daysToAdd);
  const todayWeak = date.getDay();
  const [scoreData, setScoreData] = useState<ScoreData[]>([]);
  console.log("todayWeak", todayWeak);
  const ref = useHorizontalScroll3();

  const getUserScore = async () => {
    try {
      const response = await axios.get('/api/v1/user/userscore/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
      console.log("score", response);
      setScoreData(response.data.scores_and_quiz_tries_by_day);
    } catch (error) {
      console.log("week get 에러 : ", error);
    }
  }

  useEffect(() => {
    getUserScore();
  }, [])


  const getDate = (): (string | DateObject)[] => {
    const date = new Date()
    const oneWeekLater = new Date(date.getTime() + 6 * 24 * 60 * 60 * 1000);
    const result: (string | DateObject)[] = []
    const week = ["SUN", "MON", "TUE", "WED", "TUR", "FRI", "SAT"];
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(oneWeekLater.getTime() - i * 24 * 60 * 60 * 1000);
      if (currentDate.getDay() === 0) continue;
      const formattedDate: DateObject = {
        day: week[currentDate.getDay()],
        date: currentDate.toLocaleDateString().replace(/\./g, '').replace(/ /g, '/').replace('2024', ''),
        totalScore: 0,
        quizTryCount: 0,
        clickable: currentDate.getDay() === new Date().getDay(),
      };
      const scoreDataForCurrentDate = scoreData.find((data) => data.day.toUpperCase().slice(0, 3) === formattedDate.day);
      if (scoreDataForCurrentDate) {
        formattedDate.totalScore = scoreDataForCurrentDate.total_score;
        formattedDate.quizTryCount = scoreDataForCurrentDate.quiz_try_count;
      }
      result.push(formattedDate)
    }
    result;
    return result.reverse();
  }

  const handleGetData = async (day: string | DateObject) => {
    const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
    const todayWeekDay = weekDays[new Date().getDay()];
    // 문자열인 경우 무시
    if (typeof day === 'string') return;

    // 클릭 가능하지 않은 경우 알림 표시
    if (!day.clickable) {
      alert(`${todayWeekDay}요일이 아닙니다.`);
      return;
    }
    try {
      const response = await axios.get(`/api/v1/gpt/quiz/`, {
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
            <p>QUIZ OF THIS WEEK</p>
          </div>
          <div className={weekPageSubtitleDate}>
            <p>{`${date.getMonth() + 1}/${date.getDate()} ~ ${lastDays.getDate()}`}</p>
          </div>
        </div>

        <div className={weekSelectBoxContainer} ref={ref}>
          {getDate().map((day, index) => {
            const dateObject = typeof day === 'string' ? { day: '', date: day } : day;
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
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default WeekPage;
