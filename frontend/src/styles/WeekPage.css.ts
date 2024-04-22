import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

export const weekContainer = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: calc.add("100vh", "-60px"),
});

export const weekBackgroundImage01 = style({
  position: "absolute",
  width: "280px",
  right: "0",
  top: "120px",
});

export const weekBackgroundImage02 = style({
  position: "absolute",
  width: "350px",
  left: "20px",
  bottom: "50px",
});

export const weekMainContentContainer = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
});

export const weekPageTitleContainer = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "100px",
});

export const weekPageTitle = style({
  fontSize: "48px",
  color: "#222222",
  fontWeight: "bold",
  "@media": {
    "(max-width: 1200px)": {
      paddingLeft: "60px",
      fontSize: "32px",
    },
  },
});

export const weekPageSubtitleDate = style({
  fontSize: "40px",
  color: "#202020",
  "@media": {
    "(max-width: 1200px)": {
      paddingLeft: "60px",
      fontSize: "32px",
    },
  },
});

export const weekSelectBoxContainer = style({
  boxSizing: "border-box",
  width: "95%",
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  marginBottom: "100px",
  overflow: "auto",
  paddingLeft: "110px",
  scrollbarWidth: "none",
});

export const weekSelectBox = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "180px",
  color: "#485935",
  fontSize: "32px",
  height: "230px",
  backgroundColor: "#EFE1D6",
  borderRadius: "80px 80px 80px 0",
  cursor: "pointer",
  flexShrink: 0,
  margin: "10px 60px 10px 0",
  transition: "all 0.3s",
  overflow: "hidden",
  selectors: {
    '&[data-score="true"]': {
      backgroundColor: "red",
    },
  },
  ":hover": {
    transform: "scale(1.03)",
    boxShadow: "5px 5px 0 0 #F4F8F1",
  },
  ":active": {
    transform: "none",
    boxShadow: "none",
  },
});

export const weekSelectText = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});
