import {useMutation, useQuery} from "@apollo/react-hooks";
import {Fab} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {gql} from "apollo-boost";
import React, {useEffect, useState} from "react";
import {spotifyGreen} from "../../../shared/color";
import {FollowMutation, FollowMutationVariables} from "../../../types/FollowMutation";
import {FollowQuery, FollowQueryVariables} from "../../../types/FollowQuery";

const backgroundColor = "rgba(255, 255, 255, 0.3)";

const follow_query = gql`
  query FollowQuery($playlistId:String) {
    followPlaylist(playlistId: $playlistId)
  }
`;

export const PlayListButton = ({onClick, color = "white"}: { onClick: () => void, color?: string }) => {
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
export const LoveMainButton = ({onClick, color = "white"}: { onClick: () => void, color?: string }) => {
  const classes = makeStyles({
    circle: {backgroundColor, "&:hover": {backgroundColor}, width: 60, height: 60}
  })();
  return (
    <Fab
      onClick={onClick}
      classes={{root: classes.circle}}
      color="primary"
    >
      <svg width="28" height="25" viewBox="0 0 28 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M19.9376 0.125C17.6418 0.125 15.4383 1.19375 14.0001 2.88264C12.5619 1.19375 10.3584 0.125 8.06261 0.125C3.99872 0.125 0.805664 3.31806 0.805664 7.38194C0.805664 12.3694 5.29177 16.4333 12.0869 22.6083L14.0001 24.3368L15.9133 22.5951C22.7084 16.4333 27.1945 12.3694 27.1945 7.38194C27.1945 3.31806 24.0015 0.125 19.9376 0.125ZM14.1321 20.6424L14.0001 20.7743L13.8682 20.6424C7.58761 14.9556 3.44455 11.1951 3.44455 7.38194C3.44455 4.74305 5.42372 2.76389 8.06261 2.76389C10.0946 2.76389 12.0737 4.07014 12.773 5.87778H15.2404C15.9265 4.07014 17.9057 2.76389 19.9376 2.76389C22.5765 2.76389 24.5557 4.74305 24.5557 7.38194C24.5557 11.1951 20.4126 14.9556 14.1321 20.6424Z"
          fill={color}
        />
      </svg>
    </Fab>
  );
};
export const LoveButton = ({onClick, color = "white"}: { onClick: () => void, color?: string }) => {
  const classes = makeStyles({
      circle: {backgroundColor, "&:hover": {backgroundColor}, width: 32, height: 32},
    }
  )();
  return (
    <Fab
      onClick={onClick}
      classes={{root: classes.circle}}
      color="primary"
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12.1666 2.66664C10.9421 2.66664 9.76696 3.23664 8.99993 4.13738C8.23289 3.23664 7.0577 2.66664 5.83326 2.66664C3.66585 2.66664 1.96289 4.3696 1.96289 6.53701C1.96289 9.19701 4.35548 11.3644 7.97956 14.6578L8.99993 15.5796L10.0203 14.6507C13.6444 11.3644 16.037 9.19701 16.037 6.53701C16.037 4.3696 14.334 2.66664 12.1666 2.66664ZM9.0703 13.6092L8.99993 13.6796L8.92956 13.6092C5.57993 10.5763 3.3703 8.57071 3.3703 6.53701C3.3703 5.1296 4.42585 4.07405 5.83326 4.07405C6.91696 4.07405 7.97252 4.77071 8.34548 5.73479H9.66141C10.0273 4.77071 11.0829 4.07405 12.1666 4.07405C13.574 4.07405 14.6296 5.1296 14.6296 6.53701C14.6296 8.57071 12.4199 10.5763 9.0703 13.6092Z"
          fill={color}/>
      </svg>

    </Fab>
  );
};

const follow_mutation = gql`
  mutation  FollowMutation($playlistId:String, $owner:String, $unfollow: Boolean) {
    followPlaylist(playlistId: $playlistId, owner: $owner, unfollow: $unfollow)
  }
`;

export const FollowButton = ({owner, playlistId}: { owner: string, playlistId: string }) => {
  const {refetch, data} = useQuery<FollowQuery, FollowQueryVariables>(follow_query, {variables: {playlistId}});
  const [followPlaylist] = useMutation<FollowMutation, FollowMutationVariables>(follow_mutation);
  const [follow, setFollow] = useState(false);
  const unfollow = data?.followPlaylist || false;
  useEffect(() => {
    if (follow !== unfollow) setFollow(unfollow);
  }, [follow, unfollow])
  const onClickFN = onClick({refetch, followPlaylist, variables: {owner, playlistId, unfollow}})
  return <LoveMainButton onClick={onClickFN} color={follow ? spotifyGreen : "white"}/>
};

interface FollowOnClick {
  followPlaylist: (e: any) => void
  refetch: (a: FollowQueryVariables) => void
  variables: FollowMutationVariables
}

const onClick = ({variables, refetch, followPlaylist}: FollowOnClick) => {
  return async () => {
    try {
      await followPlaylist({variables})
      await refetch({playlistId: variables.playlistId})
    } finally {
      console.log("done")
    }
  };
}
