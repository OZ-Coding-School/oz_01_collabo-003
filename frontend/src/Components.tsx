import styled from "styled-components";

// export const Container = styled.div`
//   width: 100%;
//   height: 100vh;
//   overflow: hidden;
//   width: 678px;
//   max-width: 100%;
//   min-height: 400px;
// `;
export const SignUpContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
  ${(props) =>
    props.signIn !== true
      ? `
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
  `
      : null}
`;

export const SignInContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  z-index: 2;
  ${(props) => (props.signIn !== true ? `transform: translateX(100%);` : null)}
`;

export const Form = styled.form`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
`;

export const Title = styled.h1`
  font-weight: bold;
  margin: 0;
`;

export const Input = styled.input`
  width: 30%;
  margin-bottom: 2rem;
  border: none;
  border-radius: 12px;
  background-color: #efefef;
  padding: 1rem;
`;

export const Button = styled.button`
  color: "#FFFFFF";

  font-size: "2rem";
  width: "28%";
  height: "10%";
  border: "none";
  border-radius: "50px";
  position: "absolute";
  cursor: "pointer";
  border-radius: 20px;
  background-color: #838ade9d;
  border: 1px solid #838ade9d;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  &:active {
    transform: scale(0.95);
  }
  &:focus {
    outline: none;
  }
`;
export const GhostButton = styled(Button)`
  background-color: transparent;
  border-color: #ffffff;
`;

export const Anchor = styled.a`
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
`;
export const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
  ${(props) => (props.signIn !== true ? `transform: translateX(-100%);` : null)}
`;

export const Overlay = styled.div`
  background-position: 0 0;
  color: #988888;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;

  ${(props) => (props.signIn !== true ? `transform: translateX(50%);` : null)}
`;

export const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
`;

export const LeftOverlayPanel = styled(OverlayPanel)`
  background-image: url("../public/img/bg3.png");
  background-repeat: no-repeat;
  background-size: cover;
  transform: translateX(-20%);
  ${(props) => (props.signIn !== true ? `transform: translateX(0);` : null)}
`;

export const RightOverlayPanel = styled(OverlayPanel)`
  background-image: url("../public/img/bg3.png");
  background-repeat: no-repeat;
  background-size: cover;
  right: 0;
  transform: translateX(0);
  ${(props) => (props.signIn !== true ? `transform: translateX(20%);` : null)}
`;

export const Paragraph = styled.p`
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
`;
