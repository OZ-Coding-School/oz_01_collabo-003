import axios from "axios";
import React, { useState } from "react";
import * as Components from "../Components";
import Input from "../components/Input";
import "../styles/LoginStyle.css";
import {
  anchor,
  button,
  container,
  formContainer,
  ghostButton,
  paragraph,
  signInContainer,
  signUpContainer,
  title,
} from "../styles/TestStyle.css";

function Auth() {
  //useRef로 수정하기
  const [logInEmail, setLogInEmail] = useState("");
  const [logInPw, setLogInPw] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const [signin, setSignIn] = React.useState(true);
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
    setEmail("");
    setUserName("");
    setPasswordCheck("");
    setPassword("");

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
    fetchSignUp();
  };

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
    FetchLogin();
  };
  return (
    // 전체 컨테이너
    <div className={container}>
      {/* 회원가입 */}
      <div className={signUpContainer} data-signin={signin}>
        <form className={formContainer} onSubmit={handleSignUp}>
          <h1 className={title}>Welcome!</h1>
          <p>Please signUp to your account.</p>
          <Input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          >
            Email
          </Input>
          <Input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          >
            User Name
          </Input>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          >
            Password
          </Input>
          <Input
            type="password"
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
          >
            Password
          </Input>

          <button className={button}>Sign Up</button>
        </form>
      </div>

      {/* 로그인 */}
      <div className={signInContainer} data-signin={signin}>
        {/* <div className={signInContainer} signIn={signIn}> */}
        <form className={formContainer} onSubmit={handleLogin}>
          <h1 className={title}>Sign in</h1>
          <Input
            type="text"
            value={logInEmail}
            onChange={(e) => setLogInEmail(e.target.value)}
          >
            ID
          </Input>
          <Input
            type="password"
            value={logInPw}
            onChange={(e) => setLogInPw(e.target.value)}
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
