import { useNavigate } from "react-router-dom";
import LevelSelectButtonOne from "../components/levelpagebutton/LevelSelectButtonOne";
import {
  useHorizontalScroll,
  useHorizontalScroll2,
} from "../hooks/useHorizontalScroll";
import useAuthStore from "../store/useAuth";
import {
  levelPageBackgroundImage,
  levelPageButtonContainer,
  levelPageButtonContainerOne,
  levelPageContainer,
  levelPageMainContainer,
  levelPageTitle,
} from "../styles/LevelPage.css";
// import './LevelPage.css';

const LevelPage = () => {
  const levelOneList = [
    "초등학생",
    "중학생",
    "고등학생",
    "토플",
    "3ENG",
    "원어민",
  ];
  const navigate = useNavigate();
  const scrollRef = useHorizontalScroll();
  const scrollRef2 = useHorizontalScroll2();
  const { setLevelName } = useAuthStore();
  const handlePostData = async (level: string) => {
    setLevelName(level);
    localStorage.setItem("level", level);
    navigate(`/week/${level}`);
  };

  return (
    <div>
      <div className={levelPageMainContainer}>
        <img
          className={levelPageBackgroundImage}
          src="/images/level_background.png"
          alt="배경이미지"
        />
        <div className={levelPageContainer}>
          <h1 className={levelPageTitle} style={{ fontFamily: "Space Mono" }}>
            Choose your level!
          </h1>
          <div className={levelPageButtonContainer} ref={scrollRef}>
            <div className={levelPageButtonContainerOne} ref={scrollRef2}>
              {levelOneList.map((level, index) => (
                <LevelSelectButtonOne
                  key={`menu_one${index}`}
                  number={index}
                  name={level}
                  onClick={
                    index === 4 ? undefined : () => handlePostData(level)
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelPage;
