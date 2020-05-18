/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FullPlaylistQuery
// ====================================================

export interface FullPlaylistQuery_playlistInfo_images {
  __typename: "Image";
  url: string | null;
}

export interface FullPlaylistQuery_playlistInfo {
  __typename: "PlaylistInfo";
  id: string | null;
  name: string | null;
  description: string | null;
  images: (FullPlaylistQuery_playlistInfo_images | null)[] | null;
}

export interface FullPlaylistQuery_playlistSongsPaginated_songs_track_album_images {
  __typename: "Image";
  url: string | null;
}

export interface FullPlaylistQuery_playlistSongsPaginated_songs_track_album {
  __typename: "SimpleAlbum";
  name: string | null;
  images: (FullPlaylistQuery_playlistSongsPaginated_songs_track_album_images | null)[] | null;
}

export interface FullPlaylistQuery_playlistSongsPaginated_songs_track_SimpleTrack_artists {
  __typename: "SimpleArtist";
  name: string | null;
}

export interface FullPlaylistQuery_playlistSongsPaginated_songs_track_SimpleTrack {
  __typename: "SimpleTrack";
  id: string | null;
  preview_url: string | null;
  name: string | null;
  uri: string | null;
  artists: (FullPlaylistQuery_playlistSongsPaginated_songs_track_SimpleTrack_artists | null)[] | null;
}

export interface FullPlaylistQuery_playlistSongsPaginated_songs_track {
  __typename: "FullTrack";
  popularity: number | null;
  album: FullPlaylistQuery_playlistSongsPaginated_songs_track_album | null;
  SimpleTrack: FullPlaylistQuery_playlistSongsPaginated_songs_track_SimpleTrack | null;
}

export interface FullPlaylistQuery_playlistSongsPaginated_songs {
  __typename: "SavedTrack";
  track: FullPlaylistQuery_playlistSongsPaginated_songs_track | null;
}

export interface FullPlaylistQuery_playlistSongsPaginated {
  __typename: "PlaylistSongsPaginated";
  total: number | null;
  cursor: number | null;
  songs: (FullPlaylistQuery_playlistSongsPaginated_songs | null)[] | null;
}

export interface FullPlaylistQuery {
  playlistInfo: FullPlaylistQuery_playlistInfo | null;
  playlistSongsPaginated: FullPlaylistQuery_playlistSongsPaginated | null;
}

export interface FullPlaylistQueryVariables {
  playID?: string | null;
  owner?: string | null;
  cursor?: number | null;
  pace?: number | null;
}
