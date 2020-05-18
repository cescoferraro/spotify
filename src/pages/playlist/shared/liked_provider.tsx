import {useLazyQuery} from "@apollo/react-hooks";
import {gql} from "apollo-boost";
import React, {useEffect, useState} from "react";
import {notEmpty} from "../../../shared/typescript";
import {LikedSongsQuery, LikedSongsQueryVariables} from "../../../types/LikedSongsQuery";
import {Song} from "../types";

const query = gql`
  query LikedSongsQuery($ids:[String]){
    likedSongs(ids:$ids)
  }
`;

const extracted = (other: any, songIDs: string[]) => () => {
  other.refetch({ids: songIDs});
};

type ChildrenFn = (st: { loading: boolean; refreshLiked: () => void; liked: string[] }) => React.ReactElement;
export const LikedProvider = ({children, songs}: { songs: Song[], children: ChildrenFn }) => {
  const [liked, setLiked] = useState<string[]>([]);
  const [fetchIDS, other] = useLazyQuery<LikedSongsQuery, LikedSongsQueryVariables>(query);
  const songIDs = songs.map((r) => r.track?.SimpleTrack?.id).filter(notEmpty);
  useEffect(() => {
    callback({songs, data: other.data, setLiked, fetchIDS})();
  }, [songs, other.data, setLiked, fetchIDS])
  const refreshLiked = extracted(other, songIDs);
  return children({loading: other.loading, liked, refreshLiked})
}

const callback = ({songs, fetchIDS, setLiked, data}: any) => async () => {
  const songIDs = songs.map((r: Song) => r.track?.SimpleTrack?.id).filter(notEmpty);
  if (songIDs.length !== 0) {
    await fetchIDS({variables: {ids: songIDs}})
    const local_liked = data?.likedSongs;
    if (local_liked) {
      setLiked(local_liked.filter(notEmpty))
    }
  }
}
