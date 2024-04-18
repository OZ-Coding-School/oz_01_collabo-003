import { style } from "@vanilla-extract/css";
export const resultContainer = style({
  width: "100%",

  height: "calc(100vh - 60px)",
  padding: "20px 0px 20px 65px ",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});
export const resultBg = style({
  width: "180px",
  marginLeft: "30px",
  "@media": {
    "screen and (max-width: 768px)": {
      width: "150px",
    },
  },
});
export const resultCongratulation = style({
  fontSize: "2.3rem",
  position: "absolute",
  color: "#202020",
  textAlign: "center",
  fontFamily: "Space Mono",
  "@media": {
    "screen and (max-width: 768px)": {
      fontSize: "1.8rem",
    },
  },
});
export const resultPageDetail = style({
  width: "100%",
  textAlign: "center",
  zIndex: 1,
  fontSize: "1.2rem",
  marginBottom: "1.2rem",
  color: "rgba(32, 32, 32, 0.8)",
});
export const flip = style({
  width: "1000px",
  position: "relative",
  perspective: "1100px",
  zIndex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "@media": {
    "screen and (max-width: 1024px)": {
      width: "900px",
    },
    "screen and (max-width: 768px)": {
      width: "700px",
    },
    "screen and (max-width: 500px)": {
      width: "500px",
    },
  },
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
export const resultBackground = style({
  width: "100%",
  height: "400px",
  position: "absolute",
  borderRadius: "30px",
  background:
    "radial-gradient(circle, rgba(121,130,232,0.77) 0%, rgba(179,185,255,0.57)70%)",
  filter: "blur(2.5px)",
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
  position: "absolute",
  top: "3rem",
  fontSize: "2rem",
  textAlign: "center",
  color: "rgba(1,1,1,71%)",
  zIndex: 999,
  fontFamily: "Space Mono",
  "@media": {
    "screen and (max-width: 500px)": {
      fontSize: "1.5rem",
    },
  },
});
export const score = style({
  marginTop: "2rem",
  fontSize: "10rem",

  textAlign: "center",
  color: "white",
  // position: "relative",
  zIndex: 999,
  fontFamily: "Ownglyph_meetme-Rg",

  "@media": {
    "screen and (max-width: 500px)": {
      fontSize: "8rem",
    },
  },
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
  zIndex: 999,
  position: "absolute",
  top: "30px",
});
export const qiuzDiv = style({
  textAlign: "center",
  marginBottom: "2rem",
});

export const resultButtonDiv = style({
  position: "relative",
  top: -80,
  width: "80%",
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

// export const resultDogImg = style({
//   position: "absolute",
//   zIndex: 999,
//   transform: "rotate(5deg)",
//   width: "350px",
//   top: -180,
//   left: 530,
// });
