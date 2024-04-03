import { Route, Routes } from "react-router-dom";
import Auth from "../pages/Auth";
import MainPage from "../pages/MainPage";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/auth/login-signup" element={<Auth />} />
    </Routes>
  );
}

export default Router;
