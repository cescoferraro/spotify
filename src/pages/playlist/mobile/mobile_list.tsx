import {Box, isWidthDown, List as UIList, WithWidthProps} from "@material-ui/core";
import withWidth from "@material-ui/core/withWidth";
import React from "react";
import {AutoSizer, InfiniteLoader, List, WindowScroller} from "react-virtualized";
import {PlaylistProps} from "../playlist_index";
import {isRowLoaded, loadMoreRows} from "../shared/loadMore";
import {SongRenderer} from "../shared/songRenderer";

export const MobileInfiniteList = withWidth()((props: WithWidthProps & PlaylistProps) => {
    console.log(props.width)
    const {player} = props
    return isWidthDown("sm", props.width || "xs") ? (
      <React.Fragment>
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
          threshold={10}
        >
          {({onRowsRendered, registerChild}) => (
            <WindowScroller>
              {({height, isScrolling, scrollTop}) => (
                <AutoSizer disableHeight>
                  {({width}) => (
                    <Box>
                      <UIList>
                        <List
                          ref={registerChild}
                          className="List"
                          autoHeight
                          height={height}
                          isScrolling={isScrolling}
                          width={width}
                          onRowsRendered={onRowsRendered}
                          rowCount={props.songs.length}
                          rowHeight={60}
                          rowRenderer={SongRenderer({
                            loading: props.loadingLiked,
                            refresh: props.refreshLiked,
                            list: props.songs,
                            player,
                            liked: props.liked
                          })}
                          scrollTop={scrollTop}
                        />
                      </UIList>
                    </Box>
                  )}
                </AutoSizer>
              )}
            </WindowScroller>
          )}
        </InfiniteLoader>
      </React.Fragment>
    ) : null;
  }
);
