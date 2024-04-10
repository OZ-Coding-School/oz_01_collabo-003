import { useNavigate } from "react-router-dom";
import { weekBackgroundImage01, weekBackgroundImage02, weekContainer, weekMainContentContainer, weekPageSubtitleDate, weekPageTitle, weekPageTitleContainer, weekSelectBox, weekSelectBoxContainer, weekSelectText } from "../styles/WeekPage.css";

const WeekPage = () => {
  const navigate = useNavigate();
  const week = ['MON', 'TUE', 'WED', 'TUR', 'FRI', 'SAR'];
  const date = new Date();
  const lastDays = new Date(date.getTime() + 5 * 24 * 60 * 60 * 1000);
  const day = lastDays.getDate();

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
            <div className={weekSelectBox} key={index} onClick={() => navigate('/quiz')}>
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