import {useMutation, useQuery} from "@apollo/react-hooks";
import {Fab} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {gql} from "apollo-boost";
import React, {useEffect, useState} from "react";
import {FollowMutation, FollowMutationVariables} from "../../../types/FollowMutation";
import {FollowQuery, FollowQueryVariables} from "../../../types/FollowQuery";

const backgroundColor = "rgba(255, 255, 255, 0.3)";

const useMobileStyles = makeStyles({
    circle: {
      backgroundColor: backgroundColor,
      "&:hover": {
        backgroundColor: backgroundColor
      },
      width: 48, height: 48
    },
  }
);

const follow_query = gql`
  query FollowQuery($playlistId:String) {
    followPlaylist(playlistId: $playlistId)
  }
`;

const LoveButton = ({color}: { color: string }) => {
  return (
    <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15.75 0.500004C13.9133 0.500004 12.1506 1.355 11 2.70611C9.84946 1.355 8.08668 0.500004 6.25001 0.500004C2.9989 0.500004 0.444458 3.05445 0.444458 6.30556C0.444458 10.2956 4.03335 13.5467 9.46946 18.4867L11 19.8694L12.5306 18.4761C17.9667 13.5467 21.5556 10.2956 21.5556 6.30556C21.5556 3.05445 19.0011 0.500004 15.75 0.500004ZM11.1056 16.9139L11 17.0194L10.8945 16.9139C5.87001 12.3644 2.55557 9.35611 2.55557 6.30556C2.55557 4.19445 4.1389 2.61111 6.25001 2.61111C7.87557 2.61111 9.4589 3.65611 10.0183 5.10223H11.9922C12.5411 3.65611 14.1245 2.61111 15.75 2.61111C17.8611 2.61111 19.4445 4.19445 19.4445 6.30556C19.4445 9.35611 16.13 12.3644 11.1056 16.9139Z"
        fill={color}
      />
    </svg>
  );
};

const follow_mutation = gql`
  mutation  FollowMutation($playlistId:String, $owner:String, $unfollow: Boolean) {
    followPlaylist(playlistId: $playlistId, owner: $owner, unfollow: $unfollow)
  }
`;


export const FollowButton = ({owner, playlistId}: { owner: string, playlistId: string }) => {
  const classes = useMobileStyles();
  const {refetch, data} = useQuery<FollowQuery, FollowQueryVariables>(follow_query, {variables: {playlistId}});
  const [followPlaylist] = useMutation<FollowMutation, FollowMutationVariables>(follow_mutation);
  const [follow, setFollow] = useState(false);
  const unfollow = data?.followPlaylist || false;
  useEffect(() => {
    if (follow !== unfollow) setFollow(unfollow);
  }, [follow, unfollow])
  return (
    <Fab
      onClick={onClick({refetch, followPlaylist, variables: {owner, playlistId, unfollow}})}
      classes={{root: classes.circle}}
      color="primary"
    >
      {follow ? <LoveButton color={"red"}/> : <LoveButton color={"white"}/>}
    </Fab>
  )
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
