import {FullPlaylistQuery_playlistSongsPaginated_songs} from "../../../types/FullPlaylistQuery";

export const isRowLoaded = ({list}: { list: (FullPlaylistQuery_playlistSongsPaginated_songs | null)[] }) => ({index}: any) => {
  return !!list[index];
};
