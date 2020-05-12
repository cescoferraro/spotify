import * as React from "react";
import {Player} from "../store/player_store";
import {PlayerBreakpoint} from "./breakpoint";
import {PlayerContainerProviderComponent} from "./components/container";
import {PlayerBackDrop} from "./components/playerBackDrop";

export const PlayerComponentDrawer = (({player}: { player: Player }) => {
    return (
      <PlayerContainerProviderComponent player={player}>
        {({opened, mobile}) => (
          <React.Fragment>
            <PlayerBackDrop opened={opened} mobile={mobile} player={player}/>
            <PlayerBreakpoint opened={opened} mobile={mobile} player={player}/>
          </React.Fragment>
        )}
      </PlayerContainerProviderComponent>
    );
  }
);

