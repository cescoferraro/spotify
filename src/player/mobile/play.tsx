import {useMutation} from "@apollo/react-hooks";
import {IconButton} from "@material-ui/core";
import {gql} from "apollo-boost";
import {Observer} from "mobx-react";
import * as React from "react";
import {Player} from "../../store/player_store";
import {PlayMutation, PlayMutationVariables} from "../../types/PlayMutation";

const mutation = gql`
  mutation PlayMutation($uri:String, $devID:String) {
    play(uri:$uri, devID: $devID)
  }
`;
export const PlayButton = ({player}: { player: Player }) => {
  const [play, {data}] = useMutation<PlayMutation, PlayMutationVariables>(mutation);
  return (
    <Observer>
      {() => {
        const variables = {uri: player.current_song.uri, devID: player.device};
        return (

          <IconButton
            onClick={() => {
              play({variables})
                .catch((e) => {
                  console.log(e)
                })
                .then((e) => {
                  console.log(e, data?.play)
                })
            }}
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M19.9999 0C8.95994 0 -6.10352e-05 8.96 -6.10352e-05 20C-6.10352e-05 31.04 8.95994 40 19.9999 40C31.0399 40 39.9999 31.04 39.9999 20C39.9999 8.96 31.0399 0 19.9999 0ZM15.9999 29V11L27.9999 20L15.9999 29Z"
                fill="white"/>
            </svg>
          </IconButton>
        )
      }}
    </Observer>
  );
};
