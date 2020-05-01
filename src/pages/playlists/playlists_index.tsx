import React from "react";
import {DataValue, Query} from "react-apollo";
import {RouteChildrenProps, withRouter} from "react-router";
import {PlaylistQuery, PlaylistQueryVariables} from "../../types/PlaylistQuery";
import {PlaylistList} from "./playlists_list";
import {playlistQuery} from "./query";

export const PlaylistsPage = withRouter(
  (props: RouteChildrenProps<{ catID: string }>) => {
    const catID = props.match?.params.catID || "hiphop";
    return (
      <Query
        <DataValue<any, PlaylistQuery>, PlaylistQueryVariables>
        query={playlistQuery}
        variables={{catID: catID, cursor: 0, pace: 20}}
      >
        {({data}) => {
          return (
            <React.Fragment>
              <PlaylistList catID={catID} playlists={data?.playlistsPaginated?.playlists || []}/>
            </React.Fragment>
          )
        }}
      </Query>
    );
  })
