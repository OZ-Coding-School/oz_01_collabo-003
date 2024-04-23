import { style } from "@vanilla-extract/css";

export const buttonStyle = style({
  color: "#FFFFFF",
  backgroundColor: "#838ade9d",
  fontSize: "2.5rem",
  fontWeight: "bolder",
  width: "18%",
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
    backgroundColor: "#838ade9d",
    width: "270px",
    left: "50%",
    outline: "none",
    transform: "translateX(-50%)",
    top: "82%",
    boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
    selectors: {
      "&:hover": {
        backgroundColor: "#7982E8;",
        border: "1px solid #838ade9d;",
      },
      "&:focus": {
        outline: "none",
      },
    },
    "@media": {
      "screen and (max-width: 900px)": {
        top: "89%",
      },

      "screen and (max-width: 500px)": {
        top: "95%",
      },
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
export const userDeleteButton = style([
  userUpdateButton,
  {
    background: "#D9D9D9",
    // color: "#D9D9D9",
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
