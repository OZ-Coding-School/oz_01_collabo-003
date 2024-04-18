import { useLocation, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { weekBackgroundImage01, weekBackgroundImage02, weekContainer, weekMainContentContainer, weekPageSubtitleDate, weekPageTitle, weekPageTitleContainer, weekSelectBox, weekSelectBoxContainer, weekSelectText } from "../styles/WeekPage.css";

const WeekPage = () => {
  const navigate = useNavigate();
  const week = ['MON', 'TUE', 'WED', 'TUR', 'FRI', 'SAR'];
  const date = new Date();
  const lastDays = new Date(date.getTime() + 5 * 24 * 60 * 60 * 1000);
  const day = lastDays.getDate();
  const location = useLocation();

  const handleGetData = async (day: string) => {
    let url = '';
    if (location.state === '초등학교') {
      url = '/api/v1/gpt/elementary/';
    } else if (location.state === '중학교') {
      url = '/api/v1/gpt/middle/';
    } else if (location.state === '고등학교') {
      url = '/api/v1/gpt/high/';
    } else if (location.state === '토익') {
      url = '/api/v1/gpt/toeic/';
    } else if (location.state === '프리토킹') {
      url = '/api/v1/gpt/native/';
    }
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      console.log('week', response.data);
      if (response.status === 200) {
        navigate('/quiz', {
          state: {
            data: response.data,
            day: day,
          }
        });
      }
    } catch (error) {
      console.log('week get 에러 : ', error);
    }
  }

  return (
    <div className={weekContainer}>
      <img className={weekBackgroundImage01} src="/images/week_background_01.png" alt="week 배경01" />
      <img className={weekBackgroundImage02} src="/images/week_background_02.png" alt="week 배경02" />
      <div className={weekMainContentContainer}>
        <div className={weekPageTitleContainer}>
          <div className={weekPageTitle}>
            <p>QUIZ OF THIS WEEK</p>
          </div>
          <div className={weekPageSubtitleDate}>
            <p>{`${date.getMonth() + 1}/${date.getDate()} ~ ${day}`}</p>
          </div>
        </div>

        <div className={weekSelectBoxContainer}>
          {week.map((day, index) => (
            <div className={weekSelectBox} key={index} onClick={() => handleGetData(day)}>
              <div className={weekSelectText}>
                <p>{day}</p>
                <p>80</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default WeekPage