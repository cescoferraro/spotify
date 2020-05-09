import {Box, Fab, isWidthDown, List as UIList} from "@material-ui/core";
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
import {LeftPart} from "../../playlists/left";
import {isRowLoaded} from "../shared/isRowLoaded";
import {loadMoreRows} from "../shared/loadMore";
import {rowRenderer} from "../shared/rowRenderer";
import {PlaylistProps} from "../shared/types";

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

export const PlayLoveDuoButton = () => {
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
      <Fab
        classes={{root: classes.circle}}
        color="primary" aria-label="add">
        <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M15.75 0.500004C13.9133 0.500004 12.1506 1.355 11 2.70611C9.84946 1.355 8.08668 0.500004 6.25001 0.500004C2.9989 0.500004 0.444458 3.05445 0.444458 6.30556C0.444458 10.2956 4.03335 13.5467 9.46946 18.4867L11 19.8694L12.5306 18.4761C17.9667 13.5467 21.5556 10.2956 21.5556 6.30556C21.5556 3.05445 19.0011 0.500004 15.75 0.500004ZM11.1056 16.9139L11 17.0194L10.8945 16.9139C5.87001 12.3644 2.55557 9.35611 2.55557 6.30556C2.55557 4.19445 4.1389 2.61111 6.25001 2.61111C7.87557 2.61111 9.4589 3.65611 10.0183 5.10223H11.9922C12.5411 3.65611 14.1245 2.61111 15.75 2.61111C17.8611 2.61111 19.4445 4.19445 19.4445 6.30556C19.4445 9.35611 16.13 12.3644 11.1056 16.9139Z"
            fill="white"/>
        </svg>
      </Fab>
    </React.Fragment>
  );
};

export const MobilePage = withWidth()((props: PlaylistProps) => {
    console.log(props.width)
    const {player} = props
    const images = props.data?.playlistInfo?.images || [];
    return isWidthDown("sm", props.width || "xs") ? (
      <React.Fragment>
        <Toolbar style={{background: "grey", display: "flex", justifyContent: "space-between"}}>
          <SpotifyLogo/>
          <LeftPart auth={props.auth}/>
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
                <PlayLoveDuoButton/>
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
