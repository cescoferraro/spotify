import {Skeleton} from "@material-ui/lab";
import * as React from "react";
import {PlaylistQuery_playlistsPaginated_playlists} from "../../types/PlaylistQuery";

const blankPlaylist: PlaylistQuery_playlistsPaginated_playlists = {
  name: "cesco",
  images: [{
    url: "https://i.scdn.co/image/ab67706f000000029ed927af72b644ee065cc980",
    __typename: "Image"
  }],
  id: "sdf",
  owner: {
    id: "dskj",
    __typename: "User"
  },
  __typename: "SimplePlaylist"
};
export const fakePlaylistList = [blankPlaylist, blankPlaylist, blankPlaylist, blankPlaylist, blankPlaylist, blankPlaylist, blankPlaylist, blankPlaylist, blankPlaylist, blankPlaylist, blankPlaylist];
export const FakeGridSkeleton = () => {
  return (
    <React.Fragment>
      <Skeleton variant="circle" width={40} height={40}/>
      <Skeleton variant={"text"} animation={"wave"}/>
      <Skeleton variant={"text"} animation={"wave"}/>
      <Skeleton variant={"text"} animation={"wave"}/>
      <Skeleton variant={"text"} animation={"wave"}/>
      <Skeleton variant={"text"} animation={"wave"}/>
      <Skeleton variant={"text"} animation={"wave"}/>
      <Skeleton variant={"text"} animation={"wave"}/>
      <Skeleton variant={"text"} animation={"wave"}/>
      <Skeleton variant={"text"} animation={"wave"}/>
      <Skeleton variant={"text"} animation={"wave"}/>
      <Skeleton variant={"text"} animation={"wave"}/>
    </React.Fragment>
  );
};
