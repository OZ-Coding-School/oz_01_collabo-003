import { style } from "@vanilla-extract/css";
export const infoLayout = style({
  display: "flex",
  width: "100%",
  paddingLeft: "65px",
  height: "calc(100vh - 60px)",

  position: "relative",
  "@media": {
    "screen and (max-width: 1024px)": {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  },
});
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
  justifyContent: "center",
  height: "calc(100vh - 60px)",
  "@media": {
    "screen and (max-width: 1024px)": {
      height: "auto",
      marginBottom: "1.5rem",
    },
  },
});
export const userLogoBg = style({
  width: "13rem",
  height: "10rem",
  marginTop: "7rem",
  color: "#202020",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundImage: `url('../../public/images/user_background_03.png')`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
  "@media": {
    "screen and (max-width: 1024px)": {
      marginTop: "-3rem",
      height: "6rem",
      width: "8rem",
    },
  },
});
export const userInfoTitle = style({
  width: "100%",
  fontSize: "2.5rem",
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  "@media": {
    "screen and (max-width: 1024px)": {
      fontSize: "1.9rem",
    },
  },
});

export const userLayout = style({
  width: "60%",
  display: "flex",
  flexDirection: "column",
  position: "relative",
  height: "calc(100vh - 60px)",
  justifyContent: "center",
  alignItems: "center",

  "@media": {
    "screen and (max-width: 1024px)": {
      height: "auto",
    },
  },
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
  position: "relative",
  width: "100%",
});
export const userImgDiv = style({
  border: "1px black solid",
  width: "130px",
  height: "130px",
  display: "flex",
  justifyContent: "center",
  borderRadius: "50%",
  marginRight: "2rem",
  alignItems: "center",
  overflow: "hidden",
  "@media": {
    "screen and (max-width: 1024px)": {
      width: "130px",
      height: "130px",
    },
    "screen and (max-width: 768px)": {
      width: "100px",
      height: "100px",
    },
    "screen and (max-width:  570px)": {
      width: "90px",
      height: "90px",
    },
  },
});
export const userImgsrc = style({
  overflow: "hidden",
  objectFit: "cover",
  height: "100%",
  width: "100%",
});
export const userName = style({
  fontSize: "2.3rem",
  marginBottom: "0.5rem",
  "@media": {
    "screen and (max-width: 1024px)": {
      fontSize: "2.2rem",
    },
    "screen and (max-width: 570px)": {
      fontSize: "1.8rem",
    },
  },
});
export const editSvg = style({
  position: "absolute",
  top: 85,
  left: 110,
  zIndex: 999,
  "@media": {
    "screen and (max-width: 768px)": {
      width: "25px",
      top: 69,
      left: 84,
    },
    "screen and (max-width: 570px)": {
      top: 60,
      left: 75,
    },
  },
});
