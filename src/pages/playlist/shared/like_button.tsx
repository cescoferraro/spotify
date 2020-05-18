import {useMutation} from "@apollo/react-hooks";
import {Fab} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Skeleton} from "@material-ui/lab";
import {gql} from "apollo-boost";
import React from "react";
import {spotifyGreen} from "../../../shared/color";
import {Auth} from "../../../store/auth_store";
import {LikeSong, LikeSongVariables} from "../../../types/LikeSong";
import {Song} from "../types";

const follow_mutation = gql`
  mutation  LikeSong($id:String, $unfollow: Boolean) {
    likeSong(id: $id,  unfollow: $unfollow)
  }
`;

export const LoveSongsButton = (props: { auth: Auth, loading: boolean, refresh: () => void, ids: string[], listElement: Song }) => {
  const [followPlaylist, {data, loading}] = useMutation<LikeSong, LikeSongVariables>(follow_mutation);
  const id = props.listElement?.track?.SimpleTrack?.id || "";
  const unfollow = props.ids.includes(id);
  const disabled = props.auth.code === "initial";
  return (
    <LoveButton
      color={unfollow ? spotifyGreen : "white"}
      disabled={disabled}
      loading={loading || props.loading}
      onClick={async () => {
        await followPlaylist({variables: {id, unfollow}})
        props.refresh()
        console.log("love")
        console.log(data?.likeSong)
      }}
    />
  );
};

const backgroundColor = "#313131"
export const LoveButton = ({disabled, loading, onClick, color = "white"}: { disabled: boolean, loading: boolean, onClick: () => void, color?: string }) => {
  const classes = makeStyles({
      circle: {backgroundColor, "&:hover": {backgroundColor}, width: 32, height: 32},
    }
  )();
  const style = makeStyles({circle: {backgroundColor: spotifyGreen}})();
  return (
    <Fab
      onClick={onClick}
      disabled={disabled}
      classes={{root: classes.circle}}
      color="primary"
    >
      {loading ?
        <Skeleton variant="circle" width={13} height={13} classes={{root: style.circle}}/>
        :
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12.1666 2.66664C10.9421 2.66664 9.76696 3.23664 8.99993 4.13738C8.23289 3.23664 7.0577 2.66664 5.83326 2.66664C3.66585 2.66664 1.96289 4.3696 1.96289 6.53701C1.96289 9.19701 4.35548 11.3644 7.97956 14.6578L8.99993 15.5796L10.0203 14.6507C13.6444 11.3644 16.037 9.19701 16.037 6.53701C16.037 4.3696 14.334 2.66664 12.1666 2.66664ZM9.0703 13.6092L8.99993 13.6796L8.92956 13.6092C5.57993 10.5763 3.3703 8.57071 3.3703 6.53701C3.3703 5.1296 4.42585 4.07405 5.83326 4.07405C6.91696 4.07405 7.97252 4.77071 8.34548 5.73479H9.66141C10.0273 4.77071 11.0829 4.07405 12.1666 4.07405C13.574 4.07405 14.6296 5.1296 14.6296 6.53701C14.6296 8.57071 12.4199 10.5763 9.0703 13.6092Z"
            fill={color}/>
        </svg>
      }
    </Fab>
  );
};


