import {Box, isWidthDown, Typography, WithWidthProps} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import withWidth from "@material-ui/core/withWidth";
import React from "react";
import {AutoSizer, InfiniteLoader, List} from "react-virtualized";
import {Auth} from "../../../store/auth_store";
import {FullPlaylistQuery} from "../../../types/FullPlaylistQuery";
import {LeftPart} from "../../playlists/left";
import {flexer, isRowLoaded, loadMoreRows, PlayLoveDuoButton, rowRenderer, SpotifyLogo} from "../mobile/mobile_list";

export const DesktopList = withWidth()((props: {
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
  data: FullPlaylistQuery | undefined,
  fetchMore: any
} & WithWidthProps) => {
  let images = props.data?.playlistInfo?.images || [];
  return !isWidthDown("sm", props.width || "xs") ? (
      <React.Fragment>
        <div style={{height: "35vh", display: "flex"}}>
          <Toolbar style={{width: "35%", height: "min-content"}}>
            <SpotifyLogo
              onClick={() => {
                const url = "/playlists/" + props.catID;
                console.log(324)
                console.log(url)
                props.history.goBack();
                // window.location.href = url;
              }}
            />
          </Toolbar>
          <Box style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            marginBottom: 24,
            height: "100%",
            width: "65%"
          }}>
            <Toolbar style={{display: "flex", justifyContent: "flex-end"}}>
              <Box><LeftPart auth={props.auth}/></Box>
            </Toolbar>
            <Box style={{marginBottom: 24}}>
              <Typography
                variant={"h4"}
                style={{color: "white", paddingBottom: 16}}
              >
                {props.data?.playlistInfo?.name || "LOADING..."}
              </Typography>
              <Typography
                variant={"caption"}
                style={{color: "white", margin: 0}}
              >
                {props.data?.playlistInfo?.description || "LOADING..."}
              </Typography>
              <br/>
              <br/>
              <Box style={{...flexer, justifyContent: "flex-start"}}>
                <PlayLoveDuoButton/>
              </Box>
            </Box>
          </Box>
        </div>
        <div style={{height: "65vh", backgroundColor: "#646464"}}>
          <Box style={{display: "flex"}}>
            <Box style={{width: "35%", display: "flex"}}>
              <img
                alt={"desktop_playlist_image"}
                style={{
                  transform: "translate(0px, -50%)",
                  width: 250,
                  height: 250,
                  marginLeft: "auto",
                  marginRight: "auto"
                }}
                src={images[images.length - 1]?.url || "https://material-ui.com/static/images/avatar/2.jpg"}
              />
            </Box>
            <Box style={{width: "65%"}}>
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
                  <div style={{width: "100%", height: 500}}>
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
              </InfiniteLoader>
            </Box>
          </Box>
        </div>
      </React.Fragment>
    ) :
    null;
});
