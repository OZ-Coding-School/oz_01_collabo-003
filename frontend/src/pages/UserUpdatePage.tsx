import Input from "../components/Input";
import { userUpdateButton } from "../styles/ButtonStyle.css";
import { layout } from "../styles/LayoutStyle.css";

import {
  userImgDiv,
  userImgNameDiv,
  userInfoDiv,
  userInfoTitle,
  userLayout,
  userLogoBg,
  userLogoLayout,
  userName,
} from "../styles/UserUpdateStyle.css";
import { weekBackgroundImage01, weekBackgroundImage02 } from "../styles/WeekPage.css";

function UserUpdatePage() {
  // 로그인 상태 가져와서 수정해야함
  const handleSubmitUserUpdate = () => {
    console.log("");
  };
  return (
    <div style={{ zIndex: "1000" }}>
      <img
        className={weekBackgroundImage01}
        src="images/week_background_01.png"
        alt="week 배경01"
      />
      <img
        className={weekBackgroundImage02}
        src="images/week_background_02.png"
        alt="week 배경02"
      />
      <div className={layout}>
        <div className={userLogoLayout}>
          <div className={userLogoBg}>
            <div className={userInfoTitle}>나의 정보</div>
          </div>
        </div>
        <div className={userLayout} style={{ backgroundClip: "border-box" }}>
          <div className={userInfoDiv}>
            <div className={userImgNameDiv}>
              <div className={userImgDiv}>
                <img
                  src="../../public/images/profile.webp"
                  alt="user profile"
                />
              </div>
              <p className={userName}>하염빵</p>
            </div>
            <Input type="text">User Name</Input>
            <Input type="password">Password</Input>
            <Input type="password">Password</Input>
            <button
              className={userUpdateButton}
              type="submit"
              onClick={handleSubmitUserUpdate}
            >
              수정하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserUpdatePage;
