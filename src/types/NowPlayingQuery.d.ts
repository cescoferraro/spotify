/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: NowPlayingQuery
// ====================================================

export interface NowPlayingQuery_nowPlaying_CurrentlyPlaying_Item_SimpleTrack_artists {
  __typename: "SimpleArtist";
  name: string | null;
}

export interface NowPlayingQuery_nowPlaying_CurrentlyPlaying_Item_SimpleTrack {
  __typename: "SimpleTrack";
  name: string | null;
  artists: (NowPlayingQuery_nowPlaying_CurrentlyPlaying_Item_SimpleTrack_artists | null)[] | null;
}

export interface NowPlayingQuery_nowPlaying_CurrentlyPlaying_Item_album {
  __typename: "SimpleAlbum";
  name: string | null;
}

export interface NowPlayingQuery_nowPlaying_CurrentlyPlaying_Item {
  __typename: "FullTrack";
  SimpleTrack: NowPlayingQuery_nowPlaying_CurrentlyPlaying_Item_SimpleTrack | null;
  album: NowPlayingQuery_nowPlaying_CurrentlyPlaying_Item_album | null;
}

export interface NowPlayingQuery_nowPlaying_CurrentlyPlaying {
  __typename: "CurrentlyPlaying";
  is_playing: boolean | null;
  progress_ms: number | null;
  Item: NowPlayingQuery_nowPlaying_CurrentlyPlaying_Item | null;
}

export interface NowPlayingQuery_nowPlaying_device {
  __typename: "PlayerDevice";
  is_active: boolean | null;
  name: string | null;
  volume_percent: number | null;
  is_restricted: boolean | null;
}

export interface NowPlayingQuery_nowPlaying {
  __typename: "PlayerState";
  CurrentlyPlaying: NowPlayingQuery_nowPlaying_CurrentlyPlaying | null;
  device: NowPlayingQuery_nowPlaying_device | null;
}

export interface NowPlayingQuery {
  nowPlaying: NowPlayingQuery_nowPlaying | null;
}
