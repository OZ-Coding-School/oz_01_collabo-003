import { weekBackgroundImage01, weekBackgroundImage02, weekContainer, weekMainContentContainer, weekPageSubtitleDate, weekPageTitle, weekPageTitleContainer, weekSelectBox, weekSelectBoxContainer, weekSelectText } from "../styles/WeekPage.css"

const WeekPage = () => {
  return (
    <div className={weekContainer}>
      <img className={weekBackgroundImage01} src="images/week_background_01.png" alt="week 배경01" />
      <img className={weekBackgroundImage02} src="images/week_background_02.png" alt="week 배경02" />
      <div className={weekMainContentContainer}>
        <div className={weekPageTitleContainer}>
          <div className={weekPageTitle}>
            <p>QUIZ OF THIS WEEK</p>
          </div>
          <div className={weekPageSubtitleDate}>
            <p>3/21-28</p>
          </div>
        </div>
        <div className={weekSelectBoxContainer}>
          <div className={weekSelectBox}>
            <div className={weekSelectText}>
              <p>MON</p>
              <p>80</p>
            </div>
          </div>
          <div className={weekSelectBox}>
            <div className={weekSelectText}>
              <p>TUE</p>
              <p>80</p>
            </div>
          </div>
          <div className={weekSelectBox}>
            <div className={weekSelectText}>
              <p>WED</p>
              <p>80</p>
            </div>
          </div>
          <div className={weekSelectBox}>
            <div className={weekSelectText}>
              <p>TUR</p>
              <p>80</p>
            </div>
          </div>
          <div className={weekSelectBox}>
            <div className={weekSelectText}>
              <p>FRI</p>
              <p>80</p>
            </div>
          </div>
          <div className={weekSelectBox}>
            <div className={weekSelectText}>
              <p>SAR</p>
              <p>80</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default WeekPage