import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Router from "./routes";

// import axios from "./api/axios"; => axios로 불러오기!

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
