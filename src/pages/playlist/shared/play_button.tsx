import {useLazyQuery, useMutation} from "@apollo/react-hooks";
import {Fab} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import React, {useEffect} from "react";
import {my_devices_query} from "../../../player/spotify/components/device_provider";
import {playMutation} from "../../../player/spotify/mobile/play";
import {notEmpty} from "../../../shared/typescript";
import {Player} from "../../../store/player_store";
import {MyDevicesQuery} from "../../../types/MyDevicesQuery";
import {PlayMutation, PlayMutationVariables} from "../../../types/PlayMutation";

export const PlaylistPlayButton = ({url, uri, player}: { url: string, uri: string, player: Player }) => {
  const [fetchDevices, {data, error}] = useLazyQuery<MyDevicesQuery>(my_devices_query, {fetchPolicy: "no-cache"});
  const [play] = useMutation<PlayMutation, PlayMutationVariables>(playMutation);
  useEffect(() => {
    if (error) {
      alert(error)
      return
    }
    if (data) {
      const devices = data?.myDevices?.filter(notEmpty) || []
      if (devices.length === 0) {
        if (url !== "") {
          player.setSongs([{url}])
          player.playHtml()
          player.setOpened(true)
        } else {
          alert("no url")
        }
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
  }, [data, play, player, uri, error, url])
  return (
    <PlayListDumbButton
      onClick={() => fetchDevices()}
    />
  );
};

const backgroundColor = "rgba(255, 255, 255, 0.3)";

export const PlayListDumbButton = ({onClick, color = "white"}: { onClick: () => void, color?: string }) => {
  const classes = makeStyles({
    first: {marginRight: 8, border: "2px solid"},
    circle: {backgroundColor, "&:hover": {backgroundColor}, width: 32, height: 32},
  })();
  return (
    <Fab
      onClick={onClick}
      classes={{root: classes.circle + " " + classes.first}}
      color="primary"
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.18567 4.07405V13.9259L13.9264 8.99998L6.18567 4.07405Z" fill="white"/>
      </svg>
    </Fab>
  );
};
