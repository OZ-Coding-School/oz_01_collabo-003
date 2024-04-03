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

export const box1 = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  width: "600px",
  height: "100%",
});

export const box1_box1 = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "150px",
  backgroundColor: "#FFFFFF",
  borderRadius: "50px",
});

export const box1_text = style({
  fontSize: "45px",
  color: "#828390",
  margin: "0",
});

export const box1_box2 = style({
  width: "100%",
  height: "390px",
  backgroundColor: "#FFFFFF",
  borderRadius: "50px",
});

export const box2 = style({
  width: "1px",
  height: "100%",
  backgroundColor: "#C9CDC5",
});

export const box3 = style({
  width: "600px",
  height: "550px",
  backgroundColor: "#FFFFFF",
  borderRadius: "50px",
});
