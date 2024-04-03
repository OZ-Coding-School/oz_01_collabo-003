import { style } from "@vanilla-extract/css";

export const week_container = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
});

export const week_main_content_container = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
});

export const week_background_01 = style({
  position: "absolute",
  width: "280px",
  right: "0",
  top: "120px",
});

export const week_background_02 = style({
  position: "absolute",
  width: "350px",
  left: "100px",
  bottom: "30px",
});

export const week_page_title_container = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "100px",
});

export const week_page_title = style({
  fontSize: "48px",
  color: "#485935",
  fontWeight: "bold",
});

export const week_page_subtitle_date = style({
  fontSize: "40px",
  color: "#202020",
});

export const week_select_box_container = style({
  width: "80%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "100px",
});

export const week_select_box = style({
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

export const week_select_text = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});
