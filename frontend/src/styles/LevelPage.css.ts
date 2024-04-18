import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

export const levelPageMainContainer = style({
  display: "flex",
  position: "relative",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100vw",
  height: calc.add("100vh", "-60px"),
  zIndex: 1,
});

export const levelPageTopMenu = style({
  top: "0px",
  boxSizing: "border-box",
  padding: "0px 50px 0px 150px",
  alignItems: "flex-end",
  height: "60px",
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  zIndex: 900,
});

export const levelPageLogo = style({
  width: "100px",
  flexShrink: 0,
});

export const levelPageTopButton = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "rgba(0, 0, 0, 0.3)",
  top: "20px",
  right: "50px",
  width: "120px",
  height: "45px",
  borderRadius: "12px",
  fontSize: "17px",
  border: "1px solid rgba(0, 0, 0, 0.3)",
  cursor: "pointer",
  ":hover": {
    backgroundColor: "#7982E8",
    color: "#FFFFFF",
    border: "none",
  },
});

export const levelPageBackgroundImage = style({
  top: "50px",
  right: 0,
  position: "absolute",
  width: "30%",
  height: "50%",
  zIndex: -1,
});

export const levelPageContainer = style({
  width: "100%",
  maxWidth: "1263px",
  display: "flex",
  paddingLeft: "65px",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  transition: "all 0.3s",
  "@media": {
    // "screen and (max-width: 1400px)": {
    //   height: "90%",
    // },
    // "screen and (max-width: 768px)": {
    //   height: "80%",
    // },
    // "screen and (max-width: 500px)": {
    //   height: "70%",
    // },
  },
});

export const levelPageTitle = style({
  marginBottom: "20px",
});

export const levelPageButtonContainer = style({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  "@media": {
    "screen and (max-width: 1400px)": {},
    "screen and (max-width: 1024px)": {
      // alignItems: "flex-start",
      overflowX: "auto",
      scrollbarWidth: "none",
    },
    "screen and (max-width: 860px)": {
      alignItems: "flex-start",
    },
  },
});

export const levelPageButtonContainerOne = style({
  display: "flex",
  justifyContent: "space-evenly",
  width: "100%",
  height: "100%",
  alignItems: "center",
  flexWrap: "wrap",
  // marginBottom: "50px",
  flexShrink: 0,
  transition: "all 0.3s",
  "@media": {
    "screen and (max-width: 1400px)": {
      width: "800px",
    },
    "screen and (max-width: 1024px)": {
      flexWrap: "nowrap",
      overflowX: "auto",
      scrollbarWidth: "none",
      // paddingLeft: "50px",
      flexShrink: 1,
    },
    "screen and (max-width:870px)": {
      paddingLeft: "45px",
    },
  },
});

// export const levelPageButtonContainerTwo = style({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "space-evenly",
//   width: "100%",
//   flexShrink: 0,
//   transition: "all 0.3s",
//   "@media": {
//     "screen and (max-width: 1280px)": {
//       marginBottom: "50px",
//     },
//     "screen and (max-width: 880px)": {
//       marginLeft: "65px",
//     },
//     "screen and (max-width: 768px)": {
//       marginLeft: "120px",
//     },
//     "screen and (max-width: 700px)": {
//       marginLeft: "200px",
//     },
//     "screen and (max-width: 600px)": {
//       marginLeft: "270px",
//     },
//     "screen and (max-width: 500px)": {
//       marginLeft: "380px",
//     },
//   },
// });

export const levelPageButtonOne = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "300px",
  minWidth: "200px",
  margin: "10px 0",
  backgroundColor: "#FEE5E5",
  borderRadius: "25%",
  cursor: "pointer",
  boxShadow: "none",
  transition: "all 0.3s",
  selectors: {
    "&[data-index='3']": {
      backgroundColor: "#FEF8D5",
    },
    "&[data-index='4']": {
      backgroundColor: "#FEF8D5",
    },
    "&[data-index='5']": {
      backgroundColor: "#FEF8D5",
    },
  },
  ":before": {
    content: '""',
    display: "block",
    paddingTop: "100%",
  },
  ":hover": {
    transform: "scale(1.03)",
    boxShadow: "5px 5px 0 0 #F4F8F1",
  },
  ":active": {
    transform: "none",
    boxShadow: "none",
  },
  "@media": {
    "screen and (max-width: 1400px)": {
      width: "220px",
    },
    "screen and (max-width: 1024px)": {
      width: "220px",
      marginRight: "50px",
    },
    // "screen and (max-width: 1024px)": {
    //   width: "220px",
    // },
    // "screen and (max-width: 768px)": {
    //   width: "170px",
    // },
    // "screen and (max-width: 500px)": {
    //   width: "130px",
    // },
  },
});

// export const levelPageButtonTwo = style({
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   width: "300px",
//   minWidth: "200px",
//   margin: "10px 0",
//   backgroundColor: "#FEF8D5",
//   borderRadius: "25%",
//   cursor: "pointer",
//   boxShadow: "none",
//   transition: "all 0.3s",
//   ":before": {
//     content: '""',
//     display: "block",
//     paddingTop: "100%",
//   },
//   ":hover": {
//     transform: "scale(1.03)",
//     boxShadow: "5px 5px 0 0 #F4F8F1",
//   },
//   ":active": {
//     transform: "none",
//     boxShadow: "none",
//   },
//   "@media": {
//     "screen and (max-width: 1400px)": {
//       width: "220px",
//     },
//     "screen and (max-width: 1280px)": {
//       width: "220px",
//       marginRight: "50px",
//     },
//     // "screen and (max-width: 1024px)": {
//     //   width: "220px",
//     // },
//     // "screen and (max-width: 768px)": {
//     //   width: "170px",
//     // },
//     // "screen and (max-width: 500px)": {
//     //   width: "130px",
//     // },
//   },
// });

export const levelPageButtonText = style({
  fontSize: "64px",
  color: "#595959",
  transition: "all 0.3s",
  "@media": {
    "screen and (max-width: 1400px)": {
      fontSize: "40px",
    },
    "screen and (max-width: 1280px)": {
      fontSize: "40px",
    },
    // "screen and (max-width: 1024px)": {
    //   fontSize: "32px",
    // },
    // "screen and (max-width: 768px)": {
    //   fontSize: "24px",
    // },
    // "screen and (max-width: 500px)": {
    //   fontSize: "24px",
    // },
  },
});
