import {Box, isWidthDown, WithWidthProps} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import withWidth from "@material-ui/core/withWidth";
import React from "react";
import {spotifyGreen} from "../../../shared/color";
import {flexer} from "../../../shared/layout";
import {SpotifyLogo} from "../../../shared/spotify_logo";
import {Nullable} from "../../../shared/typescript";
import {Auth} from "../../../store/auth_store";
import {FullPlaylistQuery, FullPlaylistQuery_playlistInfo} from "../../../types/FullPlaylistQuery";
import {LoginAvatar} from "../../playlists/left";
import {PlaylistProps} from "../playlist_index";
import {FollowPlaylistButton} from "./follow";
import {MobileInfiniteList} from "./mobile_list";

export const PlaylistPlayButton = () => {
  const classes = makeStyles({
    contained: {"&:hover": {backgroundColor: spotifyGreen}},
    label: {color: "white", fontSize: 24},
    button: {background: spotifyGreen, marginRight: 30, height: 60, width: 203, borderRadius: 30}
  })();
  const classesObj = {root: classes.button, label: classes.label, contained: classes.contained};

  return (
    <Button
      onClick={() => {
      }}
      variant={"contained"}
      classes={classesObj}
    >
      Play
    </Button>
  )
};

const NewComponent = ({info}: { info: FullPlaylistQuery_playlistInfo }) => {
  const images = info.images ? info.images : []
  const image = images[images.length - 1];
  const playlistImageSrc = image?.url || "https://material-ui.com/static/images/avatar/2.jpg";
  return (
    <Box style={{display: "flex", justifyContent: "center", width: "100%"}}>
      <img style={{width: 196, height: 196}} alt="dfglkm" src={playlistImageSrc}/>
    </Box>
  )
};

const HeaderInfo = (props: { owner: string, info: FullPlaylistQuery_playlistInfo }) => {
  return (
    <Box
      style={{height: "calc( 100% - 196px )", ...flexer}}>
      <Box style={{height: "min-content"}}>
        <Tooltip title={props.info.description || "playlist-description"}>
          <Typography align={"center"} variant={"h4"} style={style1}>
            {props.info.name}
          </Typography>
        </Tooltip>
        <Box style={{...flexer, transform: "translate( 30px )"}}>
          <PlaylistPlayButton/>
          <FollowPlaylistButton owner={props.owner} playlistId={props.info.id || ""}/>
        </Box>
      </Box>
    </Box>
  );
};

interface MobileHeaderProps {
  data: Nullable<FullPlaylistQuery>
  owner: string
  auth: Auth
}

export const MobileHeader = withWidth()((props: MobileHeaderProps & WithWidthProps) => {
  const info = props.data?.playlistInfo || {images: [], name: "", id: "", description: "", __typename: "PlaylistInfo"}
  return isWidthDown("sm", props.width || "xs") ? (
    <React.Fragment>
      <Toolbar style={style2}>
        <SpotifyLogo/>
        <LoginAvatar auth={props.auth}/>
      </Toolbar>
      <Box style={style}>
        <NewComponent info={info}/>
        <HeaderInfo info={info} owner={props.owner}/>
      </Box>
    </React.Fragment>
  ) : null
});

const style1 = {color: "white", marginBottom: 24, marginTop: 24};
let style2 = {background: "grey", display: "flex", justifyContent: "space-between"};
const spreadElements = {height: "min-content", backgroundColor: 'gray', color: 'white'};
const style = {...spreadElements, fontSize: 48, padding: 20, paddingTop: 0};

export const MobilePage = (props: PlaylistProps) => {
  return (
    <React.Fragment>
      <MobileHeader data={props.data} auth={props.auth} owner={props.owner}/>
      <MobileInfiniteList {...props} />
    </React.Fragment>
  );
};
