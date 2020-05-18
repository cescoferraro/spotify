import {useLazyQuery, useMutation} from "@apollo/react-hooks";
import {Box} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {gql} from "apollo-boost";
import React, {useEffect} from "react";
import {playMutation} from "../../../player/spotify/mobile/play";
import {spotifyGreen} from "../../../shared/color";
import {notEmpty} from "../../../shared/typescript";
import {Player} from "../../../store/player_store";
import {LikeSong, LikeSongVariables} from "../../../types/LikeSong";
import {MyDevicesQuery} from "../../../types/MyDevicesQuery";
import {PlayMutation, PlayMutationVariables} from "../../../types/PlayMutation";
import {LoveButton, PlayListDumbButton} from "../mobile/follow";
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

const query = gql` query MyDevicesQuery { myDevices { name id is_active } } `;

const PlaylistPlayButton = ({uri, player}: { uri: string, player: Player }) => {
  const [fetchDevices, {data, error}] = useLazyQuery<MyDevicesQuery>(query, {fetchPolicy: "no-cache"});
  const [play] = useMutation<PlayMutation, PlayMutationVariables>(playMutation);
  useEffect(() => {
    if (error) {
      alert(error)
      return
    }
    if (data) {
      const devices = data?.myDevices?.filter(notEmpty) || []
      if (devices.length === 0) {
        alert(22)
        return
      }
      const device = devices[0] ? devices[0].id || "" : ""
      if (device !== "") {
        play({variables: {uri, devID: device}})
          .catch((e) => {
            console.error(e)
          })
          .then((da) => {
            if (da) {
              const {data} = da
              let message = data?.play || false;
              console.log(message)
              player.setOpened(message)
            }
          })
      }
    }
  }, [data, play, player, uri, error])
  return (
    <PlayListDumbButton
      onClick={() => fetchDevices()}
    />
  );
};

const AvatarComponent = ({listElement}: { listElement: Song }) => {
  const images = listElement?.track?.album?.images || [];
  const image = images[images.length - 1]?.url || "https://material-ui.com/static/images/avatar/2.jpg";
  return <ListItemAvatar><React.Fragment> <Avatar src={image}/> </React.Fragment></ListItemAvatar>
};

export const SongRenderer = ({refresh, liked, player, list}: { refresh: () => void, liked: string[], player: Player, list: Song[] }) =>
  ({key, index, style}: any) => {
    const listElement = list[index];
    const name = listElement?.track?.SimpleTrack?.name || "name";
    const uri = listElement?.track?.SimpleTrack?.uri || "";
    const artist = listElement?.track?.SimpleTrack?.artists?.map((t: any) => t?.name).join(", ") || "name";
    return (
      <ListItem key={key} style={style}>
        <AvatarComponent listElement={listElement}/>
        <SongItemText index={index} name={name} artist={artist}/>
        <Box style={{minWidth: 72}}>
          <PlaylistPlayButton uri={uri} player={player}/>
          <LoveSongsButton refresh={refresh} ids={liked} listElement={listElement}/>
        </Box>
      </ListItem>
    );
  };
