import {ReactElement} from "react";
import {QueryResult} from "react-apollo";
import {RouteComponentProps} from "react-router";
import {Auth} from "../../store/auth_store";
import {Player} from "../../store/player_store";
import {
  FullPlaylistQuery,
  FullPlaylistQuery_playlistSongsPaginated_songs,
  FullPlaylistQueryVariables
} from "../../types/FullPlaylistQuery";

export type PlaylistPageUrlProps = { catID: string, owner: string, playID: string };

export type PlaylistPageBaseProps = { player: Player, auth: Auth };

export type PlaylistPageProps = RouteComponentProps<PlaylistPageUrlProps> & PlaylistPageBaseProps;

export interface SongsProviderInputProps extends PlaylistPageBaseProps {
  url: PlaylistPageUrlProps
  pace: number
  children: (re: SongsProviderChildrenProps) => ReactElement
}

export type Song = FullPlaylistQuery_playlistSongsPaginated_songs;

export interface SongsProviderChildrenProps extends PlaylistPageBaseProps, QueryResult<FullPlaylistQuery>, PlaylistPageUrlProps {
  pace: number
  songs: Song[]
}

interface LikedProviderChildrenProps {
  loadingLiked: boolean
  refreshLiked: () => void
  liked: string[]
}

export type PlaylistProps =
  LikedProviderChildrenProps
  & PlaylistPageBaseProps
  & SongsProviderChildrenProps
  & FullPlaylistQueryVariables ;
