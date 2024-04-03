import { Outlet, Route, Routes } from "react-router-dom";
import AppBar from "../components/appbar/AppBar";
import LevelPage from "../pages/LevelPage";
import LoginPage from "../pages/LoginPage";
import MainPage from "../pages/MainPage";
import WeekPage from "../pages/WeekPage";

const Layout = () => {
  return (
    <div>
      <AppBar />
      <Outlet />
    </div>
  )
}

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/" element={<Layout />}>
        <Route path="/level" element={<LevelPage />} />
        <Route path="/week" element={<WeekPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
