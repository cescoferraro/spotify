import React from "react";
import {ChildDataProps, Query} from "react-apollo";
import {match, RouteComponentProps, withRouter} from "react-router";
import {Auth} from "../../store/auth_store";
import {FullPlaylistQuery, FullPlaylistQueryVariables} from "../../types/FullPlaylistQuery";
import {DesktopList} from "./desktop/desktop_list";
import {MobileList} from "./mobile/mobile_list";
import {playlistQuery} from "./query";

const varsFromMatchParams = (input: match<{ catID: string; owner: string; playlistID: string }>) => {
  const catID = input?.params.catID || "erro";
  const playID = input?.params.playlistID || "erro";
  const owner = input?.params.owner || "spotify";
  return {catID, playID, owner};
};

type PlaylistPage = RouteComponentProps<{ catID: string, owner: string, playlistID: string }>
  & { pace?: number, auth: Auth };

export const PlaylistPage = withRouter(
  ({auth, match, history, pace = 20}: PlaylistPage) => {
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
          return <div>
            <MobileList
              catID={catID}
              loading={loading}
              history={history}
              auth={auth}
              songs={songs}
              query={query}
              setQuery={setQuery}
              owner={owner}
              playID={playID}
              pace={pace}
              data={data}
              fetchMore={fetchMore}
            />

            <DesktopList
              catID={catID}
              loading={loading}
              history={history}
              auth={auth}
              songs={songs}
              query={query}
              setQuery={setQuery}
              owner={owner}
              playID={playID}
              pace={pace}
              data={data}
              fetchMore={fetchMore}
            />
          </div>
        }}
      </Query>
    );
  }
);
