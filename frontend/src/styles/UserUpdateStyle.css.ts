import { style } from "@vanilla-extract/css";

// 스타일 정의
export const user_background_03 = style({
  position: "absolute",
});

export const week_background_01 = style({
  position: "absolute",
  width: "280px",
  right: "0",
  top: "120px",
});

export const userLogoLayout = style({
  width: "50%",
  display: "flex",
  position: "relative",
  top: "10",
  justifyContent: "center",
  height: "100vh",
});
export const userLogoBg = style({
  width: "13rem",
  height: "10rem",
  marginTop: "7rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundImage: `url('../../public/images/user_background_03.png')`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
});
export const userInfoTitle = style({
  width: "100%",
  fontSize: "2.5rem",
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const userLayout = style({
  width: "50%",
  display: "flex",
  flexDirection: "column",
  position: "relative",
  height: "100vh",
  justifyContent: "center",
  alignItems: "center",
});
export const userInfoDiv = style({
  width: "60%",
  display: "flex",
  flexDirection: "column",
  marginLeft: "auto",
  marginRight: "auto",
});
export const userImgNameDiv = style({
  display: "flex",
  alignItems: "center",
  marginBottom: "2rem",
});
export const userImgDiv = style({
  padding: "0.8rem",
  border: "1px black solid",
  width: "130px",
  height: "130px",
  display: "flex",
  justifyContent: "center",
  borderRadius: "50%",
  marginRight: "2rem",
});
export const userName = style({
  fontSize: "2rem",
});
