import { style } from "@vanilla-extract/css";

export const buttonStyle = style({
  // color: vars.color.white,
  // backgroundColor: vars.color.purple2 ,
  color: "#FFFFFF",
  backgroundColor: "#838ade9d",
  fontSize: "2rem",
  width: "28%",
  height: "10%",
  border: "none",
  borderRadius: "50px",
  position: "absolute",
  cursor: "pointer",
});
export const mainButton = style([
  buttonStyle,
  { left: "50%", transform: "translateX(-50%)", top: "75%" },
]);
export const formButton = style([
  buttonStyle,
  { left: "50%", transform: "translateX(-50%)", top: "75%" },
]);
