import { style } from "@vanilla-extract/css";

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
  zIndex: "1",
  selectors: {
    [`&[data-signin="true"]`]: {
      transform: "translateX(0%)",
      opacity: "1",
      zIndex: "5",
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
  selectors: {
    [`&[data-signin="false"]`]: {
      transform: "translateX(100%)",
    },
  },
});
export const formContainer = style({
  backgroundColor: "#ffffff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  padding: "0 50px",
  height: "100%",
  textAlign: "center",
  width: "100%",
});

export const title = style({
  fontWeight: "bold",
  margin: "0",
});

export const input = style({
  width: "30%",
  marginBottom: "2rem",
  border: "none",
  borderRadius: "12px",
  backgroundColor: "#efefef",
  padding: "1rem",
});

export const button = style({
  borderRadius: "20px",
  border: "1px solid #838ade9d;",
  backgroundColor: "#838ade9d;",
  color: "#ffffff",
  fontSize: "12px",
  fontWeight: "bold",
  padding: "12px 45px",
  letterSpacing: "1px",
  textTransform: "uppercase",
  transition: "transform 80ms ease-in",
  selectors: {
    "&:active": {
      transform: "scale(0.95)",
    },
    "&:focus": {
      outline: "none",
    },
  },
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
    "&:not([data-signin])": {
      transform: "translateX(-100%)",
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
    "&:not([data-signin])": {
      transform: "translateX(50%)",
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
});

export const paragraph = style({
  fontSize: "14px",
  fontWeight: "100",
  lineHeight: "20px",
  letterSpacing: "0.5px",
  margin: "20px 0 30px",
});
