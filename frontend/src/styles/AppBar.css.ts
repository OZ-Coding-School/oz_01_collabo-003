import { style } from "@vanilla-extract/css";

export const nav = style({
  position: "absolute",
  zIndex: 999,
  top: 0,
});

export const container = style({
  position: "relative",
  display: "flex",
});

export const menu_bar = style({
  display: "flex",
  position: "relative",
  justifyContent: "center",
  width: "113px",
  height: "100vh",
  backgroundColor: "#D4D8FF",
  ":after": {
    content: "",
    position: "absolute",
    width: "20px",
    right: "-8px",
    backgroundColor: "inherit",
    height: "100vh",
    filter: "blur(4px)",
  },
});

export const menu_icon_input = style({
  display: "none",
  selectors: {
    // "&:checked + .menu_bar .menu_icon .menu_icon_bar:nth-child(1)": {
    //   top: "50%",
    //   transform: "translateY(-50%) rotate(45deg)",
    // },
    //   "&:checked + .menu_bar .menu_icon .menu_icon_bar:nth-child(2)": {
    //     opacity: 0,
    //   },
    //   "&:checked + .menu_bar .menu_icon .menu_icon_bar:nth-child(3)": {
    //     bottom: "50%",
    //     transform: "translateY(50%) rotate(-45deg)",
    //   },
    //   "&:checked + .menu_bar::after": {
    //     display: "none",
    //   },
    //   "&:checked~.menu": {
    //     visibility: "visible",
    //     width: "300px",
    //   },
    //   "&:checked~.menu .user_info": {
    //     visibility: "visible",
    //     display: "flex",
    //     opacity: 1,
    //   },
    //   "&:checked~.menu .user_info .user_nickname": {
    //     visibility: "visible",
    //     display: "flex",
    //     opacity: 1,
    //   },
    //   "&:checked~.menu .menu_list": {
    //     visibility: "visible",
    //     display: "block",
    //     opacity: 1,
    //     marginTop: "30px",
    //   },
    //   "&:checked~.menu .menu_list .menu_list_item": {
    //     visibility: "visible",
    //     opacity: 1,
    //   },
  },
  ":checked": {},
});

export const menu_icon = style({
  display: "block",
  width: "60px",
  height: "40px",
  marginTop: "40px",
  position: "relative",
  cursor: "pointer",
});

export const menu_icon_bar = style({
  display: "block",
  position: "absolute",
  width: "100%",
  height: "5px",
  borderRadius: "30px",
  backgroundColor: "#FFFFFF",
  transition: "all 0.3s",
  selectors: {
    "&:nth-child(1)": {
      top: 0,
    },
    "&:nth-child(2)": {
      top: "50%",
      transform: "translateY(-50%)",
    },
    "&:nth-child(3)": {
      bottom: 0,
    },
  },
});

export const menu = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "absolute",
  width: "0px",
  left: "113px",
  height: "100vh",
  backgroundColor: "#FFFFFF",
  visibility: "hidden",
  transition: "all 0.5s",
});

export const user_info = style({
  visibility: "hidden",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  marginTop: "100px",
  opacity: 0,
  transition: "all 0.3s",
});

export const user_icon = style({
  width: "100px",
  height: "100px",
  backgroundColor: "#F2F2F2",
  opacity: 1,
  borderRadius: "50%",
  transition: "all 1s",
});

export const user_nickname = style({
  display: "block",
  marginTop: "20px",
  fontSize: "24px",
  opacity: 0,
  whiteSpace: "nowrap",
  transition: "all 0.5s",
});

export const menu_list = style({
  visibility: "hidden",
  display: "block",
  opacity: 0,
  transition: "all 0.5s",
});

export const menu_list_item = style({
  visibility: "hidden",
  display: "inline-block",
  textAlign: "center",
  color: "#4A4444",
  transition: "all 1s",
  overflow: "hidden",
  whiteSpace: "nowrap",
  cursor: "pointer",
  lineHeight: "60px",
  fontSize: "32px",
  width: "100%",
  height: "60px",
  opacity: 0,
  ":hover": {
    backgroundColor: "#D9D9D9",
    color: "#FFFFFF",
  },
});
