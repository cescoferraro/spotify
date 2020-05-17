import React from "react";
import {AutoSizer, InfiniteLoader, List} from "react-virtualized";
import {Player} from "../../../store/player_store";
import {isRowLoaded} from "../shared/isRowLoaded";
import {loadMoreRows} from "../shared/loadMore";
import {rowRenderer} from "../shared/rowRenderer";

export const DesktopFixedHeightList = (props: { list: any[], owner: string, playID: string, pace: number, data: any, fetchMore: any, player: Player }) => {
  return (
    <InfiniteLoader
      isRowLoaded={isRowLoaded({list: props.list})}
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
                rowCount={props.list.length}
                rowHeight={60}
                rowRenderer={rowRenderer({list: props.list, player: props.player})}
                width={width}
              />
            )}
          </AutoSizer>
        </div>
      )}
    </InfiniteLoader>
  );
};
