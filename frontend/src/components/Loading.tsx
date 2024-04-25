import "../styles/Loading.css";
const Loading = () => {
  return (
    <div className="loadingContainer">
      {" "}
      <p className="loadingDetail">
        문제를 채점 중 입니다 <br />
        <br /> 잠시만 기다려주세요
      </p>
      <span className="loader"></span>
    </div>
  );
};

export default Loading;
