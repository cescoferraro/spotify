import {WithWidthProps} from "@material-ui/core";
import {Observer} from "mobx-react";
import * as React from "react";
import {ReactElement} from "react";
import {isMobileFN} from "../shared/layout";
import {Player} from "../store/player_store";
import {backgroundStyle} from "./styles";

export interface MainInfoChidrenProps {
  opened: boolean
  mobile: boolean
}

interface MainInfoProps {
  player: Player
  children: ({opened, mobile}: MainInfoChidrenProps) => ReactElement;
}

export const PlayerContainerProviderComponent = ({player, width, children}: WithWidthProps & MainInfoProps) => {
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
}
