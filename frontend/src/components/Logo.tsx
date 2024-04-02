import { logoDiv, logoPink, logoYel } from "../styles/LayoutStyle.css";

function Logo() {
  return (
    <>
      {/* <img src="img/icon_blue.png" alt="icon_blue" className={iconBlue} /> */}
      <div className={logoDiv}>
        <img src="img/logo_red.png" alt="logo_red.png" className={logoPink} />
        <img
          src="img/logo_yellow.png"
          alt="logo_yellow.png"
          className={logoYel}
        />
      </div>
    </>
  );
}

export default Logo;
