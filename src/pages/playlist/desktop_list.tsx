import {Box, Container} from "@material-ui/core";
import React from "react";
import {ChildDataProps} from "react-apollo";
import {AutoSizer, InfiniteLoader, List} from "react-virtualized";
import {Auth} from "../../store/auth_store";
import {FullPlaylistQuery} from "../../types/FullPlaylistQuery";
import {AppBarProtoType} from "../playlists/app_bar";
import {isRowLoaded, loadMoreRows, rowRenderer} from "./mobile_list";

export const DesktopList = (props: {
  songs: any[],
  auth: Auth,
  catID: string,
  query: string,
  loading: boolean,
  setQuery: (r: string) => void,
  owner: string,
  playID: string,
  history: any,
  pace: number,
  data: ChildDataProps<FullPlaylistQuery> | undefined,
  fetchMore: any
}) => {
  return (
    <React.Fragment>
      <AppBarProtoType
        onClick={() => {
          console.log("run")
        }}
        searchable={false}
        query={""}
        auth={props.auth}
        setQuery={(e: string) => {
          console.log(e)
        }}
      />
      <Box style={{height: "35vh"}}>
        <h2 style={{margin: 0}}>sldfkfd</h2>
      </Box>
      <Container style={{height: "65vh", backgroundColor: "#646464"}}>
        <Box style={{display: "flex"}}>
          <Box style={{width: "25%"}}>
            <h1>side</h1>
          </Box>
          <Box>
            <InfiniteLoader
              isRowLoaded={isRowLoaded({list: props.songs})}
              loadMoreRows={loadMoreRows({
                owner: props.owner,
                playID: props.playID,
                pace: props.pace,
                cursor: props.data?.playlistSongsPaginated?.cursor || 0,
                fetchMore: props.fetchMore
              })}
              rowCount={props.data?.playlistSongsPaginated?.total || 0}
            >
              {({onRowsRendered, registerChild,}) => (
                <div style={{width: 500, height: 500}}>
                  <AutoSizer ref={registerChild}>
                    {({height, width}) => (
                      <List
                        height={height}
                        onRowsRendered={onRowsRendered}
                        rowCount={props.songs.length}
                        rowHeight={60}
                        rowRenderer={rowRenderer({list: props.songs})}
                        width={width}
                      />
                    )}
                  </AutoSizer>
                </div>
              )}
            </InfiniteLoader></Box></Box>
      </Container></React.Fragment>
  );
};
