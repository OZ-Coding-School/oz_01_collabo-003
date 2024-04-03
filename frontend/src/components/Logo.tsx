import { logoLayout, logoPink, logoYel } from "../styles/LayoutStyle.css";

import "../styles/FontAnimate.css";
function Logo() {
  return (
    <>
      {/* <img src="img/icon_blue.png" alt="icon_blue" className={iconBlue} /> */}
      <div className={logoLayout}>
        <img src="img/logo_red.png" alt="logo_red.png" className={logoPink} />
        <section>
          <div className="content">
            <h2>3Eng</h2>
            <h2>3Eng</h2>
          </div>
        </section>

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
