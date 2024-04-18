import { useState } from "react";
import axios from "../api/axios";
import {
  button,
  elseButton,
  formContainer,
  inputContainer,
  signUpContainer,
  title,
} from "../styles/LoginStyle.css";
import DuplicateInput from "./DuplicateInput";
import Input from "./Input";
type Props = {
  signin: boolean;
  setSignIn: React.Dispatch<React.SetStateAction<boolean>>;
};
function SignUp({ signin, setSignIn }: Props) {
  //유효성검사
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [isUserName, setIsUserName] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [isPasswordCheck, setIsPasswordCheck] = useState<boolean>(false);
  const [isEmailChecked, setIsEmailChecked] = useState<boolean>(false);
  const [isUserNameChecked, setIsUserNameChecked] = useState<boolean>(false);

  //오류메시지 상태
  const [emailMessage, setEmailMessage] = useState<string>("");
  const [userNameMessage, setUserNameMessage] = useState<string>("");
  const [passwordMessage, setPasswordMessage] = useState<string>("");
  const [passwordCheckMessage, setPasswordCheckMessage] = useState<string>("");

  //회원가입
  const [email, setEmail] = useState<string>("");
  const [nickName, setNickName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");
  // 이메일 중복확인
  async function fetchEmailDoubleCheck() {
    // setIsEmailChecked(true);
    // setEmailMessage("");
    // setIsEmail(false);
    alert("이메일 유효성 검증 중");

    // 서버 켜지면 아래 코드 주석 풀기
    try {
      const response = await axios.post("/api/v1/user/emailvalid/", {
        email: email,
      });
      console.log(response.data);
      // 중복이면
      if (response.status === 400) {
        setEmailMessage("이미 존재하는 이메일입니다");
        //중복 아니면
      } else if (response.status === 200) {
        setIsEmailChecked(true);
        setEmailMessage("");
        setIsEmail(false);
      } else {
        setEmailMessage("이메일 확인 중 오류가 발생했습니다");
      }
    } catch (err) {
      console.log("err:", err);
    }
  }

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
  // 닉네임 중복확인
  async function fetchUserNameDoubleCheck() {
    alert("닉네임 유효성 검증 중");

    // 서버 켜지면 아래 코드 주석 풀기
    try {
      await axios
        .post("/api/v1/user/nickNamevalid/", {
          nickName: nickName,
        })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            setUserNameMessage("");
            setIsUserName(false);
            setIsUserNameChecked(true);
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
  }

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
      setPasswordMessage("");
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
      setEmailMessage("이메일 중복확인을 해주세요.");
      setIsEmail(true);
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
        "/nickName:",
        nickName,
        "/password:",
        password,
        "/passwordCheck:",
        passwordCheck
      );
      setSignIn(false);
      fetchSignUp();
    } else {
      alert("오류메시지를 확인해주세요!");
    }
    // 데이터 전송 후 값 초기화 코드 _ test 후 주석 풀 예정!
    // setEmail("");
    // setUserName("");
    // setPasswordCheck("");
    // setPassword("");

    // 회원가입 데이터 전송 코드

    async function fetchSignUp() {
      try {
        const response = await axios.post("/api/v1/user/register/", {
          email: email,
          nickName: nickName,
          password: password,
        });
        console.log(response.data);
        if (response.status === 201) {
          // console.log("회원가입 성공!");
          alert(`환영합니다 ${nickName} 님!`);
          setSignIn(false);
        } else {
          console.log("회원가입을 하는 도중에 오류 발생 ");
          alert("회원가입 도중 오류가 발생하였습니다. 다시 시도해주세요");
        }
      } catch (err) {
        console.log("err:", err);
        alert("회원가입 도중 오류가 발생하였습니다. 다시 시도해주세요");
      }
    }
  };

  return (
    <div className={signUpContainer} data-signin={signin}>
      <form className={formContainer} onSubmit={handleSignUp}>
        <h1 className={title}>Welcome!</h1>
        <div className={inputContainer}>
          <DuplicateInput
            type="text"
            value={email}
            onChange={onChangeEmail}
            required
            ErrorMessage={emailMessage}
            onClick={fetchEmailDoubleCheck}
            disabled={!isEmail}
          >
            Email
          </DuplicateInput>
          <DuplicateInput
            type="text"
            value={nickName}
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
            onPaste={(e) => e.preventDefault()}
          >
            Password
          </Input>
        </div>
        <button className={button}>Sign Up</button>
        <p className={elseButton} onClick={() => setSignIn(false)}>
          이미 계정이 있으신가요?
        </p>
      </form>
    </div>
  );
}

export default SignUp;
