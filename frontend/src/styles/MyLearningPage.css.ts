import { style } from "@vanilla-extract/css";

export const my_learning_page_main_container = style({
  width: "100%",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

export const my_learning_page_title = style({
  fontSize: "40px",
  color: "#7982E8",
  margin: "20px 0 30px 0",
});

export const my_learning_page_content_container = style({
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  marginLeft: "50px",
  width: "1600px",
  height: "75%",
  padding: "40px 0",
  backgroundColor: "#F6F4FF",
  borderRadius: "50px",
});

export const my_learning_page_content_box01 = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  width: "600px",
  height: "100%",
});

export const learning_box_01_title_container = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "150px",
  backgroundColor: "#FFFFFF",
  borderRadius: "50px",
});

export const learning_box_01_title = style({
  fontSize: "45px",
  color: "#828390",
  margin: "0",
});

export const learning_box_01_content_container = style({
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "390px",
  backgroundColor: "#FFFFFF",
  borderRadius: "50px",
  overflow: "hidden",
  padding: "40px 40px 0 40px",
});

export const learning_box_01_content_box = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  height: "100%",
  overflow: "scroll",
  scrollbarWidth: "none",
});

export const learning_box_01_content_title = style({
  fontSize: "45px",
  color: "#828390",
  margin: "0",
});

export const learning_box_01_content = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "65px",
  backgroundColor: "#EDECEC",
  borderRadius: "20px",
  margin: "10px 0",
  flexShrink: 0,
  color: "#000000",
  fontSize: "25px",
  cursor: "pointer",
});

export const my_learning_page_content_box02 = style({
  width: "1px",
  height: "100%",
  backgroundColor: "#C9CDC5",
});

export const my_learning_page_content_box03 = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  width: "600px",
  height: "100%",
});

export const learning_box_03_graph_box = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "390px",
  backgroundColor: "#FFFFFF",
  borderRadius: "50px",
  fontSize: "45px",
});

export const learning_box_03_title_container = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "150px",
  backgroundColor: "#FFFFFF",
  borderRadius: "50px",
});

export const learning_box_03_title = style({
  fontSize: "45px",
  color: "#828390",
  margin: "0",
});

export const myLearningPageContentComponent = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "600px",
  height: "100%",
  padding: "80px 40px",
  borderRadius: "50px",
  backgroundColor: "#FFFFFF",
  overflow: "hidden",
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
