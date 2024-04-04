import { style } from "@vanilla-extract/css";

export const quizContainer = style({
  width: "100%",
  height: "calc(100vh - 60px)",

  padding: "20px 100px ",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});
export const quizTitleContainer = style({
  position: "relative",
  width: "80%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

export const TodayBg = style({
  width: "180px",
});
export const TodayQuiz = style({
  fontSize: "2.3rem",
  position: "absolute",
  top: "40px",
  // fontFamily: "Swanky and Moo Moo",
  width: "250px",
});
export const questionNumbers = style({
  fontSize: "1.3rem",
  transform: "translateY(-20px)",
});
export const question = style({
  paddingBottom: "2rem",
});
export const quizAnswerDiv = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
});

export const quizInput = style({
  fontSize: "1rem",
  width: "60%",
  padding: "2rem 8rem",
  border: "0.5px solid #000000",
  borderRadius: "10px",
  marginBottom: "2rem",
  background: "white",
  textAlign: "center",
  overflow: "unset",
  resize: "none",
  height: "auto",

  ":focus": {
    outline: "none",
  },
});

export const questionInput = style([
  quizInput,
  {
    height: "auto",
    overflow: "unset",
  },
]);
export const quizbuttonDiv = style({
  width: "80%",
  display: "flex",
  justifyContent: "space-evenly",
});
export const quizButton = style({
  backgroundColor: "#7982E8",
  border: "none",
  color: "white",
  width: "6rem",
  padding: "1rem",
  borderRadius: "15px",
});
