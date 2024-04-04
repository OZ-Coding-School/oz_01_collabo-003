import { composeStyles, style } from "@vanilla-extract/css";
import { logoLayout } from "./LayoutStyle.css";

export const logoBgDiv = composeStyles(
  logoLayout,
  style({
    backgroundImage: `url("/img/bg1.png")`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  })
);
export const formContainer = style({
  width: "50%",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
});
export const input = style({
  //   width: "100%",
  //   border: "none",
  //   borderRadius: "12px",
  //   backgroundColor: "#EFEFEF",
  //   padding: "1rem",
  width: "100%",
  marginBottom: "2rem",
  border: "none",
  borderRadius: "12px",
  backgroundColor: "#efefef",
  padding: "1rem",
});
export const duplicateInputDiv = style({
  position: "relative",
  width: "100%",
});
export const duplicateCheckBtn = style({
  position: "absolute",
  top: "50%",
  right: "0",
  transform: "translateY(-50%)",
  backgroundColor: "#D9D9D9",
  color: "#8C8888",
  border: "none",
  borderRadius: "50px",
  padding: "0.5rem",
  cursor: "pointer",
});
