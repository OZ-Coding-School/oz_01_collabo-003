import { useEffect, useState } from "react";
import axios from "../api/axios";
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
import {
  weekBackgroundImage01,
  weekBackgroundImage02,
} from "../styles/WeekPage.css";
const accessToken = localStorage.getItem("accessToken");
function UserUpdatePage() {
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState<string | null>("");
  // 처음 마운트될때만 유저 정보 가져오기
  useEffect(() => {
    const loggedInUserId = localStorage.getItem("userId");
    setUserId(loggedInUserId);
  }, []);
  useEffect(() => {
    if (userId) {
      FetchUserUpdate();
    }
  }, [userId]);

  // userdata가져오기
  async function FetchUserUpdate() {
    try {
      const response = await axios.get(
        `/api/v1/user/myinfo/${userId}`,

        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );

      console.log(response.data);
      if (response.status === 200) {
        console.log("회원정보 가져오기 성공!");
        setNickName(response.data.nickName);
        setPassword(response.data.password);
      } else if (response.status === 400) {
        console.log("회원정보 가져오기 실퍂");
      }
    } catch (error) {
      console.log(error);
    }
  }
  //회원정보수정요청함수
  async function handleChangeUserInfo() {
    try {
      const response = await axios.put(
        `/api/v1/user/myinfo/${userId}`,
        {
          nickName: nickName,
          password: password,
        },
        {
          withCredentials: true,
        }
      );

      console.log(response.data);
      if (response.status === 200) {
        console.log("회원정보 수정 성공!");
        // setNickName(response.data.nickName);
        // setPassword(response.data.password);
      } else if (response.status === 400) {
        console.log("회원정보 수정 실패");
      }
    } catch (error) {
      console.log(error);
    }
  }

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
            <Input
              type="text"
              value={nickName}
              onChange={(e) => setNickName(e.target.value)}
            >
              User Name
            </Input>
            <Input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            >
              Password
            </Input>
            <Input type="password">PasswordCheck</Input>
            <button
              className={userUpdateButton}
              type="submit"
              onClick={handleChangeUserInfo}
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
