import {Box} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import makeStyles from "@material-ui/core/styles/makeStyles";
import React from "react";
import {Auth} from "../../../store/auth_store";
import {Player} from "../../../store/player_store";
import {Song} from "../types";
import {LoveSongsButton} from "./like_button";
import {PlaylistPlayButton} from "./play_button";

export const SongRenderer = (
  {refresh, liked, player, list, loading, auth}:
    { auth: Auth, loading: boolean, refresh: () => void, liked: string[], player: Player, list: Song[] }
) =>
  ({key, index, style}: any) => {
    const listElement = list[index];
    const name = listElement?.track?.SimpleTrack?.name || "name";
    const uri = listElement?.track?.SimpleTrack?.uri || "";
    const url = listElement?.track?.SimpleTrack?.preview_url || "";
    const artist = listElement?.track?.SimpleTrack?.artists?.map((t: any) => t?.name).join(", ") || "name";
    return (
      <ListItem key={key} style={style}>
        <AvatarComponent listElement={listElement}/>
        <SongItemText index={index} name={name} artist={artist}/>
        <Box style={{minWidth: 72}}>
          <PlaylistPlayButton auth={auth} uri={uri} url={url} player={player}/>
          <LoveSongsButton auth={auth} loading={loading} refresh={refresh} ids={liked} listElement={listElement}/>
        </Box>
      </ListItem>
    );
  };

const SongItemText = (props: { index: any, name: string, artist: string }) => {
  const styles = makeStyles({root: {whiteSpace: "nowrap"}})();
  return (
    <ListItemText
      classes={{primary: styles.root}}
      primary={`#${(props.index + 1).toString()} ${props.name}`}
      secondary={props.artist.length > 30 ? props.artist.slice(0, 29) : props.artist}
    />
  )
};

const AvatarComponent = ({listElement}: { listElement: Song }) => {
  const images = listElement?.track?.album?.images || [];
  const image = images[images.length - 1]?.url || "https://material-ui.com/static/images/avatar/2.jpg";
  return <ListItemAvatar><React.Fragment> <Avatar src={image}/> </React.Fragment></ListItemAvatar>
};
