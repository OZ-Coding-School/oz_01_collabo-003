import isLogin from "../utils/isLogin";

import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  return isLogin() ? <Navigate to="/level" /> : <Outlet />;
};

export default PublicRoute;
