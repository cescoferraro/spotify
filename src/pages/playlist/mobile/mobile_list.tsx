import {Box, isWidthDown, List as UIList} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import withWidth from "@material-ui/core/withWidth";
import React from "react";
import {AutoSizer, InfiniteLoader, List, WindowScroller} from "react-virtualized";
import {flexer} from "../../../shared/layout";
import {SpotifyLogo} from "../../../shared/spotify_logo";
import {LoginAvatar} from "../../playlists/left";
import {isRowLoaded} from "../shared/isRowLoaded";
import {loadMoreRows} from "../shared/loadMore";
import {rowRenderer} from "../shared/rowRenderer";
import {PlaylistProps} from "../shared/types";
import {FollowButton} from "./follow";

const backgroundColor = "rgba(255, 255, 255, 0.3)";
const mobileListStyles = makeStyles({
  contained: {
    "&:hover": {
      //you want this to be the same as the backgroundColor above
      backgroundColor: "green"
    }
  },
  circle: {
    backgroundColor: backgroundColor,
    "&:hover": {
      //you want this to be the same as the backgroundColor above
      backgroundColor: backgroundColor
    },
    width: 48, height: 48
  },
  label: {color: "white"},
  button: {background: "green"}
})

export const PlayLoveDuoButton = ({owner, playlistId}: { owner: string, playlistId: string }) => {
  // const {player} = props;
  const classes = mobileListStyles();
  return (
    <React.Fragment>
      <Button
        style={{marginRight: 30, height: 48, width: 162, borderRadius: 25}}
        variant={"contained"}
        classes={{root: classes.button, label: classes.label, contained: classes.contained}}
      >
        Play
      </Button>
      <FollowButton
        owner={owner}
        playlistId={playlistId}
      />
    </React.Fragment>
  );
};

export const MobilePage = withWidth()((props: PlaylistProps) => {
    console.log(props.width)
    const {player, owner} = props
    const images = props.data?.playlistInfo?.images || [];
    const playlistId = props.data?.playlistInfo?.id || "";
    return isWidthDown("sm", props.width || "xs") ? (
      <React.Fragment>
        <Toolbar style={{background: "grey", display: "flex", justifyContent: "space-between"}}>
          <SpotifyLogo/>
          <LoginAvatar auth={props.auth}/>
        </Toolbar>
        <Box
          style={{
            height: "min-content",
            backgroundColor: 'gray',
            color: 'white',
            fontSize: 48,
            padding: 20,
            paddingTop: 0
          }}>
          <Box style={{display: "flex", justifyContent: "center", width: "100%"}}>
            <img
              style={{width: 196, height: 196}}
              alt="dfglkm"
              src={images[images.length - 1]?.url || "https://material-ui.com/static/images/avatar/2.jpg"}
            />
          </Box>
          <Box style={{height: "calc( 100% - 196px )", ...flexer}}>
            <Box style={{height: "min-content"}}>
              <Tooltip
                title={props.data?.playlistInfo?.description || "playlist-description"}
                aria-label="playlist-description"
              >
                <Typography
                  align={"center"}
                  variant={"h4"}
                  style={{color: "white", marginBottom: 24, marginTop: 24}}
                >
                  {props.data?.playlistInfo?.name}
                </Typography>
              </Tooltip>

              <Box style={{...flexer, transform: "translate( 30px )"}}>
                <PlayLoveDuoButton owner={owner} playlistId={playlistId}/>
              </Box>
            </Box>
          </Box>
        </Box>
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
                          rowRenderer={rowRenderer({list: props.songs, player})}
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
