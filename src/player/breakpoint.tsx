import {Box, Paper} from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import * as React from "react";
import {LoggedComponent} from "../components/logged_provider/logged_provider";
import {flexer} from "../shared/layout";
import {Player} from "../store/player_store";
import {SpotifyPlayer} from "./spotify/spotify_player";
import {WebPlayer} from "./web/web_player";

export const PlayerBreakpoint = ({player, mobile, opened}: { opened: boolean, player: Player, mobile: boolean }) => {
  return (
    <Slide direction="up" in={opened} mountOnEnter={true} unmountOnExit={true}>
      <Box boxShadow={4}>
        <Paper style={extracted(mobile)} elevation={4}>
          <LoggedComponent
            loadingComponent={<div><h2>loading...</h2></div>}
            loggedComponent={<SpotifyPlayer player={player} mobile={mobile}/>}
            notLoggedComponent={<WebPlayer/>}
          />
        </Paper>
      </Box>
    </Slide>
  );
};

const extracted = (mobile: boolean): React.CSSProperties => {
  return {
    ...flexer,
    backgroundColor: "#313131",
    minHeight: mobile ? 300 : 150,
    justifyContent: mobile ? "space-evenly" : "unset",
    flexDirection: mobile ? "column" : "row"
  }
}
