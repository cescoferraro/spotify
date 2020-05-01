/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PlaylistQuery
// ====================================================

export interface PlaylistQuery_playlistsPaginated_playlists_owner {
  __typename: "User";
  id: string | null;
}

export interface PlaylistQuery_playlistsPaginated_playlists_images {
  __typename: "Image";
  url: string | null;
}

export interface PlaylistQuery_playlistsPaginated_playlists {
  __typename: "SimplePlaylist";
  id: string | null;
  owner: PlaylistQuery_playlistsPaginated_playlists_owner | null;
  name: string | null;
  images: (PlaylistQuery_playlistsPaginated_playlists_images | null)[] | null;
}

export interface PlaylistQuery_playlistsPaginated {
  __typename: "PlaylistsPaginated";
  total: number | null;
  cursor: number | null;
  playlists: (PlaylistQuery_playlistsPaginated_playlists | null)[] | null;
}

export interface PlaylistQuery {
  playlistsPaginated: PlaylistQuery_playlistsPaginated | null;
}

export interface PlaylistQueryVariables {
  catID?: string | null;
  cursor?: number | null;
  pace?: number | null;
}
