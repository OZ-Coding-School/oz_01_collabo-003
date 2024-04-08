import axios from "axios";
import React, { useState } from "react";
import * as Components from "../Components";
import Input from "../components/Input";

import {
  anchor,
  button,
  container,
  formContainer,
  ghostButton,
  inputContainer,
  paragraph,
  signInContainer,
  signUpContainer,
  title,
} from "../styles/LoginStyle.css";

function Auth() {
  //useRef로 수정하기
  //로그인
  const [logInEmail, setLogInEmail] = useState<string>("");
  const [logInPw, setLogInPw] = useState<string>("");

  //회원가입
  const [email, setEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");

  //오류메시지 상태
  const [logInEmailMessage, setLogInEmailMessage] = useState<string>("");
  const [logInPwMessage, setLogInPwMessage] = useState<string>("");

  const [emailMessage, setEmailMessage] = useState<string>("");
  const [userNameMessage, setUserNameMessage] = useState<string>("");
  const [passwordMessage, setPasswordMessage] = useState<string>("");
  const [passwordCheckMessage, setPasswordCheckMessage] = useState<string>("");

  //유효성검사
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [isPasswordCheck, setIsPasswordCheck] = useState<boolean>(false);
  const [isUserName, setIsUserName] = useState<boolean>(false);

  // css용 state
  const [signin, setSignIn] = React.useState(true);

  //회원입시 이메일 검증
  const onChangeEmail: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const currentEmail = e.target.value;
    setEmail(currentEmail);
    const emailRegExp =
      /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;

    if (!emailRegExp.test(currentEmail)) {
      setEmailMessage("이메일 형식이 올바르지 않습니다");
      setIsEmail(false);
    } else {
      setEmailMessage("사용 가능한 이메일 입니다.");
      setIsEmail(true);
    }
  };

  //닉네임 유효성 검증
  const onChangeUserName: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const currentName = e.target.value;
    setUserName(currentName);

    if (currentName.length < 2 || currentName.length > 6) {
      setUserNameMessage("닉네임은 2글자 이상 6글자 이하여야합니다.");
      setIsUserName(false);
    } else {
      setUserNameMessage("사용가능한 닉네임 입니다.");
      setIsUserName(true);
    }
  };

  //비밀번호 유효성 검증
  const onChangePassword: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const currentPassword = e.target.value;
    setPassword(currentPassword);
    const passwordRegExp =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegExp.test(currentPassword)) {
      setPasswordMessage(
        "비밀번호는 숫자+영문자+특수문자를 포함한 8자리 이상이어야 합니다."
      );
      setIsPassword(false);
    } else {
      setPasswordMessage("안전한 비밀번호 입니다.");
      setIsPassword(true);
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
      setIsPasswordCheck(false);
    } else {
      setPasswordCheckMessage("");
      setIsPasswordCheck(true);
    }
  };
  // 회원가입 버튼 클릭 시 실행되는 함수
  const handleSignUp: React.MouseEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log(
      "email :",
      email,
      "/userName:",
      userName,
      "/password:",
      password,
      "/passwordCheck:",
      passwordCheck
    );
    // setEmail("");
    // setUserName("");
    // setPasswordCheck("");
    // setPassword("");

    // 회원가입 데이터 전송 코드
    async function fetchSignUp() {
      try {
        const response = await axios.post(
          "https://6907-122-32-46-97.ngrok-free.app/api/v1/user/register/",
          {
            userEmail: email,
            nickName: userName,
            password: password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
      } catch (err) {
        console.log("err:", err);
      }
    }
    // fetchSignUp();
  };
  //로그인 버튼 클릭 시 실행되는 함수
  const handleLogin: React.MouseEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log("id :", logInEmail, "/password:", logInPw);
    setLogInEmail("");
    setLogInPw("");

    //로그인 데이터 전송 코드
    async function FetchLogin() {
      try {
        const response = await axios.post(
          "https://6907-122-32-46-97.ngrok-free.app/api/v1/user/login/",
          {
            userId: logInEmail,
            password: logInPw,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        const { accessToken } = response.data.token.accessToken;
        console.log("Access Token:", accessToken);
        console.log("로그인 성공!!");

        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    // FetchLogin();
  };
  return (
    // 전체 컨테이너
    <div className={container}>
      {/* 회원가입 */}
      <div className={signUpContainer} data-signin={signin}>
        <form className={formContainer} onSubmit={handleSignUp}>
          <h1 className={title}>Welcome!</h1>
          <div className={inputContainer}>
            {" "}
            <Input
              type="text"
              value={email}
              onChange={onChangeEmail}
              required
              ErrorMessage={emailMessage}
            >
              Email
            </Input>
            <Input
              type="text"
              value={userName}
              onChange={onChangeUserName}
              required
              ErrorMessage={userNameMessage}
            >
              User Name
            </Input>
            <Input
              type="password"
              value={password}
              onChange={onChangePassword}
              required
              ErrorMessage={passwordMessage}
            >
              Password
            </Input>
            <Input
              type="password"
              value={passwordCheck}
              onChange={onChangePasswordConfirm}
              required
              ErrorMessage={passwordCheckMessage}
            >
              Password
            </Input>
          </div>

          <button className={button}>Sign Up</button>
        </form>
      </div>

      {/* 로그인 */}
      <div className={signInContainer} data-signin={signin}>
        <form className={formContainer} onSubmit={handleLogin}>
          <h1 className={title}>Sign in</h1>
          <Input
            type="text"
            value={logInEmail}
            onChange={(e) => setLogInEmail(e.target.value)}
            required
            ErrorMessage={logInEmailMessage}
          >
            Email
          </Input>
          <Input
            type="password"
            value={logInPw}
            onChange={(e) => setLogInPw(e.target.value)}
            required
            ErrorMessage={logInPwMessage}
          >
            Password
          </Input>
          <a className={anchor} href="#">
            Forgot your password?
          </a>
          <button className={button}>Sign In</button>
        </form>
      </div>
      {/* 오버레이 */}
      <Components.OverlayContainer signin={signin}>
        <Components.Overlay signin={signin}>
          <Components.LeftOverlayPanel signin={signin}>
            <h1 className={title}>Welcome Back!</h1>

            <p className={paragraph}>
              To keep connected with us please login with your personal info
            </p>
            <button className={ghostButton} onClick={() => setSignIn(true)}>
              Sign In
            </button>
          </Components.LeftOverlayPanel>

          <Components.RightOverlayPanel signin={signin}>
            <h1 className={title}>Hello, Friend!</h1>
            <p className={paragraph}>
              Enter Your personal details and start journey with us
            </p>
            <button className={ghostButton} onClick={() => setSignIn(false)}>
              Sign Up
            </button>
          </Components.RightOverlayPanel>
        </Components.Overlay>
      </Components.OverlayContainer>
    </div>
  );
}
export default Auth;
