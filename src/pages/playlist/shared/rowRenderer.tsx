import {Box} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import {Player} from "../../../store/player_store";
import {FullPlaylistQuery_playlistSongsPaginated_songs} from "../../../types/FullPlaylistQuery";
import {LoveButton, PlayListButton} from "../mobile/follow";

export const rowRenderer = ({player, list}: { player: Player, list: (FullPlaylistQuery_playlistSongsPaginated_songs | null)[] }) =>
  ({key, index, style}: any) => {
    let listElement = list[index];
    let images = listElement?.track?.album?.images || [];
    let image = images[images.length - 1]?.url || "https://material-ui.com/static/images/avatar/2.jpg";
    const name = listElement?.track?.SimpleTrack?.name || "name";
    // const uri = listElement?.track?.SimpleTrack?.uri || "uri";
    // let artist = listElement?.track?.SimpleTrack?.artists?.map((t) => t?.name).join(", ") || "name";
    // // onClick={() => player.setCurrentSong({name, image, artist, uri})}
    return (
      <ListItem key={key} style={style}>
        <ListItemAvatar>
          <Avatar src={image}/>
        </ListItemAvatar>
        <ListItemText primary={`#${(index + 1).toString()} ${name}`}/>
        <Box style={{minWidth: 72}}>
          <PlayListButton
            onClick={() => {
              console.log("love")
            }}
          />
          <LoveButton
            onClick={() => {
              console.log("love")
            }}
          />
        </Box>
      </ListItem>
    );
  };
