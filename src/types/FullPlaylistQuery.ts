/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FullPlaylistQuery
// ====================================================

export interface FullPlaylistQuery_playlistSongsPaginated_songs_track_album_images {
  __typename: "Image";
  url: string | null;
}

export interface FullPlaylistQuery_playlistSongsPaginated_songs_track_album {
  __typename: "SimpleAlbum";
  name: string | null;
  images: (FullPlaylistQuery_playlistSongsPaginated_songs_track_album_images | null)[] | null;
}

export interface FullPlaylistQuery_playlistSongsPaginated_songs_track_SimpleTrack {
  __typename: "SimpleTrack";
  name: string | null;
}

export interface FullPlaylistQuery_playlistSongsPaginated_songs_track {
  __typename: "FullTrack";
  album: FullPlaylistQuery_playlistSongsPaginated_songs_track_album | null;
  SimpleTrack: FullPlaylistQuery_playlistSongsPaginated_songs_track_SimpleTrack | null;
}

export interface FullPlaylistQuery_playlistSongsPaginated_songs {
  __typename: "SavedTrack";
  track: FullPlaylistQuery_playlistSongsPaginated_songs_track | null;
}

export interface FullPlaylistQuery_playlistSongsPaginated {
  __typename: "MySongsPaginated";
  total: number | null;
  cursor: number | null;
  songs: (FullPlaylistQuery_playlistSongsPaginated_songs | null)[] | null;
}

export interface FullPlaylistQuery {
  playlistSongsPaginated: FullPlaylistQuery_playlistSongsPaginated | null;
}

export interface FullPlaylistQueryVariables {
  playID?: string | null;
  owner?: string | null;
  cursor?: number | null;
  pace?: number | null;
}