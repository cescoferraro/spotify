import React from "react";
import {ChildProps, Query} from "react-apollo";
import {RouteChildrenProps, withRouter} from "react-router";
import {FullPlaylistQuery, FullPlaylistQueryVariables} from "../../types/FullPlaylistQuery";
import {playlistQuery} from "./query";

export const PlaylistPage = withRouter(
  (props: RouteChildrenProps<{ playlistID: string, catID: string }>) => {
    const playID = props.match?.params.playlistID || "erro";
    return (
      <Query
        <ChildProps<any, FullPlaylistQuery>, FullPlaylistQueryVariables>
        query={playlistQuery}
        variables={{cursor: 0, pace: 20, playID, owner: ""}}
      >
        {({data}) => {
          return (
            <React.Fragment>
              <h2>skdjfn</h2>
            </React.Fragment>
          )
        }}
      </Query>
    );
  })
