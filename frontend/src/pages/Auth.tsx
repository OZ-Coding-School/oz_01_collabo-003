import React, { useState } from "react";
import Login from "../components/LogIn";
import Overlay from "../components/Overlay";
import PassWordModal from "../components/PasswordModal";
import SignUp from "../components/SignUp";
import { container } from "../styles/LoginStyle.css";

function Auth() {
  const [passWordModalOpen, setPassWordModalOpen] = useState(false);
  // css용 state
  const [signin, setSignIn] = React.useState(false);
  return (
    // 전체 컨테이너
    <div className={container}>
      <PassWordModal
        passWordModalOpen={passWordModalOpen}
        setPassWordModalOpen={setPassWordModalOpen}
      />
      {/* 로그인 */}
      <Login
        setPassWordModalOpen={setPassWordModalOpen}
        signin={signin}
        setSignIn={setSignIn}
      />
      {/* 회원가입 */}
      <SignUp signin={signin} setSignIn={setSignIn} />
      {/* 오버레이 */}
      <Overlay signin={signin} setSignIn={setSignIn} />
    </div>
  );
}
export default Auth;
