/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PlayerComponentQuery
// ====================================================

export interface PlayerComponentQuery_mySongs_images {
  __typename: "images";
  url: string | null;
  height: number | null;
  width: number | null;
}

export interface PlayerComponentQuery_mySongs {
  __typename: "SavedTrack";
  name: string | null;
  uri: string | null;
  images: (PlayerComponentQuery_mySongs_images | null)[] | null;
}

export interface PlayerComponentQuery_nowPlaying_Device {
  __typename: "Device";
  Name: string | null;
}

export interface PlayerComponentQuery_nowPlaying {
  __typename: "PlayerState";
  Device: PlayerComponentQuery_nowPlaying_Device | null;
}

export interface PlayerComponentQuery {
  mySongs: (PlayerComponentQuery_mySongs | null)[] | null;
  nowPlaying: PlayerComponentQuery_nowPlaying | null;
}
