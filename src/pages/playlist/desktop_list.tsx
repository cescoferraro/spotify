import {Box, Container} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import React from "react";
import {ChildDataProps, ChildProps} from "react-apollo";
import {AutoSizer, InfiniteLoader, List} from "react-virtualized";
import {Auth} from "../../store/auth_store";
import {FullPlaylistQuery, FullPlaylistQuery_playlistSongsPaginated_songs} from "../../types/FullPlaylistQuery";
import {AppBarProtoType} from "../playlists/app_bar";

type Created = ChildProps<any, FullPlaylistQuery>;
const isRowLoaded = ({list}: { list: (FullPlaylistQuery_playlistSongsPaginated_songs | null)[] }) => ({index}: any) => !!list[index];
const loadMoreRows = ({owner, playID, cursor, pace, fetchMore}: { owner: string, playID: string, pace: number, cursor: number, fetchMore: any }) => () => {
  return fetchMore({
    variables: {cursor, pace, owner, playID},
    updateQuery: (previousResult: Created, {fetchMoreResult}: { fetchMoreResult: Created }) => {
      console.log(fetchMoreResult);

      let songs = previousResult.playlistSongsPaginated.songs
      if (previousResult.playlistSongsPaginated?.songs?.length === cursor) {
        const future = fetchMoreResult.playlistSongsPaginated.songs
        songs = [...songs, ...future];
      }
      return {
        ...previousResult,
        playlistSongsPaginated: {
          cursor: fetchMoreResult.playlistSongsPaginated.cursor,
          total: fetchMoreResult.playlistSongsPaginated.total,
          songs: songs,
        }
      };
    },
  })
};
const rowRenderer = ({list}: { list: (FullPlaylistQuery_playlistSongsPaginated_songs | null)[] }) =>
  ({key, index, style}: any) => {
    let listElement = list[index];
    let images = listElement?.track?.album?.images || [];
    let artists = listElement?.track?.SimpleTrack?.artists || [];
    return (
      <ListItem key={key} style={style}>
        <ListItemAvatar>
          <Avatar src={images[images.length - 1]?.url || "https://material-ui.com/static/images/avatar/2.jpg"}/>
        </ListItemAvatar>
        <ListItemText
          primary={listElement?.track?.SimpleTrack?.name}
          secondary={
            <React.Fragment>
              <Typography component="span" variant="body2" color="textPrimary">
                {artists.map((d, index) => d?.name + (index + 1 !== artists.length ? ", " : ""))}
              </Typography>
              {"  Cesco Popularity - " + listElement?.track?.popularity}
            </React.Fragment>
          }
        />
      </ListItem>
    );
  };
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
  data: ChildDataProps<FullPlaylistQuery> |undefined,
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
