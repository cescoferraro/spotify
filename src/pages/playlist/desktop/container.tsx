import {Box, isWidthDown, WithWidthProps} from "@material-ui/core";
import withWidth from "@material-ui/core/withWidth";
import React, {ReactElement} from "react";
import {DesktopHead} from "./header";
import {NewComponentImage} from "./playlist_image";

export const DesktopHeaderContainer = withWidth()(({width, children, props}: WithWidthProps & { props: any, children: ReactElement }) => {
  return !isWidthDown("sm", width || "xs") ? (
    <React.Fragment>
      <DesktopHead props={props}/>
      <div style={{height: "65vh", backgroundColor: "#646464"}}>
        <Box style={{height: "100%", display: "flex"}}>
          <NewComponentImage data={props.data}/>
          <Box style={{width: "65%"}}>
            {children}
          </Box>
        </Box>
      </div>
    </React.Fragment>
  ) : null;
})
