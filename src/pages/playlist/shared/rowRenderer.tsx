import {useMutation} from "@apollo/react-hooks";
import {Box} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {gql} from "apollo-boost";
import React from "react";
import {spotifyGreen} from "../../../shared/color";
import {Player} from "../../../store/player_store";
import {LikeSong, LikeSongVariables} from "../../../types/LikeSong";
import {LoveButton, PlayListButton} from "../mobile/follow";
import {Song} from "../playlist_index";

const follow_mutation = gql`
  mutation  LikeSong($id:String, $unfollow: Boolean) {
    likeSong(id: $id,  unfollow: $unfollow)
  }
`;

const LoveSongsButton = (props: { refresh: () => void, ids: string[], listElement: Song }) => {
  const [followPlaylist, {data}] = useMutation<LikeSong, LikeSongVariables>(follow_mutation);
  let id = props.listElement?.track?.SimpleTrack?.id || "";
  let unfollow = props.ids.includes(id);
  return (
    <LoveButton
      color={unfollow ? spotifyGreen : "white"}
      onClick={async () => {
        await followPlaylist({variables: {id, unfollow}})
        props.refresh()
        console.log("love")
        console.log(data?.likeSong)
      }}
    />
  );
};

const NewComponent = (props: { index: any, name: string, artist: string }) => {
  const styles = makeStyles({root: {whiteSpace: "nowrap"}})();
  return (
    <ListItemText
      classes={{primary: styles.root}}
      primary={`#${(props.index + 1).toString()} ${props.name}`}
      secondary={props.artist.length > 30 ? props.artist.slice(0, 29) : props.artist}
    />
  )
};

export const rowRenderer = ({refresh, liked, player, list}: { refresh: () => void, liked: string[], player: Player, list: Song[] }) =>
  ({key, index, style}: any) => {
    const listElement = list[index];
    const images = listElement?.track?.album?.images || [];
    const name = listElement?.track?.SimpleTrack?.name || "name";
    const image = images[images.length - 1]?.url || "https://material-ui.com/static/images/avatar/2.jpg";
    const artist = listElement?.track?.SimpleTrack?.artists?.map((t:any) => t?.name).join(", ") || "name";
    return (
      <ListItem key={key} style={style}>
        <ListItemAvatar>
          <Avatar src={image}/>
        </ListItemAvatar>
        <NewComponent index={index} name={name} artist={artist}/>
        <Box style={{minWidth: 72}}>
          <PlayListButton
            onClick={() => {
              // player.setCurrentSong({name, image, artist, uri})
              console.log("love")
            }}
          />
          <LoveSongsButton
            refresh={refresh}
            ids={liked}
            listElement={listElement}
          />
        </Box>
      </ListItem>
    );
  };
