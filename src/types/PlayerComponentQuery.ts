/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PlayerComponentQuery
// ====================================================

export interface PlayerComponentQuery_nowPlaying_CurrentlyPlaying_context {
  __typename: "PlaybackContext";
  href: string | null;
  type: string | null;
}

export interface PlayerComponentQuery_nowPlaying_CurrentlyPlaying {
  __typename: "CurrentlyPlaying";
  is_playing: boolean | null;
  timestamp: number | null;
  context: PlayerComponentQuery_nowPlaying_CurrentlyPlaying_context | null;
  progress_ms: number | null;
}

export interface PlayerComponentQuery_nowPlaying_device {
  __typename: "PlayerDevice";
  id: string | null;
  is_active: boolean | null;
  is_restricted: boolean | null;
  name: string | null;
  type: string | null;
  volume_percent: number | null;
}

export interface PlayerComponentQuery_nowPlaying {
  __typename: "PlayerState";
  repeat_state: string | null;
  shuffle_state: boolean | null;
  CurrentlyPlaying: PlayerComponentQuery_nowPlaying_CurrentlyPlaying | null;
  device: PlayerComponentQuery_nowPlaying_device | null;
}

export interface PlayerComponentQuery {
  nowPlaying: PlayerComponentQuery_nowPlaying | null;
}
