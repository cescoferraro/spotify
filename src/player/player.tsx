import {WithWidthProps} from "@material-ui/core";
import withWidth from "@material-ui/core/withWidth";
import {Observer} from "mobx-react";
import * as React from "react";
import {isDesktopFN} from "../shared/layout";
import {Player} from "../store/player_store";
import {PlayerDrawer} from "./drawer";
import {PlayerBackDrop} from "./playerBackDrop";
import {backgroundStyle} from "./styles";

export const PlayerComponentDrawer = withWidth()((props: WithWidthProps & { player: Player }) => {
    return (
      <Observer>
        {() => {
          const onClick = () => props.player.setOpened(!props.player.opened);
          const isDesktop = isDesktopFN({width: props.width});
          const opened = props.player.opened;
          return (
            <div style={backgroundStyle(opened)}>
              <PlayerBackDrop opened={opened} onClick={onClick} desktop={isDesktop}/>
              <PlayerDrawer props={props} desktop={isDesktop}/>
            </div>
          );
        }}
      </Observer>
    );
  }
);
