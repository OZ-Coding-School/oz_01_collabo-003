import { useNavigate } from "react-router-dom";
import {
  anchor,
  button,
  elseButton,
  formContainer,
  inputMessage,
  signInContainer,
  title,
} from "../styles/LoginStyle.css";

import { useState } from "react";
import axios from "../api/axios";
import Input from "./Input";

type Props = {
  signin: boolean;
  setSignIn: React.Dispatch<React.SetStateAction<boolean>>;
  setPassWordModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function Login({ signin, setSignIn, setPassWordModalOpen }: Props) {
  const navigate = useNavigate();
  //로그인
  const [logInEmail, setLogInEmail] = useState<string>("");
  const [logInPw, setLogInPw] = useState<string>("");
  const [loginErrorMessage, setLoginErrorMessage] = useState<string>("");

  //로그인 버튼 클릭 시 실행되는 함수
  const handleLogin: React.MouseEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log("id :", logInEmail, "/password:", logInPw);
    // setLogInEmail("");
    // setLogInPw("");

    if (logInEmail && logInPw) {
      FetchLogin();
      setLoginErrorMessage("");
    } else {
      setLoginErrorMessage("이메일 또는 비밀번호가 잘못되었습니다");
    }

    //로그인 데이터 전송 코드
    async function FetchLogin() {
      try {
        await axios
          .post(
            "/api/v1/user/login/",
            {
              email: logInEmail,
              password: logInPw,
            },
            {
              withCredentials: true,
            }
          )
          .then((response) => {
            console.log(response);
            if (response.status === 200) {
              console.log("로그인 성공!");
              navigate("/level");
              //로컬스토리지에 엑세스토큰 넣기
              const accessToken = response.data.access_token;

              console.log("Access Token:", accessToken);
              localStorage.setItem("accessToken", accessToken);
              localStorage.setItem("refreshToken", response.data.refresh_token);
            }
          })
          .catch((error) => {
            if (error.response.status === 400) {
              setLoginErrorMessage("이메일 또는 비밀번호가 잘못되었습니다");
              console.log(error);
            } else if (error.response.status === 409) {
              alert("이미 탈퇴한 사용자입니다");
            } else {
              console.log(error);
              alert(
                "로그인을 하는 중 오류가 발생하였습니다. 다시 시도해주세요"
              );
            }
          });
      } catch (error) {
        alert("로그인을 하는 중 오류가 발생하였습니다. 다시 시도해주세요");
      }
    }
  };
  return (
    <div className={signInContainer} data-signin={signin}>
      <form className={formContainer} onSubmit={handleLogin}>
        <h1 className={title}>Sign in</h1>

        <p className={inputMessage}>{loginErrorMessage}</p>
        <p className={anchor} onClick={() => setPassWordModalOpen(true)}>
          Forgot your password?
        </p>
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
        <button className={button}>Sign In</button>
        <p className={elseButton} onClick={() => setSignIn(true)}>
          아직 계정이 없으신가요?
        </p>
      </form>
    </div>
  );
}

export default Login;
