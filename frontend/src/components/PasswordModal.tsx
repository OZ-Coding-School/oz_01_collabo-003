import { FormEventHandler, useEffect, useRef, useState } from "react";
import { button, paragraph, title } from "../styles/LoginStyle.css";
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
  const [Email, setEmail] = useState("");
  const handleResetPassword = () => {
    console.log("비밀번호재설정");
    // fetchPasswordRest()
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
    // 서버 켜지면 아래 코드 주석 풀기
    // try {
    //   const response = await axios.post("/api/v1/user/passwordReset/", {
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
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
        >
          Email
        </Input>

        <p className={paragraph}>
          메일을 못받으셨다면 다시 보내기 버튼을 눌러주세요
        </p>

        <button className={button} type="submit" onClick={handleResetPassword}>
          다시보내기
        </button>
      </div>
    </div>
  );
};
export default PassWordModal;
