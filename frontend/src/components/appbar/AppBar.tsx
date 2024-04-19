import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuth";
import { nav } from "../../styles/AppBar.css";
import {
  levelPageLogo,
  levelPageTopButton,
  levelPageTopMenu,
} from "../../styles/LevelPage.css";
import "./AppBar.css";

type UserData = {
  email: string;
  nickName: string;
  imgUrl: string;
};

const AppBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userFetchDate, setUserFetchDate] = useState<UserData | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const { userData } = useAuthStore();

  (async () => {
    const data = await userData();
    setUserFetchDate(data);
  })();

  const handleClicked = (path: string) => {
    setIsChecked(!isChecked);
    navigate(path)
  }

  useEffect(() => {

  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/");
  };

  return (
    <div className="app_bar_main_container">
      <div className={levelPageTopMenu}>
        <img className={levelPageLogo} src="/images/logo.png" alt="로고" />
        <div
          className={levelPageTopButton}
          onClick={() =>
            navigate(location.pathname === "/learning" ? "/level" : "/learning")
          }
        >
          <p>
            {location.pathname === "/learning"
              ? "메인페이지로"
              : "나의 학습공간"}
          </p>
        </div>
      </div>
      <div className={nav}>
        <div className="container">
          <input type="checkbox" className="menu_icon_input" id="menu_icon" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
          <div className="menu_bar">
            <label htmlFor="menu_icon" className="menu_icon">
              <span className="menu_icon_bar"></span>
              <span className="menu_icon_bar"></span>
              <span className="menu_icon_bar"></span>
            </label>
          </div>
          <div className="menu">
            <div className="user_info">
              <div className="user_icon">
                <img
                  src={
                    userFetchDate?.imgUrl ? userFetchDate.imgUrl : "/images/profile.webp"
                  }
                  alt="유저아이콘"
                />
              </div>
              <p className="user_nickname">
                {userFetchDate?.nickName ? userFetchDate.nickName : "닉네임"}
              </p>
            </div>
            <div className="menu_list">
              <div
                className="menu_list_item"
                onClick={() => handleClicked("/level")}
              >
                메인페이지
              </div>
              <div
                className="menu_list_item"
                onClick={() => handleClicked("/learning")}
              >
                나의 학습공간
              </div>
              <div
                className="menu_list_item"
                onClick={() => handleClicked("/user-update")}
              >
                정보수정
              </div>
              <div className="menu_list_item" onClick={handleLogout}>
                로그아웃
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppBar;
