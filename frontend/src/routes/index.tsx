
import { Route, Routes,Outlet } from "react-router-dom";
import Auth from "../pages/Auth";
import AppBar from "../components/appbar/AppBar";
import LevelPage from "../pages/LevelPage";
import LoginPage from "../pages/LoginPage";
import MainPage from "../pages/MainPage";
import MyLearningPage from "../pages/MyLearningPage";
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
      <Route path="/auth/login-signup" element={<Auth />} />
      <Route path="/" element={<Layout />}>
        <Route path="/level" element={<LevelPage />} />
        <Route path="/week" element={<WeekPage />} />
        <Route path="/learning" element={<MyLearningPage />} />
      </Route>
    </Routes>
  );
}
export default Router;
