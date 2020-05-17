import React from "react";
import {PlaylistProps} from "../playlist_index";
import {DesktopHeaderContainer} from "./container";
import {DesktopFixedHeightList} from "./list";

export const DesktopPage = ((props: PlaylistProps) => {
    return (
      <DesktopHeaderContainer props={props}>
        <DesktopFixedHeightList {...props}/>
      </DesktopHeaderContainer>
    );
  }
);
