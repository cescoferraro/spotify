/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: FollowMutation
// ====================================================

export interface FollowMutation {
  followPlaylist: boolean | null;
}

export interface FollowMutationVariables {
  playlistId?: string | null;
  owner?: string | null;
  unfollow?: boolean | null;
}
