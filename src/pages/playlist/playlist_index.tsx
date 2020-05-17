import {useQuery} from "@apollo/react-hooks";
import React from "react";
import {QueryResult} from "react-apollo";
import {match, RouteComponentProps, withRouter} from "react-router";
import {Auth} from "../../store/auth_store";
import {Player} from "../../store/player_store";
import {FullPlaylistQuery, FullPlaylistQueryVariables} from "../../types/FullPlaylistQuery";
import {DesktopPage} from "./desktop/desktop";
import {MobilePage} from "./mobile/header";
import {playlistQuery} from "./query";

type PlaylistPageUrlProps = { catID: string, owner: string, playID: string };

type PlaylistPageBaseProps = { pace?: number, player: Player, auth: Auth };

type PlaylistPage = RouteComponentProps<PlaylistPageUrlProps> & PlaylistPageBaseProps;

export type PlaylistProps =
  { pace: number, songs: any[] }
  & PlaylistPageBaseProps
  & PlaylistPageUrlProps
  & FullPlaylistQueryVariables
  & QueryResult<FullPlaylistQuery> ;

const varsFromMatchParams = (input: match<PlaylistPageUrlProps>): PlaylistPageUrlProps => {
  return {
    catID: input?.params.catID || "erro",
    playID: input?.params.playID || "erro",
    owner: input?.params.owner || "spotify"
  };
};

export const PlaylistPage = withRouter(
  ({auth, player, match, pace = 20}: PlaylistPage) => {
    const urlProps = varsFromMatchParams(match);
    const variables = {pace, cursor: 0, owner: urlProps.owner, playID: urlProps.playID};
    const queryResult = useQuery<FullPlaylistQuery, FullPlaylistQueryVariables>(playlistQuery, {variables});
    const songs = queryResult.data?.playlistSongsPaginated?.songs || [];
    const props = {pace, auth, player, songs, ...urlProps, ...variables, ...queryResult}
    return (
      <React.Fragment>
        <MobilePage {...props} />
        <DesktopPage  {...props} />
      </React.Fragment>
    );
  }
);
