import * as React from "react";
import {CSSProperties} from "react";
import {flexer} from "../shared/layout";

let mobileHeight = 400;
export const paperStyle = (desktop: boolean): React.CSSProperties => {
  return ({
    ...flexer,
    position: "absolute",
    backgroundColor: "#313131",
    bottom: 0,
    width: "100vw",
    height: desktop ? 120 : mobileHeight
  });
};
export const innerStyle = (desktop: boolean): React.CSSProperties => {
  return ({
    width: "100%",
    height: desktop ? 120 : mobileHeight,
    display: "flex",
    flexDirection: desktop ? "row" : "column",
    justifyContent: "space-evenly"
  });
};

export const backgroundStyle = (opened: boolean): CSSProperties => ({
  visibility: opened ? "unset" : "hidden",
  position: "fixed", width: "100vw", height: "100vh", top: 0
});
