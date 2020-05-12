import * as React from "react";
import {Player} from "../../store/player_store";

interface PlayerBackDropProps {
  player: Player
  opened: boolean
  mobile: boolean
}

export const PlayerBackDrop = (props: PlayerBackDropProps) => {
  return <div onClick={() => props.player.setOpened(!props.opened)} style={{flex: 1, width: "100vw",}}/>;
};
