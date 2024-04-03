// import Button from "../components/Button";
import Button from "../components/Button";
import Logo from "../components/Logo";
import { iconBlue, layout, textLayout } from "../styles/LayoutStyle.css";
import "../styles/MainTextStyle.css";
function Main() {
  const handleClick = () => {
    console.log("버튼누르면 로그인 페이지로 이동");
  };
  return (
    <div className={layout}>
      <img src="img/icon_blue.png" alt="icon_blue" className={iconBlue} />
      <Logo />
      <div className={textLayout}>
        <div id="container">
          3Eng과 함께
          <div id="flip">
            <div>
              <div>새로운 하루</div>
            </div>
            <div>
              <div>새로운 퀴즈</div>
            </div>
            <div>
              <div>재밌는 공부</div>
            </div>
          </div>
          지금 시작하세요
        </div>
      </div>
      <Button type="submit" onClick={handleClick}>
        시작하기
      </Button>
    </div>
  );
}

export default Main;
