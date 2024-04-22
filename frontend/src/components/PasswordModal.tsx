import { FormEventHandler, useEffect, useRef, useState } from "react";
import axios from "../api/axios";
import {
  button,
  disabledButton,
  paragraph,
  title,
} from "../styles/LoginStyle.css";
import { modalContainer, passwordModal } from "../styles/PasswordRest.css";
import Input from "./Input";
type PassWordModalProps = {
  passWordModalOpen: boolean;
  setPassWordModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const PassWordModal = ({
  setPassWordModalOpen,
  passWordModalOpen,
}: PassWordModalProps) => {
  const [email, setEmail] = useState("");
  const [isEmailSended, setIsEmailSended] = useState(false);
  const handleResetPassword = () => {
    console.log("비밀번호재설정");
    fetchPasswordRest();
  };
  const outerBoxRef = useRef(null);
  const handleLogin: FormEventHandler = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    //모달이 열려있지 않을 때
    if (!passWordModalOpen) {
      setEmail("");
    }
  }, [passWordModalOpen]);
  if (!passWordModalOpen) {
    return <></>;
  }
  async function fetchPasswordRest() {
    if (email === "") {
      alert("이메일을 입력해주세요");
    } else {
      setIsEmailSended(true);
      // 서버 켜지면 아래 코드 주석 풀기
      try {
        await axios
          .post("/api/v1/user/passwordReset/", {
            email: email,
          })
          .then((response) => {
            console.log(response.data);
            if (response.status === 200) {
              alert("작성하신 이메일로 비밀번호 재설정 링크가 전송되었습니다");
              setPassWordModalOpen(false);
              setIsEmailSended(false);
            }
          })
          .catch((error) => {
            if (error.response.status === 400) {
              alert("등록되지않은 이메일입니다");
              setIsEmailSended(false);
            }
          });
      } catch (err) {
        console.log("err:", err);
        alert(
          "비밀번호 재설정 링크를 전송하는 과정에서 오류가 발생하였습니다 "
        );
      }
    }
  }
  return (
    <div
      className={modalContainer}
      ref={outerBoxRef}
      onClick={(e) => {
        if (e.target === outerBoxRef.current) {
          setPassWordModalOpen(false);
        }
      }}
    >
      <div className={passwordModal} onSubmit={handleLogin}>
        <h1 className={title}>비밀번호 재설정</h1>
        <p className={paragraph}>
          가입하신 이메일로 비밀번호 재설정 링크가 전송됩니다
        </p>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        >
          Email
        </Input>
        <p className={paragraph}>
          메일이 오지 않으셨다면, 스팸 메일함을 확인해주세요
        </p>

        <button
          disabled={isEmailSended}
          className={isEmailSended ? disabledButton : button}
          type="submit"
          onClick={handleResetPassword}
        >
          메일 보내기
        </button>
      </div>
    </div>
  );
};
export default PassWordModal;
