import { style } from "@vanilla-extract/css";
export const resultContainer = style({
    width: "100%",
 
  
    padding: "20px 100px ",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  });
export const resultPageDetail = style({
  width: "100%",
  textAlign: "center",
  zIndex: 1,
  fontSize: "1.2rem",
  marginBottom: "1.2rem",
});
export const resultScoreBox = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "70%",
  height: "400px",
  zIndex: 1,
  position: "relative",
});
export const resultBg = style({
  width: "180px",
  marginLeft: "30px",
});
export const resultCongratulation = style({
  fontSize: "2.3rem",
  position: "absolute",
  top: "40px",
  left: "0px",
  width: "250px",
});
export const resultDogImg = style({
  position: "absolute",
  zIndex: 999,
  transform: "rotate(5deg)",
  width: "350px",
  top: -180,
  left: 530,
});
export const resultImg = style({
  width: "75%",
  height: "400px",
  zIndex: 10,
  position: "absolute",
});

export const resultBoxbg = style({
  width: "95%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
});
export const yourScoreTitle = style({
  fontSize: "2rem",
  textAlign: "center",
  color: "#202020",
  zIndex: 999,
});
export const score = style({
  marginTop: "3rem",
  fontSize: "7rem",
  textAlign: "center",
  color: "white",
  position: "relative",
  zIndex: 999,
  fontFamily: "Aladin",
});
export const resultButtonDiv = style({
  marginTop: "3rem",
  width: "50%",
  display: "flex",
  justifyContent: "space-evenly",
});
export const resultAgainButton = style({
  position: "relative",
  zIndex: 1000,
  backgroundColor: "#647BDF",
  color: "white",
  border: "none",
  width: "100px",
  height: "50px",
  borderRadius: "20px",
  fontSize: "1.2rem",
  cursor: "pointer",
});

export const resultDetailButton = style([
  resultAgainButton,
  { border: "2px solid #647BDF", backgroundColor: "white", color: "#647BDF" },
]);
