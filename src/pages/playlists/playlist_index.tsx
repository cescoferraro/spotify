import React from "react";
import {ChildProps, Query} from "react-apollo";
import {RouteChildrenProps, withRouter} from "react-router";
import {PlaylistQuery} from "../../types/PlaylistQuery";
import {PlaylistList} from "./playlists_list";
import {playlistQuery} from "./query";

export const PlaylistPage = withRouter(
  (props: RouteChildrenProps<{ catID: string }>) => {
    const catID = props.match?.params.catID || "hiphop";
    return (
      <Query
        <ChildProps<any, PlaylistQuery>, { catID: string, cursor: number, pace: number }>
        query={playlistQuery}
        variables={{catID: catID, cursor: 0, pace: 20}}
      >
        {({data}) => {
          let playlists = data?.playlistsPaginated?.playlists || [];
          return (
            <React.Fragment>
              <PlaylistList catID={catID} playlists={data?.playlistsPaginated?.playlists || []}/>
            </React.Fragment>
          )
        }}
      </Query>
    );
  })
