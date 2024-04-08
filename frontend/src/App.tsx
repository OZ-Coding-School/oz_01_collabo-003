import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import { GlobalStyles } from "./styles/GlobalStyle";

// import axios from "./api/axios"; => axios로 불러오기!

function App() {
  return (
    <BrowserRouter>
   
        <Router />
   
    </BrowserRouter>
  );
}

export default App;
