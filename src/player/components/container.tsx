import {WithWidthProps} from "@material-ui/core";
import withWidth from "@material-ui/core/withWidth";
import {Observer} from "mobx-react";
import * as React from "react";
import {CSSProperties, ReactElement} from "react";
import {isMobileFN} from "../../shared/layout";
import {Player} from "../../store/player_store";

export interface MainInfoChidrenProps {
  opened: boolean
  mobile: boolean
}

interface MainInfoProps {
  player: Player
  children: ({opened, mobile}: MainInfoChidrenProps) => ReactElement;
}

export const backgroundStyle = (opened: boolean): CSSProperties => ({
  visibility: opened ? "unset" : "hidden",
  position: "fixed", width: "100vw", height: "100vh", top: 0,
  display: "flex", flexDirection: "column"
});
export const PlayerContainerProviderComponent = withWidth()(({player, width, children}: WithWidthProps & MainInfoProps) => {
  return (
    <Observer>
      {() => {
        return (
          <div style={backgroundStyle(player.opened)}>
            {player.opened ? children({opened: player.opened, mobile: isMobileFN({width: width})}) : null}
          </div>
        );
      }}
    </Observer>
  );
})
