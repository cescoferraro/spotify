import {useMutation, useQuery} from "@apollo/react-hooks";
import {Fab} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Skeleton} from "@material-ui/lab";
import {gql} from "apollo-boost";
import React, {useEffect, useState} from "react";
import {spotifyGreen} from "../../../shared/color";
import {FollowMutation, FollowMutationVariables} from "../../../types/FollowMutation";
import {FollowQuery, FollowQueryVariables} from "../../../types/FollowQuery";

const backgroundColor = "#313131"

const follow_query = gql` query FollowQuery($playlistId:String) { followPlaylist(playlistId: $playlistId) } `;

const follow_mutation = gql`
  mutation  FollowMutation($playlistId:String, $owner:String, $unfollow: Boolean) {
    followPlaylist(playlistId: $playlistId, owner: $owner, unfollow: $unfollow)
  }
`;

export const FollowPlaylistButton = ({owner, playlistId}: { owner: string, playlistId: string }) => {
  const options = {skip: playlistId === "", variables: {playlistId}};
  const {refetch, data, loading} = useQuery<FollowQuery, FollowQueryVariables>(follow_query, options);
  const [followPlaylist, mutation] = useMutation<FollowMutation, FollowMutationVariables>(follow_mutation);
  const [follow, setFollow] = useState(false);
  const unfollow = data?.followPlaylist || false;
  const loadingBundle = loading || mutation.loading;
  useEffect(() => {
    if (follow !== unfollow) setFollow(unfollow);
  }, [follow, unfollow])
  const onClickFN = onClick({
    refetch,
    followPlaylist,
    variables: {owner, playlistId, unfollow}
  })
  return <FollowPlaylistButtonComponent loading={loadingBundle} onClick={onClickFN}
                                        color={follow ? spotifyGreen : "white"}/>
};

export const FollowPlaylistButtonComponent = ({loading, onClick, color = "white"}: { loading: boolean, onClick: () => void, color?: string }) => {
  const classes = makeStyles({circle: {backgroundColor, "&:hover": {backgroundColor}, width: 60, height: 60}})();
  const style = makeStyles({circle: {backgroundColor: spotifyGreen}})();
  return (
    <Fab
      onClick={onClick}
      classes={{root: classes.circle}}
      color="primary"
    >

      {loading ?
        <Skeleton variant="circle" width={28} height={28} classes={{root: style.circle}}/>
        :
        <svg width="28" height="25" viewBox="0 0 28 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M19.9376 0.125C17.6418 0.125 15.4383 1.19375 14.0001 2.88264C12.5619 1.19375 10.3584 0.125 8.06261 0.125C3.99872 0.125 0.805664 3.31806 0.805664 7.38194C0.805664 12.3694 5.29177 16.4333 12.0869 22.6083L14.0001 24.3368L15.9133 22.5951C22.7084 16.4333 27.1945 12.3694 27.1945 7.38194C27.1945 3.31806 24.0015 0.125 19.9376 0.125ZM14.1321 20.6424L14.0001 20.7743L13.8682 20.6424C7.58761 14.9556 3.44455 11.1951 3.44455 7.38194C3.44455 4.74305 5.42372 2.76389 8.06261 2.76389C10.0946 2.76389 12.0737 4.07014 12.773 5.87778H15.2404C15.9265 4.07014 17.9057 2.76389 19.9376 2.76389C22.5765 2.76389 24.5557 4.74305 24.5557 7.38194C24.5557 11.1951 20.4126 14.9556 14.1321 20.6424Z"
            fill={color}
          />
        </svg>
      }
    </Fab>
  );
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
