import { useEffect, useRef, useState } from "react";
import userImg from "../../public/images/userImg.png";
import edit5 from "../../public/svg/edit5.svg";
import axios from "../api/axios";
import Input from "../components/Input";
import {
  userUpdateButton,
  userUpdateSelectButton,
} from "../styles/ButtonStyle.css";
import {
  editSvg,
  infoLayout,
  userImgDiv,
  userImgNameDiv,
  userImgsrc,
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
  const userImgInput = useRef<HTMLInputElement | null>(null);
  const [profileImg, setProfileImg] = useState<string>(userImg);
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordcheck, setPasswordcheck] = useState("");
  const [passwordEdit, setPasswordEdit] = useState(false);
  const [email, setEmail] = useState("");

  const [fetchNickName, setFetchNickName] = useState("하염빵");

  // const [imgUrl, setImgUrl] = useState("");
  useEffect(() => {
    FetchUserUpdate();
  }, [accessToken]);

  // userdata가져오기
  async function FetchUserUpdate() {
    try {
      const response = await axios.get(`/api/v1/user/myinfo/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log(response.data);
      if (response.status === 200) {
        console.log("회원정보 가져오기 성공!");
        setNickName(response.data.nickName);
        setFetchNickName(response.data.nickName);
        setProfileImg(response.data.imgUrl);

        setEmail(response.data.email);
      } else if (response.status === 400) {
        console.log("회원정보 가져오기 실패");
      }
    } catch (error) {
      console.log(error);
    }
  }
  const handleNickNameChage: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setNickName(e.target.value);
  };

  type UserUpdateData = {
    nickName: string;
    password?: string;
    imgUrl?: string;
  };

  //회원정보수정요청함수
  async function handleChangeUserInfo() {
    const confirmSubmit = window.confirm("정보를 수정하시겠습니까?");
    if (confirmSubmit) {
      try {
        const userData: UserUpdateData = {
          nickName: nickName,
        };
        if (password) {
          userData.password = password;
        }
        if (profileImg) {
          userData.imgUrl = profileImg;
        }
        const response = await axios.put(
          `/api/v1/user/myinfo/`,
          userData,

          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log(response.data);
        if (response.status === 200) {
          console.log("회원정보 수정 성공!");
          alert("회원정보가 수정되었습니다!");
          setPassword("");
          setFetchNickName(nickName);
        } else if (response.status === 400) {
          console.log("회원정보 수정 실패");
          alert("회원정보 수정 실패");
        }
      } catch (error) {
        console.log(error);
        alert("회원정보 수정 실패");
      }
    }
  }
  const onChangeUserImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setProfileImg(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    } else {
      setProfileImg(userImg);
    }
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
      <div className={infoLayout}>
        <div className={userLogoLayout}>
          <div className={userLogoBg}>
            <div className={userInfoTitle}>나의 정보</div>
          </div>
        </div>
        <div className={userLayout}>
          <div className={userInfoDiv}>
            <div className={userImgNameDiv}>
              <div className={userImgDiv}>
                {profileImg ? (
                  <img
                    src={profileImg}
                    alt="user profile"
                    className={userImgsrc}
                  />
                ) : (
                  <img
                    src={userImg}
                    alt="user profile"
                    className={userImgsrc}
                  />
                )}

                <input
                  type="file"
                  style={{ display: "none" }}
                  accept="image/jpg,image/png,image/jpeg"
                  name="profile_img"
                  onChange={onChangeUserImg}
                  ref={userImgInput}
                />
                <img
                  src={edit5}
                  className={editSvg}
                  onClick={() => {
                    userImgInput.current && userImgInput.current.click();
                  }}
                />
              </div>{" "}
              <p className={userName}>{fetchNickName}</p>
            </div>
            <button
              onClick={() => setPasswordEdit(!passwordEdit)}
              className={userUpdateSelectButton}
            >
              {passwordEdit ? "닉네임 변경하기" : "비밀번호 변경하기"}
            </button>
            {passwordEdit ? (
              <>
                {" "}
                <Input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                >
                  password
                </Input>
                <Input
                  type="password"
                  value={passwordcheck}
                  onChange={(e) => setPasswordcheck(e.target.value)}
                >
                  passwordCheck
                </Input>
              </>
            ) : (
              <>
                {" "}
                <Input
                  type="text"
                  value={nickName}
                  onChange={handleNickNameChage}
                >
                  nickName
                </Input>
                <Input type="text" value={email} disabled>
                  email
                </Input>
              </>
            )}

            <button
              className={userUpdateButton}
              type="submit"
              onClick={handleChangeUserInfo}
            >
              {passwordEdit ? " 변경하기" : " 변경하기"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserUpdatePage;
