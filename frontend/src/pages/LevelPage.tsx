import { useNavigate } from 'react-router-dom';
import LevelSelectButtonOne from '../components/levelpagebutton/LevelSelectButtonOne';
import LevelSelectButtonTwo from '../components/levelpagebutton/LevelSelectButtonTwo';
import { levelPageBackgroundImage, levelPageButtonContainerOne, levelPageButtonContainerTwo, levelPageContainer, levelPageMainContainer } from '../styles/LevelPage.css';
// import './LevelPage.css';

const LevelPage = () => {
  const levelOneList = ['초등학교', '중학교', '고등학교'];
  const levelTwoList = ['토익', '', '프리토킹'];
  const navigate = useNavigate();
  return (
    <div>
      <div className={levelPageMainContainer}>
        <img className={levelPageBackgroundImage} src='/images/level_background.png' alt='배경이미지' />
        <div className={levelPageContainer}>
          <h1>Choose your level!</h1>
          <div className={levelPageButtonContainerOne}>
            {levelOneList.map((level, index) => (
              <LevelSelectButtonOne key={`menu_one${index}`} name={level} onClick={() => navigate(`/week/${level}`, { state: level })} />
            ))}
          </div>
          <div className={levelPageButtonContainerTwo}>
            {levelTwoList.map((level, index) => (
              <LevelSelectButtonTwo key={`menu_two${index}`} name={level} onClick={!level ? undefined : () => navigate(`/week/${level}`, { state: level })} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LevelPage