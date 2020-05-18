import React from "react";
import {AutoSizer, InfiniteLoader, List} from "react-virtualized";
import {isRowLoaded, loadMoreRows} from "../shared/loadMore";
import {SongRenderer} from "../shared/songRenderer";
import {PlaylistProps} from "../types";

export const DesktopFixedHeightList = (props: PlaylistProps) => {
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
        <div style={{width: "100%", height: "100%"}}>
          <AutoSizer ref={registerChild}>
            {({height, width}) => (
              <List
                height={height}
                onRowsRendered={onRowsRendered}
                rowCount={props.songs.length}
                rowHeight={60}
                rowRenderer={SongRenderer({
                  auth:props.auth,
                  loading: props.loadingLiked,
                  refresh: props.refreshLiked,
                  list: props.songs, player: props.player, liked: props.liked
                })}
                width={width}
              />
            )}
          </AutoSizer>
        </div>
      )}
    </InfiniteLoader>
  );
};
