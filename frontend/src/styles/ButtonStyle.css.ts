import { style } from "@vanilla-extract/css";

export const buttonStyle = style({
  // color: vars.color.white,
  // backgroundColor: vars.color.purple2 ,
  color: "#FFFFFF",
  backgroundColor: "#838ade9d",
  fontSize: "2.5rem",
  fontWeight: "bolder",
  width: "18%",
  // padding: "0.3rem",
  height: "10%",
  border: "none",
  borderRadius: "50px",
  position: "absolute",
  cursor: "pointer",
  transition: "box-shadow 0.3s",
});
export const mainButton = style([
  buttonStyle,
  {
    left: "50%",
    transform: "translateX(-50%)",
    top: "82%",
    boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
    transition: "all 0.3s cubic-bezier(.25,.8,.25,1);",
    ":hover": {
      boxShadow: "0 12px 18px rgba(0,0,0,0.25), 0 8px 1px rgba(0,0,0,0.22)",
    },
  },
]);

export const formButton = style([
  buttonStyle,
  { left: "50%", transform: "translateX(-50%)", top: "75%" },
]);
export const userUpdateButton = style([
  buttonStyle,
  {
    marginTop: "0.5rem",
    width: "100%",
    height: "40px",
    fontSize: "1.5rem",
    position: "relative",
    textAlign: "center",
  },
]);
export const userUpdateSelectButton = style([
  buttonStyle,
  {
    marginTop: "0.2rem",
    marginBottom: "1rem",
    width: "100%",
    height: "30px",
    fontSize: "1rem",
    position: "relative",
    textAlign: "center",
    background: "white",
    color: "black",
    border: "1px solid black",
    borderRadius: 0,
  },
]);
