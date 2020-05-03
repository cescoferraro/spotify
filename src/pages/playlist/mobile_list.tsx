import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import UIList from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import React from "react";
import {ChildProps} from "react-apollo";
import MDSpinner from "react-md-spinner";
import {InfiniteLoader, List, WindowScroller} from "react-virtualized";
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
export const MobileList = (props: {
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
  data: any,
  fetchMore: any
}) => {
  return (
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
        <WindowScroller ref={registerChild}>
          {({width, height, isScrolling, registerChild, scrollTop}) => (
            <div ref={registerChild}>
              <CssBaseline/>
              <AppBarProtoType
                onClick={() => {
                  console.log("run")
                  props.history.push("/playlists/" + props.catID);
                }}
                query={props.query}
                auth={props.auth}
                setQuery={props.setQuery}
              />
              <Toolbar/>
              <Container style={{background: "#313131"}}>
                <Box my={0} style={{paddingBottom: 20}}>
                  <UIList>
                    <List
                      autoHeight
                      height={height}
                      onRowsRendered={onRowsRendered}
                      isScrolling={isScrolling}
                      rowCount={props.songs.length}
                      rowHeight={60}
                      rowRenderer={rowRenderer({list: props.songs})}
                      scrollTop={scrollTop}
                      width={width}
                    />
                    {props.loading && (<MDSpinner/>)}
                  </UIList>
                </Box>
              </Container>
            </div>
          )}
        </WindowScroller>
      )}
    </InfiniteLoader>
  );
};
