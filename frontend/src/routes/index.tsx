import { Outlet, Route, Routes } from "react-router-dom";
import AppBar from "../components/appbar/AppBar";
import LevelPage from "../pages/LevelPage";
import MainPage from "../pages/MainPage";

const Layout = () => {
  return (
    <div className="app_layout">
      <AppBar />
      <Outlet />
    </div>
  )
}

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/" element={<Layout />}>
        <Route path="/level" element={<LevelPage />} />
        {/* <Route path="/auth/sign-up" element={<SignUpPage />} />
        <Route path="/auth/log-in" element={<LogInPage />} /> */}
      </Route>
    </Routes>
  );
}

export default Router;
