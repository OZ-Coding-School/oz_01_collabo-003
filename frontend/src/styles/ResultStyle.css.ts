import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";
export const resultContainer = style({
  width: "100%",
  height: calc.add("100vh", "-60px"),
  padding: "20px 100px 0 100px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
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
export const resultPageDetail = style({
  width: "100%",
  textAlign: "center",
  zIndex: 1,
  fontSize: "1.2rem",
  marginBottom: "1.2rem",
});
export const flip = style({
  width: "1000px",
  position: "relative",
  perspective: "1100px",
  zIndex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const resultScoreBox = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "60%",
  height: "400px",
  zIndex: 1,
  position: "relative",
});
export const flipped = style({
  transform: "rotateY(180deg)",
});
export const card = style({
  width: "100%",
  height: "100%",
  position: "relative",
  transition: "0.4s",
  transformStyle: "preserve-3d",
});

export const resultImg = style({
  width: "100%",
  height: "400px",

  position: "absolute",
});

export const front = style({
  position: "absolute",
  width: "100%",
  height: "100%",
  backfaceVisibility: "hidden",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
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
export const back = style({
  transform: "rotateY(180deg)",
  position: "absolute",
  width: "100%",
  height: "100%",
  backfaceVisibility: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
export const FlippedContainer = style({
  overflowY: "scroll",
  overflowX: "hidden",
  width: "100%",
  textAlign: "center",
  height: "280px",
  //   background: "red",
  zIndex: 999,
  position: "absolute",
  top: "30px",
  //   "::-webkit-scrollbar": {
  //     borderRadius: "5px",
  //   },
});
export const qiuzDiv = style({
  textAlign: "center",
  marginBottom: "2rem",
});

export const resultButtonDiv = style({
  position: "relative",
  top: -80,
  width: "50%",
  display: "flex",
  justifyContent: "space-around",
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

// export const resultDogImg = style({
//   position: "absolute",
//   zIndex: 999,
//   transform: "rotate(5deg)",
//   width: "350px",
//   top: -180,
//   left: 530,
// });
