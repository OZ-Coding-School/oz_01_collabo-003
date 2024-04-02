import { useNavigate } from 'react-router-dom';
import LevelSelectButtonOne from '../components/levelpagebutton/LevelSelectButtonOne';
import LevelSelectButtonTwo from '../components/levelpagebutton/LevelSelectButtonTwo';
import { level_page_background_image, level_page_button_container_one, level_page_button_container_two, level_page_container, level_page_logo, level_page_main_container, level_page_title, level_page_top_button, level_page_top_menu } from '../styles/LevelPage.css';
// import './LevelPage.css';
const LevelPage = () => {
  const levelOneList = ['초등학교', '중학교', '고등학교'];
  const levelTwoList = ['토익', '', '프리토킹'];
  const navigate = useNavigate();

  return (
    <div>
      <div className={level_page_main_container}>
        <div className={level_page_top_menu}>
          <img className={level_page_logo} src='images/logo.png' alt='로고' />
          <div className={level_page_top_button}>
            <p>나의 학습공간</p>
          </div>
        </div>
        <img className={level_page_background_image} src='/images/level_background.png' alt='배경이미지' />
        <div className={level_page_container}>
          <h1 className={level_page_title}>Choose your level!</h1>
          <div className={level_page_button_container_one}>
            {levelOneList.map((level, index) => (
              <LevelSelectButtonOne key={`menu_one${index}`} name={level} onClick={() => navigate('/week', { state: level })} />
            ))}
          </div>
          <div className={level_page_button_container_two}>
            {levelTwoList.map((level, index) => (
              <LevelSelectButtonTwo key={`menu_two${index}`} name={level} onClick={!level ? undefined : () => navigate('/week', { state: level })} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LevelPage