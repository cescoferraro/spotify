import React from "react";
import {PlaylistProps} from "../playlist_index";
import {DesktopHeaderContainer} from "./container";
import {DesktopFixedHeightList} from "./list";

export const DesktopPage = ((props: PlaylistProps) => {
    return (
      <DesktopHeaderContainer props={props}>
        <DesktopFixedHeightList
          list={props.songs}
          player={props.player}
          owner={props.owner}
          playID={props.playID}
          pace={props.pace}
          data={props.data}
          fetchMore={props.fetchMore}
        />
      </DesktopHeaderContainer>
    );
  }
);
