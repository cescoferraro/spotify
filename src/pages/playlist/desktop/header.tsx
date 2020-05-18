import {Box, Typography} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import React from "react";
import {flexer} from "../../../shared/layout";
import {SpotifyLogo} from "../../../shared/spotify_logo";
import {LoginAvatar} from "../../playlists/left";
import {FollowPlaylistButton} from "../mobile/follow";
import {PlaylistPlayButton} from "../mobile/header";

export const DesktopHead = (props: { props: any}) => {
  const playlistId = props.props.data?.playlistInfo?.id || "";
  return <div
    style={{height: "35vh", display: "flex"}}>
    <Box style={{width: "35%", height: "100%"}}>
      <Toolbar style={{width: "min-content", height: "min-content"}}>
        <SpotifyLogo onClick={() => props.props.history.goBack()}/>
      </Toolbar>
    </Box>
    <Box style={style}>
      <Toolbar style={{display: "flex", justifyContent: "flex-end"}}>
        <Box><LoginAvatar auth={props.props.auth}/></Box>
      </Toolbar>
      <Box style={{marginBottom: 24}}>
        <Box style={{marginBottom: 16}}>
          <Typography variant={"h4"} style={{color: "white", paddingBottom: 16}}>
            {props.props.data?.playlistInfo?.name || "LOADING..."}
          </Typography>
          <Typography variant={"caption"} style={{color: "white", margin: 0}}>
            {props.props.data?.playlistInfo?.description || "LOADING..."}
          </Typography>
        </Box>
        <Box style={{...flexer, justifyContent: "flex-start"}}>
          <PlaylistPlayButton/>
          <FollowPlaylistButton owner={props.props.owner} playlistId={playlistId}/>
        </Box>
      </Box>
    </Box>
  </div>;
};

const style: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  marginBottom: 24,
  height: "100%",
  width: "65%"
};
