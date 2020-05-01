import Avatar from "@material-ui/core/Avatar";
import UIList from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import React from "react";
import {ChildProps, Query} from "react-apollo";
import MDSpinner from "react-md-spinner";
import {RouteChildrenProps, withRouter} from "react-router";
import {InfiniteLoader, List, WindowScroller} from "react-virtualized";
import {
  FullPlaylistQuery,
  FullPlaylistQuery_playlistSongsPaginated_songs,
  FullPlaylistQueryVariables
} from "../../types/FullPlaylistQuery";
import {playlistQuery} from "./query";

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

const rowRenderer = ({list}: { list: (FullPlaylistQuery_playlistSongsPaginated_songs | null)[] }) => ({key, index, style}: any) => {
  let listElement = list[index];
  let images = listElement?.track?.album?.images || [];
  // let images = ""
  // let artists = listElement?.track?.SimpleTrack?.name || [];
  return (
    <ListItem
      key={key}
      style={style}
    >
      <ListItemAvatar>
        <Avatar src={images[images.length - 1]?.url || "https://material-ui.com/static/images/avatar/2.jpg"}/>
      </ListItemAvatar>
      <ListItemText
        primary={listElement?.track?.SimpleTrack?.name}
        secondary={
          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              color="textPrimary"
            >
              {/*{artists.map((d, index) => d?.name + (index + 1 !== artists.length ? ", " : ""))}*/}
            </Typography>
            {/*{"  Popularity - " + listElement?.track?.popularity}*/}
          </React.Fragment>
        }
      />
    </ListItem>
  );
};
export const PlaylistPage = withRouter(
  (props: RouteChildrenProps<{ owner: string, playlistID: string }>) => {
    const playID = props.match?.params.playlistID || "erro";
    const owner = props.match?.params.owner || "spotify";
    return (
      <Query
        <Created, FullPlaylistQueryVariables>
        query={playlistQuery}
        variables={{owner, cursor: 0, pace: 20, playID}}
      >
        {({data, fetchMore, loading}) => {
          const songs = data?.playlistSongsPaginated?.songs || [];
          const pace = 15
          return (
            <InfiniteLoader
              isRowLoaded={isRowLoaded({list: songs})}
              loadMoreRows={loadMoreRows({
                owner,
                playID,
                pace,
                cursor: data?.playlistSongsPaginated?.cursor,
                fetchMore
              })}
              rowCount={data?.playlistSongsPaginated.total || 0}
            >
              {({onRowsRendered, registerChild,}) => (
                <WindowScroller ref={registerChild}>
                  {({width, height, isScrolling, registerChild, scrollTop}) => (
                    <div ref={registerChild}>
                      <UIList>
                        <List
                          autoHeight
                          height={height}
                          onRowsRendered={onRowsRendered}
                          isScrolling={isScrolling}
                          rowCount={songs.length}
                          rowHeight={60}
                          rowRenderer={rowRenderer({list: songs})}
                          scrollTop={scrollTop}
                          width={width}
                        /></UIList>
                      {loading && (<MDSpinner/>)}
                    </div>
                  )}
                </WindowScroller>
              )}
            </InfiniteLoader>
          )
        }}
      </Query>
    );
  })
