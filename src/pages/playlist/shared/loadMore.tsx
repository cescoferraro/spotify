import {ChildProps} from "react-apollo";
import {FullPlaylistQuery, FullPlaylistQuery_playlistSongsPaginated_songs} from "../../../types/FullPlaylistQuery";

type Created = ChildProps<any, FullPlaylistQuery>;

export const isRowLoaded = ({list}: { list: (FullPlaylistQuery_playlistSongsPaginated_songs | null)[] }) => ({index}: any) => {
  return !!list[index];
};

export const loadMoreRows = ({owner, playID, cursor, pace, fetchMore}: { owner: string, playID: string, pace: number, cursor: number, fetchMore: any }) => () => {
  return fetchMore({
    variables: {cursor, pace, owner, playID},
    updateQuery: (previousResult: Created, {fetchMoreResult}: { fetchMoreResult: Created }) => {
      console.log(fetchMoreResult);

      let songs = previousResult.playlistSongsPaginated.songs
      if (previousResult.playlistSongsPaginated?.songs?.length === cursor) {
        const future = fetchMoreResult.playlistSongsPaginated.songs
        songs = [...songs, ...future];
      }
      return {
        ...previousResult,
        playlistSongsPaginated: {
          cursor: fetchMoreResult.playlistSongsPaginated.cursor,
          name: fetchMoreResult.playlistSongsPaginated.name,
          total: fetchMoreResult.playlistSongsPaginated.total,
          songs: songs,
        }
      };
    },
  })
};
