import { logoPink, logoYel, mainLogoLayout } from "../styles/LayoutStyle.css";

import "../styles/FontAnimate.css";
function Logo() {
  return (
    <>
      <div className={mainLogoLayout}>
        <img src="img/logo_red.png" alt="logo_red.png" className={logoPink} />
        <section>
          <div className="content">
            <h2>3ENG</h2>
            <h2>3ENG</h2>
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
