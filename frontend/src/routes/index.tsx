import { Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}>
        {/* <Route path="/" element={<HomPage />} />
        <Route path="/tils/write" element={<WriteTilPage />} />
        <Route path="/tils/:tilId" element={<TilDetailPage />} />
        <Route path="/auth/sign-up" element={<SignUpPage />} />
        <Route path="/auth/log-in" element={<LogInPage />} /> */}
      </Route>
    </Routes>
  );
}

export default Router;
