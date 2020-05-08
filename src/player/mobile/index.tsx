import {Box, IconButton, Slider, WithWidthProps} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import * as React from "react";
import {flexer} from "../../shared/layout";
import {Player} from "../../store/player_store";

export const PlayButton = () => {
  return <IconButton>
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M19.9999 0C8.95994 0 -6.10352e-05 8.96 -6.10352e-05 20C-6.10352e-05 31.04 8.95994 40 19.9999 40C31.0399 40 39.9999 31.04 39.9999 20C39.9999 8.96 31.0399 0 19.9999 0ZM15.9999 29V11L27.9999 20L15.9999 29Z"
        fill="white"/>
    </svg>
  </IconButton>;
};

export const BackButton = () => {
  return <IconButton>
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0H2.66667V16H0V0ZM4.66667 8L16 16V0L4.66667 8Z" fill="white"/>
    </svg>
  </IconButton>;
};

export const FFButton = () => {
  return <IconButton>
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 16L11.3333 8L0 0V16ZM13.3333 0V16H16V0H13.3333Z" fill="white"/>
    </svg>
  </IconButton>;
};

export const ActionBox = (props: { desktop: boolean }) => {
  return (
    <Box
      px={props.desktop ? 1 : 3}
      style={{
        width: props.desktop ? "33%" : `calc( 100% - ${24 * 2}px)`,
        display: "flex",
        justifyContent: "space-evenly"
      }}
    >
      <BackButton/>
      <PlayButton/>
      <FFButton/>
    </Box>
  );
};

export const ControlBox = (props: { desktop: boolean }) => {
  return (
    <Box

      px={props.desktop ? 1 : 3}
      style={{
        width: props.desktop ? "33%" : `calc( 100% - ${24 * 2}px)`,
        display: "flex",
        justifyContent: "space-evenly"
      }}
    >
      <IconButton>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6.59009 5.17L2.12009 0.7C1.73009 0.31 1.10009 0.31 0.710093 0.7C0.320093 1.09 0.320093 1.72 0.710093 2.11L5.17009 6.57L6.59009 5.17ZM11.3501 0.85L12.5401 2.04L0.700093 13.88C0.310093 14.27 0.310093 14.9 0.700093 15.29C1.09009 15.68 1.72009 15.68 2.11009 15.29L13.9601 3.46L15.1501 4.65C15.4601 4.96 16.0001 4.74 16.0001 4.29V0.5C16.0001 0.22 15.7801 0 15.5001 0H11.7101C11.2601 0 11.0401 0.54 11.3501 0.85ZM10.8301 9.41L9.42009 10.82L12.5501 13.95L11.3501 15.15C11.0401 15.46 11.2601 16 11.7101 16H15.5001C15.7801 16 16.0001 15.78 16.0001 15.5V11.71C16.0001 11.26 15.4601 11.04 15.1501 11.36L13.9601 12.55L10.8301 9.41Z"
            fill="white"/>
        </svg>
      </IconButton>
      <IconButton>
        <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M14.5 0C12.76 0 11.09 0.81 10 2.09C8.91 0.81 7.24 0 5.5 0C2.42 0 0 2.42 0 5.5C0 9.28 3.4 12.36 8.55 17.04L10 18.35L11.45 17.03C16.6 12.36 20 9.28 20 5.5C20 2.42 17.58 0 14.5 0ZM10.1 15.55L10 15.65L9.9 15.55C5.14 11.24 2 8.39 2 5.5C2 3.5 3.5 2 5.5 2C7.04 2 8.54 2.99 9.07 4.36H10.94C11.46 2.99 12.96 2 14.5 2C16.5 2 18 3.5 18 5.5C18 8.39 14.86 11.24 10.1 15.55Z"
            fill="white"/>
        </svg>
      </IconButton>
      <IconButton>
        <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3.99996 5H14V6.79C14 7.24 14.54 7.46 14.85 7.14L17.64 4.35C17.84 4.15 17.84 3.84 17.64 3.64L14.85 0.850002C14.54 0.540002 14 0.760002 14 1.21V3H2.99996C2.44996 3 1.99996 3.45 1.99996 4V8C1.99996 8.55 2.44996 9 2.99996 9C3.54996 9 3.99996 8.55 3.99996 8V5ZM14 15H3.99996V13.21C3.99996 12.76 3.45996 12.54 3.14996 12.86L0.359961 15.65C0.159961 15.85 0.159961 16.16 0.359961 16.36L3.14996 19.15C3.45996 19.46 3.99996 19.24 3.99996 18.79V17H15C15.55 17 16 16.55 16 16V12C16 11.45 15.55 11 15 11C14.45 11 14 11.45 14 12V15Z"
            fill="white"/>
        </svg>
      </IconButton>
    </Box>
  );
};

export const SliderBox = (props: { desktop: boolean }) => {
  const styles = makeStyles({root: {color: "white"}})();
  return (
    <Box
      px={props.desktop ? 1 : 3}
      style={{
        width: props.desktop ? "33%" : `calc( 100% - ${24 * 2}px)`,
        display: "flex",
      }}>
      <Box style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        <Typography style={{color: "white"}} align={"center"}> 00:00 </Typography></Box>
      <Box
        style={{...flexer, transform: "translate( 0px, 0px)", width: "100%", paddingLeft: 24, paddingRight: 24}}>
        <Slider
          classes={{colorPrimary: styles.root}}
          value={0}
          onChange={(e) => {
          }}
          aria-labelledby="continuous-slider"
        />
      </Box>
      <Box style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        <Typography style={{color: "white"}} align={"center"}> 03:00 </Typography></Box>
    </Box>
  );
};

export const InfoBox = (props: { desktop: boolean, props: WithWidthProps & { player: Player } }) => {
  return (
    <Box
      px={props.desktop ? 1 : 3}
      style={{...flexer, width: props.desktop ? "33%" : `calc( 100% - ${24 * 2}px)`}}>
      <Box>
        <Typography variant={"h5"} style={{color: "white"}} align={"center"}>
          {props.props.player.current_song.name}
        </Typography>
        <Typography style={{color: "white"}} align={"center"}>
          {props.props.player.current_song.artist}
        </Typography>
      </Box>
    </Box>
  );
};
