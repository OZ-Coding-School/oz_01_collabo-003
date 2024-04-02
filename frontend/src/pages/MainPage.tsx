// import Button from "../components/Button";
import Logo from "../components/Logo";
import { TextDiv, iconBlue, layout } from "../styles/LayoutStyle.css";

function Main() {
  //   const handleClick = () => {
  //     console.log("버튼누르면 로그인창뜨게해야함");
  //   };
  return (
    <div className={layout}>
      <img src="img/icon_blue.png" alt="icon_blue" className={iconBlue} />
      <Logo />
      <div className={TextDiv}>
        <div style={{ zIndex: "99", fontSize: "2rem" }}>
          <p>
            새로운 하루, 새로운 퀴즈! <br /> 3ENG과 함께
            <br />
            즐거운 영어공부를 시작하세요
          </p>
        </div>
      </div>
      {/* <Button type="submit" onClick={handleClick}>
        시작하기
      </Button> */}
    </div>
  );
}

export default Main;
