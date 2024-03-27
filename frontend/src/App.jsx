import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [firstData, setFirstData] = useState("");

  useEffect(() => {
    // axios.get("http://127.0.0.1:8000").then((res) => {
    //   console.log("ㅁㄴㅇ", res);
    //   setFirstData(res.data);
    // });

    fetch("http://127.0.0.1:8000", {
      method: "GET",
    })
      // .then((res) => {
      //   // console.log("res", res.data.message);
      //   setFirstData(res.data.message);
      // })
      .then((res) => res.json())
      .then(data => {
        console.log("data", data);
        setFirstData(data.message);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  if (!firstData) return <div className="test_hello">데이터가 없습니다..</div>;
  return (
    <div>
      <div className="test_hello">{firstData}</div>
    </div>
  );
}

export default App;
