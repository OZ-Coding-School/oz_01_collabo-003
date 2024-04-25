import isLogin from "../utils/isLogin";

import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  if (!isLogin()) {
    alert("로그인이 필요한 기능입니다.");
    return <Navigate to="/auth/login-signup" />;
  }
  return <Outlet />;
};

export default PrivateRoute;
