/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PlayermainComponentQuery
// ====================================================

export interface PlayermainComponentQuery_mySongs_track_album_images {
  __typename: "Image";
  url: string | null;
}

export interface PlayermainComponentQuery_mySongs_track_album {
  __typename: "SimpleAlbum";
  images: (PlayermainComponentQuery_mySongs_track_album_images | null)[] | null;
}

export interface PlayermainComponentQuery_mySongs_track_SimpleTrack_artists {
  __typename: "SimpleArtist";
  name: string | null;
  href: string | null;
}

export interface PlayermainComponentQuery_mySongs_track_SimpleTrack {
  __typename: "SimpleTrack";
  name: string | null;
  uri: string | null;
  href: string | null;
  preview_url: string | null;
  artists: (PlayermainComponentQuery_mySongs_track_SimpleTrack_artists | null)[] | null;
}

export interface PlayermainComponentQuery_mySongs_track {
  __typename: "FullTrack";
  popularity: number | null;
  album: PlayermainComponentQuery_mySongs_track_album | null;
  SimpleTrack: PlayermainComponentQuery_mySongs_track_SimpleTrack | null;
}

export interface PlayermainComponentQuery_mySongs {
  __typename: "SavedTrack";
  track: PlayermainComponentQuery_mySongs_track | null;
}

export interface PlayermainComponentQuery_nowPlaying_CurrentlyPlaying_context {
  __typename: "PlaybackContext";
  href: string | null;
  type: string | null;
}

export interface PlayermainComponentQuery_nowPlaying_CurrentlyPlaying {
  __typename: "CurrentlyPlaying";
  is_playing: boolean | null;
  timestamp: number | null;
  context: PlayermainComponentQuery_nowPlaying_CurrentlyPlaying_context | null;
  progress_ms: number | null;
}

export interface PlayermainComponentQuery_nowPlaying_device {
  __typename: "PlayerDevice";
  id: string | null;
  is_active: boolean | null;
  is_restricted: boolean | null;
  name: string | null;
  type: string | null;
  volume_percent: number | null;
}

export interface PlayermainComponentQuery_nowPlaying {
  __typename: "PlayerState";
  repeat_state: string | null;
  shuffle_state: boolean | null;
  CurrentlyPlaying: PlayermainComponentQuery_nowPlaying_CurrentlyPlaying | null;
  device: PlayermainComponentQuery_nowPlaying_device | null;
}

export interface PlayermainComponentQuery {
  mySongsTotal: number | null;
  mySongs: (PlayermainComponentQuery_mySongs | null)[] | null;
  nowPlaying: PlayermainComponentQuery_nowPlaying | null;
}
