import { useEffect, useRef, useState } from "react";
import userImg from "../../public/images/userImg.png";
import edit5 from "../../public/svg/edit5.svg";
import axios from "../api/axios";
import DuplicateInput from "../components/DuplicateInput";
import Input from "../components/Input";
import useAuthStore from "../store/useAuth";
import {
  userUpdateButton,
  userUpdateSelectButton,
} from "../styles/ButtonStyle.css";
import {
  editSvg,
  infoLayout,
  userImgDiv,
  userImgNameDiv,
  userImgSrc,
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

function UserUpdatePage() {
  const userImgInput = useRef<HTMLInputElement | null>(null);
  const [profileImg, setProfileImg] = useState<string>(userImg);
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordEdit, setPasswordEdit] = useState(false);
  const [email, setEmail] = useState("");
  const [userNameMessage, setUserNameMessage] = useState<string>("");
  const [fetchNickName, setFetchNickName] = useState("하염빵");
  const [isUserName, setIsUserName] = useState<boolean>(false);
  const [passwordMessage, setPasswordMessage] = useState<string>("");
  const { setUpdateCount } = useAuthStore();
  const [passwordCheckMessage, setPasswordCheckMessage] = useState<string>("");

  useEffect(() => {
    FetchUserUpdate();
  }, []);

  async function FetchUserUpdate() {
    try {
      const response = await axios.get(`/api/v1/user/myinfo/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
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

  interface UserDataType {
    nickName: string;
    password?: string;
    imgUrl?: string;
  }
  //회원정보수정요청함수
  async function handleChangeUserInfo() {
    console.log(passwordCheckMessage, passwordMessage, userNameMessage);
    if (
      passwordCheckMessage === "" &&
      passwordMessage === "" &&
      userNameMessage === ""
    ) {
      const confirmSubmit = window.confirm("정보를 수정하시겠습니까?");
      if (confirmSubmit) {
        try {
          const userData: UserDataType = {
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
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          );
          console.log(response.data);
          if (response.status === 200) {
            console.log("회원정보 수정 성공!");
            alert("회원정보가 수정되었습니다!");
            setPassword("");
            setPasswordCheck("");
            setFetchNickName(nickName);
            setUpdateCount((prev: number) => prev + 1);
          } else if (response.status === 400) {
            console.log("회원정보 수정 실패");
            alert("회원정보를 수정하는데서 오류가 발생하였습니다");
          }
        } catch (error) {
          console.log(error);
          alert("회원정보 수정 실패");
        }
      }
    } else {
      alert("오류메시지를 확인해주세요!");
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
  //닉네임 유효성 검증
  const onChangeUserName: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const currentName = e.target.value;
    setNickName(currentName);

    if (currentName.length < 2 || currentName.length > 6) {
      setUserNameMessage("닉네임은 2글자 이상 6글자 이하여야합니다.");
      setIsUserName(false);
    } else {
      setUserNameMessage("닉네임 중복확인을 해주세요.");
      //중복확인하면 오류메시지 없어짐
      setIsUserName(true);
    }
  };
  async function fetchUserNameDoubleCheck() {
    try {
      await axios
        .post("/api/v1/user/nickNamevalid/", {
          nickName: nickName,
        })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            setUserNameMessage("사용가능한 닉네임입니다");
            setIsUserName(false);
          }
        })
        .catch((error) => {
          if (error.response.status === 400) {
            const errorMessage = "이미 존재하는 닉네임입니다";
            setUserNameMessage(errorMessage);
          } else {
            setUserNameMessage("닉네임 확인 중 오류가 발생했습니다");
          }
        });
    } catch (err) {
      console.log("err:", err);
      setUserNameMessage("닉네임 중복확인 중 오류가 발생했습니다");
    }
  } //비밀번호 유효성 검증
  const onChangePassword: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const currentPassword = e.target.value;
    setPassword(currentPassword);
    const passwordRegExp =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegExp.test(currentPassword)) {
      setPasswordMessage(
        "비밀번호는 숫자+영문자+특수문자를 포함한 8자리 이상이어야 합니다."
      );
    } else {
      setPasswordMessage("");
    }
  };

  // 비밀번호 확인
  const onChangePasswordConfirm: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const currentPasswordConfirm = e.target.value;
    setPasswordCheck(currentPasswordConfirm);

    if (password !== currentPasswordConfirm) {
      setPasswordCheckMessage("비밀번호가 일치하지않습니다");
      // setIsPasswordCheck(false);
    } else {
      setPasswordCheckMessage("");
      // setIsPasswordCheck(true);
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
                    className={userImgSrc}
                  />
                ) : (
                  <img
                    src={userImg}
                    alt="user profile"
                    className={userImgSrc}
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
                  type="password"
                  value={password}
                  onChange={onChangePassword}
                  ErrorMessage={passwordMessage}
                >
                  password
                </Input>
                <Input
                  type="password"
                  value={passwordCheck}
                  onChange={onChangePasswordConfirm}
                  ErrorMessage={passwordCheckMessage}
                  onPaste={(e) => e.preventDefault()}
                >
                  passwordCheck
                </Input>
              </>
            ) : (
              <>
                {" "}
                <DuplicateInput
                  type="text"
                  value={nickName}
                  onChange={onChangeUserName}
                  required
                  ErrorMessage={userNameMessage}
                  disabled={!isUserName}
                  onClick={fetchUserNameDoubleCheck}
                >
                  nickName
                </DuplicateInput>
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
