import { week_background_01, week_background_02, week_container, week_main_content_container, week_page_subtitle_date, week_page_title, week_page_title_container, week_select_box, week_select_box_container, week_select_text } from "../styles/WeekPage.css"

const WeekPage = () => {
  return (
    <div className={week_container}>
      <img className={week_background_01} src="images/week_background_01.png" alt="week 배경01" />
      <img className={week_background_02} src="images/week_background_02.png" alt="week 배경02" />
      <div className={week_main_content_container}>
        <div className={week_page_title_container}>
          <div className={week_page_title}>
            <p>QUIZ OF THIS WEEK</p>
          </div>
          <div className={week_page_subtitle_date}>
            <p>3/21-28</p>
          </div>
        </div>
        <div className={week_select_box_container}>
          <div className={week_select_box}>
            <div className={week_select_text}>
              <p>MON</p>
              <p>80</p>
            </div>
          </div>
          <div className={week_select_box}>
            <div className={week_select_text}>
              <p>TUE</p>
              <p>80</p>
            </div>
          </div>
          <div className={week_select_box}>
            <div className={week_select_text}>
              <p>WED</p>
              <p>80</p>
            </div>
          </div>
          <div className={week_select_box}>
            <div className={week_select_text}>
              <p>TUR</p>
              <p>80</p>
            </div>
          </div>
          <div className={week_select_box}>
            <div className={week_select_text}>
              <p>FRI</p>
              <p>80</p>
            </div>
          </div>
          <div className={week_select_box}>
            <div className={week_select_text}>
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