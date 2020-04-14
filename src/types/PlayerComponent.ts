/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PlayerComponent
// ====================================================

export interface PlayerComponent_nowPlaying_Device {
  __typename: "Device";
  Name: string | null;
}

export interface PlayerComponent_nowPlaying {
  __typename: "PlayerState";
  Device: PlayerComponent_nowPlaying_Device | null;
}

export interface PlayerComponent {
  nowPlaying: PlayerComponent_nowPlaying | null;
}
