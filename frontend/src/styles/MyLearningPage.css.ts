import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

export const myLearningPageMainContainer = style({
  width: "100%",
  height: calc.add("100vh", "-60px"),
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

export const myLearningPageTitle = style({
  fontSize: "40px",
  color: "#7982E8",
  margin: "20px 0 30px 0",
  "@media": {
    "screen and (max-width: 700px)": {
      fontSize: "30px",
      margin: "20px 0 40px 30px",
    },
    "screen and (max-height:680px)": {
      fontSize: "30px",
    },
  },
});

export const myLearningPageContentContainer = style({
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  marginLeft: "50px",
  flexWrap: "wrap",
  width: "75%",
  height: "80%",
  padding: "2.7% 0",
  backgroundColor: "#F6F4FF",
  borderRadius: "50px",
});

export const widthAnimation = style({
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  flexWrap: "wrap",
  width: "100%",
  height: "100%",
  borderRadius: "50px",
  transformStyle: "preserve-3d",
  transition: "transform 0.5s",
  "@media": {
    "screen and (max-width: 1350px)": {
      position: "relative",
      display: "block",
      padding: "none",
      width: "0",
      borderRadius: "50px",
    },
  },
});

export const rotate = style({
  "@media": {
    "screen and (max-width: 1350px)": {
      selectors: {
        "&[data-clicked='true']": {
          transform: "rotateY(180deg)",
        },
      },
    },
  },
});

export const myLearningPageContentBox01 = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  width: "40%",
  height: "100%",
  "@media": {
    "screen and (max-width: 1350px)": {
      position: "absolute",
      width: "570px",
      top: "0",
      left: "50%",
      transform: "translateX(-50%)",
      backfaceVisibility: "hidden",
    },
    "screen and (max-width: 830px)": {
      width: "500px",
    },
    "screen and (max-width: 700px)": {
      width: "370px",
    },
  },
});

export const learningBox01TitleContainer = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "26%",
  backgroundColor: "#FFFFFF",
  borderRadius: "50px",
});

export const learningBox01Title = style({
  fontSize: "45px",
  color: "#828390",
  margin: "0",
  "@media": {
    "screen and (max-width: 700px)": {
      fontSize: "35px",
    },
    "screen and (max-height:680px)": {
      fontSize: "35px",
    },
  },
});

export const learningBox01ContentContainer = style({
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "67.5%",
  backgroundColor: "#FFFFFF",
  borderRadius: "50px",
  overflow: "hidden",
  padding: "40px 40px 0 40px",
});

export const learningBox01ContentTitle = style({
  fontSize: "45px",
  color: "#828390",
  margin: "0",
  "@media": {
    "screen and (max-width: 700px)": {
      fontSize: "35px",
    },
    "screen and (max-height:680px)": {
      fontSize: "35px",
    },
  },
});

export const learningBox01ContentBox = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  height: "100%",
  overflow: "scroll",
  scrollbarWidth: "none",
});

export const learningBox01Content = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "22.5%",
  backgroundColor: "#EDECEC",
  borderRadius: "20px",
  margin: "10px 0",
  flexShrink: 0,
  color: "#000000",
  fontSize: "25px",
  cursor: "pointer",
  selectors: {
    [`&[data-click="true"]`]: {
      backgroundColor: "#D4D8FF",
      color: "#FFFFFF",
    },
  },
  "@media": {
    "screen and (max-width: 700px)": {
      fontSize: "20px",
    },
    "screen and (max-height:680px)": {
      fontSize: "20px",
    },
  },
});

export const myLearningPageContentBox02 = style({
  width: "1px",
  height: "100%",
  backgroundColor: "#C9CDC5",
  "@media": {
    "screen and (max-width: 1350px)": {
      display: "none",
    },
  },
});

export const myLearningPageContentBox03 = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  width: "40%",
  height: "100%",
  "@media": {
    "screen and (max-width: 1350px)": {
      position: "absolute",
      width: "570px",
      top: "0",
      left: "50%",
      transform: "translateX(-50%) rotateY(180deg)",
      zIndex: -1,
      backfaceVisibility: "hidden",
    },
    "screen and (max-width: 830px)": {
      width: "500px",
    },
    "screen and (max-width: 700px)": {
      width: "370px",
    },
  },
});

export const learningBox03GraphBox = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "67.5%",
  backgroundColor: "#FFFFFF",
  borderRadius: "50px",
  fontSize: "25px",
});

export const learningBox03TitleContainer = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "26%",
  backgroundColor: "#FFFFFF",
  borderRadius: "50px",
});

export const learningBox03Title = style({
  fontSize: "45px",
  color: "#828390",
  margin: "0",
  "@media": {
    "screen and (max-width: 700px)": {
      fontSize: "35px",
    },
    "screen and (max-height:680px)": {
      fontSize: "35px",
    },
  },
});

export const myLearningPageContentComponent = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "576px",
  height: "100%",
  padding: "80px 40px",
  borderRadius: "50px",
  backgroundColor: "#FFFFFF",
  overflow: "hidden",
  boxShadow: "0 2px 5px 0 rgba(0, 0, 0, 0.1)",
  zIndex: 999,
  "@media": {
    "screen and (max-width: 1540px)": {
      position: "absolute",
      top: "0",
      left: "50%",
      transform: "translateX(-50%)",
      backfaceVisibility: "hidden",
    },
    "screen and (max-width: 830px)": {
      width: "500px",
    },
    "screen and (max-width: 700px)": {
      width: "370px",
    },
  },
});

export const reviewItemContainer = style({
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  overflow: "scroll",
  scrollbarWidth: "none",
});

export const reviewItem = style({
  display: "flex",
  flexDirection: "column",
});

export const reviewQuestion = style({
  display: "flex",
});

export const reviewItemText = style({
  margin: "16px 0",
});

export const reviewInputContainer = style({
  boxSizing: "border-box",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  position: "relative",
});

export const userAnswerButton = style({
  position: "absolute",
  marginRight: "5px",
  width: "50px",
  height: "40px",
  borderRadius: "10px",
  backgroundColor: "#D4D8FF",
  color: "#000",
  border: "none",
  cursor: "pointer",
  ":hover": {
    transform: "scale(1.03)",
    boxShadow: "0 0 2px 0 rgba(0, 0, 0, 0.3)",
  },
  ":active": {
    transform: "none",
    boxShadow: "none",
  },
});

export const userAnswer = style({
  width: "400px",
  height: "50px",
  borderRadius: "10px",
  border: "0.5px solid #000",
  paddingLeft: "10px",
  outline: "none",
  "@media": {
    "screen and (max-width: 700px)": {
      width: "300px",
    },
  },
});

export const reviewItemAnswerTextContainer = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
});

export const reviewScreen = style({
  display: "flex",
  alignItems: "center",
  position: "absolute",
  margin: "16px 0",
  width: "100%",
  height: "30px",
  color: "red",
  borderRadius: "10px",
  backgroundColor: "#FFFFFF",
});

export const reviewItemAnswerText = style({
  margin: "16px 0",
  color: "red",
});

export const line = style({
  width: "100%",
  height: "1px",
  margin: "24px 0",
  backgroundColor: "#D9D9D9",
});
