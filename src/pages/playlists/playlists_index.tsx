import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from "@material-ui/core/Toolbar";
import React from "react";
import {ChildProps, Query} from "react-apollo";
import {RouteChildrenProps, withRouter} from "react-router";
import {
  PlaylistQuery,
  PlaylistQuery_playlistsPaginated_playlists,
  PlaylistQueryVariables
} from "../../types/PlaylistQuery";
import {AppBarProtoType} from "./app_bar";
import {PlaylistList} from "./playlists_list";
import {playlistQuery} from "./query";

type PlaylistQueryProps = ChildProps<any, PlaylistQuery>;

const extracted = (data: PlaylistQueryProps, query: string) => {
  const newVar = data?.playlistsPaginated?.playlists;
  if (newVar) {
    console.log("aquiiii")

    return newVar.filter((t: PlaylistQuery_playlistsPaginated_playlists) => {
      let includes = t.name?.toLowerCase().includes(query.toLowerCase());
      console.log(includes, query)
      return includes;
    });
  }
  return [];
};

export const PlaylistsPage = withRouter(
  (props: RouteChildrenProps<{ catID: string }>) => {
    const [query, setQuery] = React.useState("");
    const catID = props.match?.params.catID || "hiphop";
    console.log(props.location)
    return (
      <Query
        <PlaylistQueryProps, PlaylistQueryVariables>
        query={playlistQuery}
        variables={{catID: catID, cursor: 0, pace: 40}}
      >
        {({data}: PlaylistQueryProps) => {
          const playlists = extracted(data, query);
          console.log(playlists)
          return (
            <React.Fragment>
              <CssBaseline/>
              <AppBarProtoType onClick={() => props.history.push("/")} query={query} setQuery={setQuery}/>
              <Toolbar/>
              <Container style={{background: "#313131"}}>
                <Box my={0} style={{paddingBottom: 20, paddingTop: 20}}>
                  <PlaylistList catID={catID} playlists={playlists}/>
                </Box>
              </Container>
            </React.Fragment>
          )
        }}
      </Query>
    );
  }
);

