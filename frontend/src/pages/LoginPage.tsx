import axios from "axios";
import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { layout, logoPink, logoYel } from "../styles/LayoutStyle.css";
import { formContainer, logoBgDiv } from "../styles/LoginStyle.css";

function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin: React.MouseEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log("id :", id, "/password:", password);

    //로그인 데이터 전송 코드
    async function FetchLogin() {
      try {
        const response = await axios.post(
          "https://6907-122-32-46-97.ngrok-free.app/api/v1/user/login/",
          {
            userId: id,
            password: password,
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
    <>
      {/* 로그인 */}
      <div className={layout}>
        <div className={logoBgDiv}>
          <img
            src="/img/logo_red.png"
            alt="logo_red.png"
            className={logoPink}
          />
          <img
            src="/img/logo_yellow.png"
            alt="logo_yellow.png"
            className={logoYel}
            // value={id}
          />
        </div>
        <div className={formContainer}>
          <div>
            {/* {" "}
            <button>signUp</button>
            <button>LogIn</button> */}
          </div>

          <div>
            <p>Welcome!</p>
            <p>Please signUp to your account.</p>
          </div>
          <div>
            <Input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
            >
              ID
            </Input>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            >
              Password
            </Input>
          </div>
          <Button type="submit" onClick={handleLogin}>
            LogIn
          </Button>

          <p>already member? Login</p>
        </div>
      </div>
      {/* 회원가입 */}
      <div className={layout}>
        <div className={logoBgDiv}>
          <img src="img/logo_red.png" alt="logo_red.png" className={logoPink} />
          <img
            src="img/logo_yellow.png"
            alt="logo_yellow.png"
            className={logoYel}
            // value={id}
          />
        </div>
        <div className={formContainer}>
          <div>
            <p>Welcome!</p>
            <p>Please signUp to your account.</p>
          </div>
          <div>
            <Input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
            >
              ID
            </Input>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            >
              Password
            </Input>
          </div>
          <Button type="submit" onClick={handleLogin}>
            LogIn
          </Button>
          <p>already member? Login</p>
        </div>
      </div>
    </>
  );
}

export default Login;
