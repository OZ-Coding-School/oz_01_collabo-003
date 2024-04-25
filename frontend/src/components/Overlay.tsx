import * as Components from "../Components";
import {
  ghostButton,
  overlay,
  overlayContainer,
  paragraph,
  title,
} from "../styles/LoginStyle.css";
type Props = {
  signin: boolean;
  setSignIn: React.Dispatch<React.SetStateAction<boolean>>;
};
function Overlay({ signin, setSignIn }: Props) {
  return (
    <div data-signin={signin} className={overlayContainer}>
      <div data-signin={signin} className={overlay}>
        <Components.LeftOverlayPanel signin={signin}>
          <h1 className={title}>Welcome Back!</h1>
          <p className={paragraph}>
            To keep connected with us please login with your personal info
          </p>
          <button className={ghostButton} onClick={() => setSignIn(true)}>
            Sign Up
          </button>
        </Components.LeftOverlayPanel>
        <Components.RightOverlayPanel signin={signin}>
          <h1 className={title}>Hello, Friend!</h1>
          <p className={paragraph}>
            Enter Your personal details and start journey with us
          </p>
          <button className={ghostButton} onClick={() => setSignIn(false)}>
            Sign In
          </button>
        </Components.RightOverlayPanel>
      </div>
    </div>
  );
}
export default Overlay;
