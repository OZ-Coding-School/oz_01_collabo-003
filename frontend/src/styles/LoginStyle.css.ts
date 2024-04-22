import { style } from "@vanilla-extract/css";
import { logoLayout } from "./LayoutStyle.css";

export const logoBgDiv = [
  logoLayout,
  style({
    backgroundImage: `url("/img/bg1.png")`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  }),
];
export const inputdiv = style({
  marginBottom: "1rem",
});
export const inputContainer = style({
  marginBottom: "1.5rem",
});
export const input = style({
  width: "100%",
  border: "none",
  borderRadius: "12px",
  backgroundColor: "#efefef",
  padding: "1rem",
  fontSize: "1rem",
  paddingLeft: "1.5rem",
  marginTop: "0.5rem",
  outlineColor: "#AFAFAF",
});
export const inputLabel = style({
  color: "#8D9188",
  fontSize: "0.8rem",
});
export const duplicateInputDiv = style({
  position: "relative",
  width: "100%",
});
export const duplicateCheckBtn = style({
  position: "absolute",
  width: "80px",
  right: "10px",
  transform: "translateY(54%)",
  backgroundColor: "#D9D9D9",
  // zIndex: 999,
  // backgroundColor: "white",
  // backgroundColor: "#D4D8FF",
  color: "#8C8888",
  // border: "1px solid #D4D8FF",
  border: "none",
  // borderColor: "#D4D8FF",
  borderRadius: "50px",
  padding: "0.5rem",
  cursor: "pointer",
});
export const duplicateCheckBtnChecked = style([
  duplicateCheckBtn,
  {
    // color: "white",
    // backgroundColor: "#7982E8",
    backgroundColor: "#D4D8FF",
  },
]);
export const container = style({
  width: "100%",
  height: "100vh",
  overflow: "hidden",
  maxWidth: "678px",
  minWidth: "100%",
  minHeight: "400px",
});

export const signUpContainer = style({
  position: "absolute",
  top: "0",
  height: "100%",
  transition: "all 0.6s ease-in-out",

  left: "0",
  width: "50%",
  opacity: "0",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: "1",
  selectors: {
    [`&[data-signin="true"]`]: {
      transform: "translateX(0%)",
      opacity: "1",
      zIndex: "5",
    },
  },
  "@media": {
    "screen and (max-width: 900px)": {
      width: "100vw",
      opacity: "1",
      transition: "none",
    },
  },
});

export const signInContainer = style({
  position: "absolute",
  top: 0,
  height: "100%",
  transition: "all 0.6s ease-in-out",

  left: 0,
  width: "50%",
  zIndex: 2,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  selectors: {
    [`&[data-signin="false"]`]: {
      transform: "translateX(100%)",
    },
  },
  "@media": {
    "screen and (max-width: 900px)": {
      position: "fixed",
      left: "-100%",
      width: "100vw",
      zIndex: 999,
      opacity: "1",
      transition: "none",
    },
  },
});

export const formContainer = style({
  backgroundColor: "#ffffff",
  display: "flex",

  justifyContent: "center",
  flexDirection: "column",
  padding: "0 50px",
  height: "100%",

  width: "70%",
  zIndex: 999,
});

export const title = style({
  fontWeight: "bold",
  marginBottom: "1rem",
  color: "#988888",
});

export const titleExplanation = style({
  color: "#8D9188",
});

export const button = style({
  borderRadius: "20px",
  fontSize: "1rem",
  border: "1px solid #838ade9d;",
  backgroundColor: "#7982E8;",
  color: "#ffffff",
  fontWeight: "bold",
  padding: "12px 45px",
  letterSpacing: "1px",
  textTransform: "uppercase",
  transition: "transform 80ms ease-in",
  selectors: {
    "&:active": {
      transform: "scale(0.95)",
      backgroundColor: "#838ade9d",
    },
    "&:focus": {
      outline: "none",
    },
  },
});
export const disabledButton = style([
  button,
  {
    backgroundColor: "#838ade9d",
  },
]);
export const elseButton = style({
  borderRadius: "20px",
  fontSize: "1rem",
  cursor: "pointer",
  border: "1px solid #838ade9d;",
  textAlign: "center",
  color: "black",
  fontWeight: "bold",
  padding: "12px 45px",
  letterSpacing: "1px",
  textTransform: "uppercase",
  transition: "transform 80ms ease-in",
  marginTop: "1rem",
  selectors: {
    "&:active": {
      transform: "scale(0.95)",
      backgroundColor: "#838ade9d",
    },
    "&:focus": {
      outline: "none",
    },
  },
  "@media": {
    "screen and (min-width: 900px)": { display: "none" },
    "screen and (max-width: 900px)": { fontSize: "0.8rem" },
  },
});
export const inputMessage = style({
  color: "#FF4141",
  fontSize: "0.8rem",
  marginTop: "0.5rem",
});

export const ghostButton = style([
  button,
  {
    backgroundColor: "#ffffff",
    color: "black",
    borderColor: "#838ade9d;",
  },
]);

export const anchor = style({
  color: "#333",
  fontSize: "14px",
  textDecoration: "none",
  margin: "15px 0",
  cursor: "pointer",
});

export const overlayContainer = style({
  position: "absolute",
  top: 0,
  left: "50%",
  width: "50%",
  height: "100%",
  overflow: "hidden",
  transition: "transform 0.6s ease-in-out",
  zIndex: 100,
  selectors: {
    [`&[data-signin="false"]`]: {
      transform: "translateX(-100%)",
    },
  },
  "@media": {
    "screen and (max-width: 900px)": {
      display: "none",
    },
  },
});

export const overlay = style({
  backgroundPosition: "0 0",
  color: "#988888",
  position: "relative",
  left: "-100%",
  height: "100%",
  width: "200%",
  transform: "translateX(0)",
  transition: "transform 0.6s ease-in-out",
  selectors: {
    [`&[data-signin="false"]`]: {
      transform: "translateX(50%)",
    },
  },
  "@media": {
    "screen and (max-width: 900px)": {
      display: "none",
    },
  },
});

export const overlayPanel = style({
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  padding: "0 40px",
  textAlign: "center",
  top: "0",
  height: "100%",
  width: "50%",
  transform: "translateX(0)",
  transition: "transform 0.6s ease-in-out",
});

export const leftOverlayPanel = style({
  backgroundImage: "url('../public/img/bg3.png')",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  transform: "translateX(-20%)",
  selectors: {
    [`&[data-signin="false"]`]: {
      transform: "translateX(0)",
    },
  },
});

export const rightOverlayPanel = style({
  backgroundImage: "url('../public/img/bg3.png')",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  right: "0",
  transform: "translateX(0)",
  selectors: {
    [`&[data-signin="false"]`]: {
      transform: "translateX(20%)",
    },
  },
});

export const paragraph = style({
  fontSize: "14px",
  fontWeight: "100",
  lineHeight: "20px",
  letterSpacing: "0.5px",
  margin: "20px 0 30px",
});
