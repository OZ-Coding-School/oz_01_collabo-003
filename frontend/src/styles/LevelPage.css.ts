import { style } from "@vanilla-extract/css";

export const level_page_main_container = style({
  display: "flex",
  position: "relative",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  zIndex: 1,
});

export const level_page_top_menu = style({
  marginTop: "40px",
  position: "absolute",
  boxSizing: "border-box",
  padding: "0 50px 30px 200px",
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  zIndex: 900,
});

export const level_page_logo = style({
  width: "100px",
});

export const level_page_top_button = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "rgba(0, 0, 0, 0.3)",
  top: "20px",
  right: "50px",
  width: "156px",
  height: "61px",
  borderRadius: "12px",
  fontSize: "22px",
  border: "1px solid rgba(0, 0, 0, 0.3)",
  cursor: "pointer",
  ":hover": {
    backgroundColor: "#7982E8",
    color: "#FFFFFF",
  },
});

export const level_page_background_image = style({
  top: "130px",
  right: 0,
  position: "absolute",
  width: "400px",
  height: "505px",
  zIndex: -1,
});

export const level_page_container = style({
  width: "100%",
  maxWidth: "1263px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  alignItems: "center",
});

export const level_page_title = style({
  marginBottom: "36px",
});

export const level_page_button_container_one = style({
  display: "flex",
  justifyContent: "space-evenly",
  width: "100%",
  flexWrap: "wrap",
});

export const level_page_button_container_two = style({
  display: "flex",
  justifyContent: "space-evenly",
  width: "100%",
  flexWrap: "wrap",
});

export const level_page_button_one = style({
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

export const level_page_button_two = style({
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

export const level_page_button_text = style({
  fontSize: "64px",
  color: "#595959",
});
