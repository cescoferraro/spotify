import {isWidthDown, WithWidthProps} from "@material-ui/core";

export const isMobileFN = ({width}: WithWidthProps): boolean => {
  return isWidthDown("sm", width || "xs");
};
export const flexer = {alignItems: "center", display: "flex", justifyContent: "center"};
