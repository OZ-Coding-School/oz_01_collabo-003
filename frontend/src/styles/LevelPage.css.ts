import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

export const levelPageMainContainer = style({
  display: "flex",
  position: "relative",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: calc.add("100vh", "-60px"),
  zIndex: 1,
});

export const levelPageTopMenu = style({
  // marginTop: "40px",
  // position: "fixed",
  top: "0px",
  boxSizing: "border-box",
  padding: "0px 50px 0px 150px",
  // alignItems: "center",
  alignItems: "flex-end",
  height: "60px",
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  zIndex: 900,
});

export const levelPageLogo = style({
  width: "100px",
  flexShrink: 0,
});

export const levelPageTopButton = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "rgba(0, 0, 0, 0.3)",
  top: "20px",
  right: "50px",
  width: "120px",
  height: "45px",
  borderRadius: "12px",
  fontSize: "17px",
  border: "1px solid rgba(0, 0, 0, 0.3)",
  cursor: "pointer",
  ":hover": {
    backgroundColor: "#7982E8",
    color: "#FFFFFF",
    border: "none",
  },
});

export const levelPageBackgroundImage = style({
  top: "50px",
  right: 0,
  position: "absolute",
  width: "400px",
  height: "505px",
  zIndex: -1,
});

export const levelPageContainer = style({
  width: "100%",
  maxWidth: "1263px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  alignItems: "center",
});

export const levelPageTitle = style({
  marginBottom: "36px",
});

export const levelPageButtonContainerOne = style({
  display: "flex",
  justifyContent: "space-evenly",
  width: "100%",
  flexWrap: "wrap",
});

export const levelPageButtonContainerTwo = style({
  display: "flex",
  justifyContent: "space-evenly",
  width: "100%",
  flexWrap: "wrap",
});

export const levelPageButtonOne = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "10px",
  width: "320px",
  height: "273px",
  backgroundColor: "#FEE5E5",
  borderRadius: "80px",
  cursor: "pointer",
  boxShadow: "none",
  transition: "all 0.3s",
  ":hover": {
    transform: "scale(1.03)",
    boxShadow: "5px 5px 0 0 #F4F8F1",
  },
  ":active": {
    transform: "none",
    boxShadow: "none",
  },
});

export const levelPageButtonTwo = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "50px",
  width: "320px",
  height: "273px",
  backgroundColor: "#FEF8D5",
  borderRadius: "80px",
  cursor: "pointer",
  boxShadow: "none",
  transition: "all 0.3s",
  ":hover": {
    transform: "scale(1.03)",
    boxShadow: "5px 5px 0 0 #F4F8F1",
  },
  ":active": {
    transform: "none",
    boxShadow: "none",
  },
});

export const levelPageButtonText = style({
  fontSize: "64px",
  color: "#595959",
});
