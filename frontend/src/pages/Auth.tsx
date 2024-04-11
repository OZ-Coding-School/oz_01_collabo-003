import React, { useRef, useState } from "react";
import * as Components from "../Components";
import Input from "../components/Input";

import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import DuplicateInput from "../components/DuplicateInput";
import PassWordModal from "../components/PasswordModal";
import {
  anchor,
  button,
  container,
  formContainer,
  ghostButton,
  inputContainer,
  inputMessage,
  paragraph,
  signInContainer,
  signUpContainer,
  title,
} from "../styles/LoginStyle.css";

function Auth() {
  const [passWordModalOpen, setPassWordModalOpen] = useState(false);
  //로그인
  const navigate = useNavigate();
  const [logInEmail, setLogInEmail] = useState<string>("");
  const [logInPw, setLogInPw] = useState<string>("");

  // const [isLoggedIN, setisLoggedIN] = useState('')

  //회원가입
  const email = useRef<string>("");
  const userName = useRef<string>("");
  const password = useRef<string>("");
  const passwordCheck = useRef<string>("");

  //오류메시지 상태
  const [emailMessage, setEmailMessage] = useState<string>("");
  const [userNameMessage, setUserNameMessage] = useState<string>("");
  const [passwordMessage, setPasswordMessage] = useState<string>("");
  const [passwordCheckMessage, setPasswordCheckMessage] = useState<string>("");
  const [loginErrorMessage, setLoginErrorMessage] = useState<string>("");

  // 이메일이 조건에 충족해야 중복확인 버튼이 활성회되도록, 이메일 중복확인 완료 시, 버튼 비활성화 되도록..  -> state 하나 더 생성

  //유효성검사
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [isUserName, setIsUserName] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [isPasswordCheck, setIsPasswordCheck] = useState<boolean>(false);

  const [isEmailChecked, setIsEmailChecked] = useState<boolean>(false);
  const [isUserNameChecked, setIsUserNameChecked] = useState<boolean>(false);
  // css용 state
  const [signin, setSignIn] = React.useState(true);

  //회원입시 이메일 검증
  const onChangeEmail: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const currentEmail = e.target.value;
    email.current = currentEmail;

    const emailRegExp =
      /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;

    if (!emailRegExp.test(currentEmail)) {
      setEmailMessage("이메일 형식이 올바르지 않습니다");
      setIsEmail(false);
    } else {
      setEmailMessage("이메일 중복확인을 해주세요.");
      setIsEmail(true);
    }
  };

  // 이메일 중복확인
  async function fetchEmailDoubleCheck() {
    setIsEmailChecked(true);
    setEmailMessage("");
    setIsEmail(false);
    alert("이메일 유효성 검증 중");

    // 서버 켜지면 아래 코드 주석 풀기
    // try {
    //   const response = await axios.post("/api/v1/user/emailvalid/", {
    //     userEmail: email,
    //   });
    //   console.log(response.data);
    //   // 중복이면
    //   if (response.status === 400) {
    //     setEmailMessage("이미 존재하는 이메일입니다");
    //     //중복 아니면
    //   } else if (response.status === 201) {
    // setIsEmailChecked(true);
    // setEmailMessage("");
    // setIsEmail(false);

    //   } else {
    //     setEmailMessage("이메일 확인 중 오류가 발생했습니다");
    //   }
    // } catch (err) {
    //   console.log("err:", err);
    // }
  }

  //닉네임 유효성 검증
  const onChangeUserName: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const currentName = e.target.value;
    userName.current = currentName;

    if (currentName.length < 2 || currentName.length > 6) {
      setUserNameMessage("닉네임은 2글자 이상 6글자 이하여야합니다.");
      setIsUserName(false);
    } else {
      setUserNameMessage("닉네임 중복확인을 해주세요.");
      //중복확인하면 오류메시지 없어짐
      setIsUserName(true);
    }
  };
  // 닉네임 중복확인
  async function fetchUserNameDoubleCheck() {
    alert("닉네임 유효성 검증 중");
    setIsUserNameChecked(true);
    setUserNameMessage("");
    setIsUserName(false);

    // 서버 켜지면 아래 코드 주석 풀기
    // try {
    //   const response = await axios.post("/api/v1/user/nickNamevaild/", {
    //     userName: userName,
    //   });
    //   console.log(response.data);
    //   // 중복이면
    //   if (response.status === 400) {
    //     setUserNameMessage("이미 존재하는 이메일입니다");
    //     //중복 아니면
    //   } else if (response.status === 201) {
    //      setUserNameMessage("");
    //     setIsUserName(true);
    // setIsUserName(false);
    //   } else {
    //     setUserNameMessage("이메일 확인 중 오류가 발생했습니다");
    //   }
    // } catch (err) {
    //   console.log("err:", err);
    // }
  }

  //비밀번호 유효성 검증
  const onChangePassword: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const currentPassword = e.target.value;
    password.current = currentPassword;
    const passwordRegExp =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegExp.test(currentPassword)) {
      setPasswordMessage(
        "비밀번호는 숫자+영문자+특수문자를 포함한 8자리 이상이어야 합니다."
      );
      setIsPassword(false);
    } else {
      setPasswordMessage("");
      setIsPassword(true);
    }
  };

  // 비밀번호 확인
  const onChangePasswordConfirm: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const currentPasswordConfirm = e.target.value;
    passwordCheck.current = currentPasswordConfirm;

    if (password.current !== currentPasswordConfirm) {
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

    //회원가입 버튼 클릭 시, 모든 유효성 검사가 참이어야 실행되도록
    if (isEmailChecked && isUserNameChecked && isPassword && isPasswordCheck) {
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
      setSignIn(false);
      // fetchSignUp();
    } else {
      alert("오류메시지를 확인해주세요!!");
    }
    // 데이터 전송 후 값 초기화 코드 _ test 후 주석 풀 예정!
    // setEmail("");
    // setUserName("");
    // setPasswordCheck("");
    // setPassword("");

    // 회원가입 데이터 전송 코드
    async function fetchSignUp() {
      try {
        const response = await axios.post("api/v1/user/register/", {
          userEmail: email,
          nickName: userName,
          password: password,
        });
        console.log(response.data);
        if (response.status === 201) {
          console.log("회원가입 성공!");
          setSignIn(false);
        } else {
          console.log("회원가입을 하는 도중에 오류 발생 ~");
        }
      } catch (err) {
        console.log("err:", err);
      }
    }
  };

  //로그인 버튼 클릭 시 실행되는 함수
  const handleLogin: React.MouseEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log("id :", logInEmail, "/password:", logInPw);
    // navigate("/level");
    // setLogInEmail("");
    // setLogInPw("");
    // setLoginErrorMessage("이메일 또는 비밀번호가 잘못되었습니다");
    // if (logInEmail && logInPw) {
    // FetchLogin();
    //   setLoginErrorMessage("이메일 또는 비밀번호가 잘못되었습니다");
    // } else {
    //   //
    // }

    //로그인 데이터 전송 코드
    async function FetchLogin() {
      try {
        const response = await axios.post(
          "/api/v1/user/login/",
          {
            userId: logInEmail,
            password: logInPw,
          },
          {
            withCredentials: true,
          }
        );
        // const { accessToken } = response.data.token.accessToken;
        // console.log("Access Token:", accessToken);

        console.log(response.data);
        if (response.status === 200) {
          console.log("로그인 성공!");
          navigate("/level");
        } else if (response.status === 400) {
          setLoginErrorMessage("이메일 또는 비밀번호가 잘못되었습니다");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    // 전체 컨테이너
    <div className={container}>
      <PassWordModal
        passWordModalOpen={passWordModalOpen}
        setPassWordModalOpen={setPassWordModalOpen}
      />
      {/* 회원가입 */}
      <div className={signUpContainer} data-signin={signin}>
        <form className={formContainer} onSubmit={handleSignUp}>
          <h1 className={title}>Welcome!</h1>
          <div className={inputContainer}>
            <DuplicateInput
              type="text"
              // value={email}
              onChange={onChangeEmail}
              required
              ErrorMessage={emailMessage}
              onClick={fetchEmailDoubleCheck}
              // isEmail={isEmail}
              disabled={!isEmail}
            >
              Email
            </DuplicateInput>
            <DuplicateInput
              type="text"
              // value={userName}
              onChange={onChangeUserName}
              required
              ErrorMessage={userNameMessage}
              onClick={fetchUserNameDoubleCheck}
              disabled={!isUserName}
            >
              User Name
            </DuplicateInput>
            <Input
              type="password"
              // value={password}
              onChange={onChangePassword}
              required
              ErrorMessage={passwordMessage}
            >
              Password
            </Input>
            <Input
              type="password"
              // value={passwordCheck}
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
          >
            Email
          </Input>
          <Input
            type="password"
            value={logInPw}
            onChange={(e) => setLogInPw(e.target.value)}
            required
          >
            Password
          </Input>
          <p className={inputMessage}>{loginErrorMessage}</p>
          <p className={anchor} onClick={() => setPassWordModalOpen(true)}>
            Forgot your password?
          </p>

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
              Sign Up
            </button>
          </Components.LeftOverlayPanel>

          <Components.RightOverlayPanel signin={signin}>
            <h1 className={title}>Hello, Friend!</h1>
            <p className={paragraph}>
              Enter Your personal details and start journey with us
            </p>

            <button className={ghostButton} onClick={() => setSignIn(false)}>
              Sign In
            </button>
          </Components.RightOverlayPanel>
        </Components.Overlay>
      </Components.OverlayContainer>
    </div>
  );
}
export default Auth;
