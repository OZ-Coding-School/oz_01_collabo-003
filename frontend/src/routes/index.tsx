import { Outlet, Route, Routes } from "react-router-dom";
import AppBar from "../components/appbar/AppBar";
import Auth from "../pages/Auth";
import LevelPage from "../pages/LevelPage";
import MainPage from "../pages/MainPage";
import MyLearningPage from "../pages/MyLearningPage";
import QuizPage from "../pages/QuizPage";
import ResultPage from "../pages/ResultPage";
import UserUpdatePage from "../pages/UserUpdatePage";
import WeekPage from "../pages/WeekPage";

const Layout = () => {
  return (
    <div>
      <AppBar />
      <Outlet />
    </div>
  );
};

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/auth/login-signup" element={<Auth />} />
      <Route path="/" element={<Layout />}>
        <Route path="/level" element={<LevelPage />} />
        <Route path="/week" element={<WeekPage />} />
        <Route path="/learning" element={<MyLearningPage />} />
        <Route path="/user-update" element={<UserUpdatePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Route>
    </Routes>
  );
}
export default Router;
