import Avatar from '@material-ui/core/Avatar';
import UIList from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Button from "material-ui/RaisedButton";
import * as React from "react";
import {ChildProps, Query} from 'react-apollo';
import MDSpinner from "react-md-spinner";
import {RouteComponentProps, withRouter} from "react-router";
import {InfiniteLoader, List, WindowScroller} from "react-virtualized";
import {Auth} from "../../store/auth_store";
import {
  PlayerComponentQuery,
  PlayerComponentQuery_mySongsPaginated_songs
} from "../../types/PlayerComponentQuery";
import {query} from "./query";

type IPlayerQueryResult = ChildProps<any, PlayerComponentQuery>;

const isRowLoaded = ({list}: { list: (PlayerComponentQuery_mySongsPaginated_songs | null)[] }) => ({index}: any) => !!list[index];

const loadMoreRows = ({cursor, pace, fetchMore}: { pace: number, cursor: number, fetchMore: any }) => () => {
  return fetchMore({
    variables: {cursor, pace},
    updateQuery: (previousResult: IPlayerQueryResult, {fetchMoreResult}: { fetchMoreResult: IPlayerQueryResult }) => {
      let songs = previousResult.mySongsPaginated.songs
      if (previousResult.mySongsPaginated?.songs?.length === cursor) {
        const future = fetchMoreResult.mySongsPaginated.songs
        songs = [...songs, ...future];
      }
      return {
        ...previousResult,
        mySongsPaginated: {
          cursor: fetchMoreResult.mySongsPaginated.cursor,
          total: fetchMoreResult.mySongsPaginated.total,
          songs: songs,
        }
      };
    },
  })
};


const rowRenderer = ({list}: { list: (PlayerComponentQuery_mySongsPaginated_songs  | null)[] }) => ({key, index, style}: any) => {
  let listElement = list[index];
  let images = listElement?.track?.album?.images || [];
  let artists = listElement?.track?.SimpleTrack?.artists || [];
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
              {artists.map((d, index) => d?.name + (index + 1 !== artists.length ? ", " : ""))}
            </Typography>
            {"  Popularity - " + listElement?.track?.popularity}
          </React.Fragment>
        }
      />
    </ListItem>
  );
};
export const Player = withRouter(
  (props: { auth: Auth } & RouteComponentProps) => {
    const pace = 40;
    return (
      <Query<IPlayerQueryResult, { cursor: number, pace: number }>
        notifyOnNetworkStatusChange={true}
        context={{debounceKey: "294334", debounceTimeout: 1200}}
        query={query}
        variables={{cursor: 0, pace}}
      >
        {({data, fetchMore, loading}) => {
          let songs = data?.mySongsPaginated.songs || [];
          return (
            <div style={{padding: 20, width: "100vw"}}>
              {(data?.error) ?
                <div>Error</div> :
                <React.Fragment>
                  <InfiniteLoader
                    isRowLoaded={isRowLoaded({list: songs})}
                    loadMoreRows={loadMoreRows({pace, cursor: data?.mySongsPaginated?.cursor, fetchMore})}
                    rowCount={data?.mySongsPaginated?.total || 0}
                  >
                    {({onRowsRendered, registerChild,}) => (
                      <WindowScroller ref={registerChild}>
                        {({width, height, isScrolling, registerChild, scrollTop}) => (
                          <React.Fragment>
                            <header>
                              Table header
                              <Button
                                style={{backgroundColor: "red"}}
                                onClick={() => {
                                  props.history.push("/")
                                  props.auth.logout()
                                }}
                              >
                                Logout
                              </Button>
                            </header>
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
                            </div>
                            {loading && (<MDSpinner/>)}
                          </React.Fragment>
                        )}
                      </WindowScroller>
                    )}
                  </InfiniteLoader>
                </React.Fragment>
              }
            </div>
          );
        }
        }
      </Query>
    )
  }
)

