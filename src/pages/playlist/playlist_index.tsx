import React from "react";
import {ChildDataProps, Query} from "react-apollo";
import {match, RouteComponentProps, withRouter} from "react-router";
import {Auth} from "../../store/auth_store";
import {Player} from "../../store/player_store";
import {FullPlaylistQuery, FullPlaylistQueryVariables} from "../../types/FullPlaylistQuery";
import {DesktopPage} from "./desktop/desktop_list";
import {MobilePage} from "./mobile/mobile_list";
import {playlistQuery} from "./query";

const varsFromMatchParams = (input: match<{ catID: string; owner: string; playlistID: string }>) => {
  const catID = input?.params.catID || "erro";
  const playID = input?.params.playlistID || "erro";
  const owner = input?.params.owner || "spotify";
  return {catID, playID, owner};
};

type PlaylistPage = RouteComponentProps<{ catID: string, owner: string, playlistID: string }>
  & { player: Player, pace?: number, auth: Auth };

export const PlaylistPage = withRouter(
  ({auth, player, match, history, pace = 20}: PlaylistPage) => {
    const {catID, playID, owner} = varsFromMatchParams(match);
    const [query, setQuery] = React.useState("");
    return (
      <Query
        <ChildDataProps<FullPlaylistQuery>, FullPlaylistQueryVariables>
        query={playlistQuery}
        variables={{owner, cursor: 0, pace, playID}}
      >
        {({data, fetchMore, loading}) => {
          const songs = data?.playlistSongsPaginated?.songs || [];
          const sharedProps = {
            catID,
            player,
            loading,
            history,
            auth,
            songs,
            query,
            setQuery,
            owner,
            playID,
            pace,
            data,
            fetchMore
          }
          return <div>
            <MobilePage {...sharedProps} />
            <DesktopPage {...sharedProps} />
          </div>
        }}
      </Query>
    );
  }
);
