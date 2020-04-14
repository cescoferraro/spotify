/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PlayerComponentQuery
// ====================================================

export interface PlayerComponentQuery_nowPlaying_Device {
  __typename: "Device";
  Name: string | null;
}

export interface PlayerComponentQuery_nowPlaying {
  __typename: "PlayerState";
  Device: PlayerComponentQuery_nowPlaying_Device | null;
}

export interface PlayerComponentQuery {
  nowPlaying: PlayerComponentQuery_nowPlaying | null;
}
