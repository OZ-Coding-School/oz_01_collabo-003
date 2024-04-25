import { container } from "../styles/NotFoundPage.css";

const NotFoundPage = () => {
  return (
    <div className={container}>
      <h1>페이지를 찾을 수 없음</h1>
      <p>죄송합니다. 입력하신 URL에 해당하는 페이지를 찾을 수 없습니다.</p>
    </div>
  );
};

export default NotFoundPage;
