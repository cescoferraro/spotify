import * as React from "react";
import {CSSProperties} from "react";
import {flexer} from "../shared/layout";

export const paperStyle = (desktop: boolean): React.CSSProperties => {
  return ({
    ...flexer,
    position: "absolute",
    backgroundColor: "#313131",
    bottom: 0,
    width: "100vw",
    height: desktop ? 120 : 300
  });
};
export const backgroundStyle = (opened: boolean): CSSProperties => ({
  visibility: opened ? "unset" : "hidden",
  position: "fixed", width: "100vw", height: "100vh", top: 0
});
