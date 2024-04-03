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
    [`&[data-signIn="true"]`]: {
      transform: "translateX(0%)",
      opacity: "1",
      zIndex: "5",
    },
  },
});

export const signInContainer = style({
  position: "absolute",
  top: "0",
  height: "100%",
  transition: "all 0.6s ease-in-out",
  left: "0",
  width: "50%",
  zIndex: "2",
  selectors: {
    [`&[data-signIn="true"]`]: {
      transform: "translateX(0%)",
    },
  },
});

export const form = style({
  backgroundColor: "#ffffff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  padding: "0 50px",
  height: "100%",
  textAlign: "center",
});

export const title = style({
  fontWeight: "bold",
  margin: "0",
});

export const input = style({
  width: "100%",
  border: "none",
  borderRadius: "12px",
  backgroundColor: "#efefef",
  padding: "1rem",
});

export const button = style({
  borderRadius: "20px",
  border: "1px solid #ff4b2b",
  backgroundColor: "#ff4b2b",
  color: "#ffffff",
  fontSize: "12px",
  fontWeight: "bold",
  padding: "12px 45px",
  letterSpacing: "1px",
  textTransform: "uppercase",
  transition: "transform 80ms ease-in",
});

export const ghostButton = style({
  backgroundColor: "transparent",
  borderColor: "#ffffff",
});

export const anchor = style({
  color: "#333",
  fontSize: "14px",
  textDecoration: "none",
  margin: "15px 0",
});

export const overlayContainer = style({
  position: "absolute",
  top: "0",
  left: "50%",
  width: "50%",
  height: "100%",
  overflow: "hidden",
  transition: "transform 0.6s ease-in-out",
  zIndex: "100",
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
