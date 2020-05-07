import {Box, Slider, WithWidthProps} from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
import PlayArrow from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import * as React from "react";
import {flexer} from "../../shared/layout";
import {Player} from "../../store/player_store";

export const PlayButton = () => {
  return <Fab>
    <PlayArrow/>
  </Fab>;
};

export const BackButton = () => {
  return <Fab>
    <SkipPreviousIcon/>
  </Fab>;
};

export const FFButton = () => {
  return <Fab>
    <SkipNextIcon/>
  </Fab>;
};

export const ControlBox = (props: { desktop: boolean }) => {
  return (
    <Box style={{
      width: props.desktop ? "33%" : `calc( 100% - ${24 * 2}px)`,
      padding: 24,
      display: "flex",
      justifyContent: "space-evenly"
    }}>
      <BackButton/>
      <PlayButton/>
      <FFButton/>
    </Box>
  );
};

export const SliderBox = (props: { desktop: boolean }) => {
  return (
    <Box
      style={{
        width: props.desktop ? "33%" : `calc( 100% - ${24 * 2}px)`,
        display: "flex",
        padding: 24
      }}>
      <Box style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        <Typography align={"center"}> 00:00 </Typography></Box>
      <Box
        style={{transform: "translate( 0px, 0px)", width: "100%", paddingLeft: 24, paddingRight: 24}}>
        <Slider
          value={0}
          onChange={(e) => {
          }}
          aria-labelledby="continuous-slider"
        />
      </Box>
      <Box style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        <Typography align={"center"}> 03:00 </Typography></Box>
    </Box>
  );
};

export const InfoBox = (props: { desktop: boolean, props: WithWidthProps & { player: Player } }) => {
  return (
    <Box style={{...flexer, padding: 24, width: props.desktop ? "33%" : `calc( 100% - ${24 * 2}px)`}}>
      <Box>
        <Typography align={"center"}>
          {props.props.player.current_song.name}
        </Typography>
        <Typography align={"center"}>
          {props.props.player.current_song.artist}
        </Typography>
      </Box>
    </Box>
  );
};
