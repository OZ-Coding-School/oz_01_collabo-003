import { useNavigate } from 'react-router-dom';
import LevelSelectButtonOne from '../components/levelpagebutton/LevelSelectButtonOne';
import { useHorizontalScroll, useHorizontalScroll2 } from '../hooks/useHorizontalScroll';
import { levelPageBackgroundImage, levelPageButtonContainer, levelPageButtonContainerOne, levelPageContainer, levelPageMainContainer, levelPageTitle } from '../styles/LevelPage.css';
// import './LevelPage.css';

const LevelPage = () => {
  const levelOneList = ['초등학교', '중학교', '고등학교', '토익', '', '프리토킹'];
  const navigate = useNavigate();
  const scrollRef = useHorizontalScroll();
  const scrollRef2 = useHorizontalScroll2();
  return (
    <div>
      <div className={levelPageMainContainer}>
        <img className={levelPageBackgroundImage} src='/images/level_background.png' alt='배경이미지' />
        <div className={levelPageContainer}>
          <h1 className={levelPageTitle}>Choose your level!</h1>
          <div className={levelPageButtonContainer} ref={scrollRef} >
            <div className={levelPageButtonContainerOne} ref={scrollRef2} >
              {levelOneList.map((level, index) => (
                <LevelSelectButtonOne key={`menu_one${index}`} number={index} name={level} onClick={() => navigate(`/week/${level}`, { state: level })} />
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default LevelPage