import {Box, Fab, isWidthDown, List as UIList, WithWidthProps} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import withWidth from "@material-ui/core/withWidth";
import React from "react";
import {ChildProps} from "react-apollo";
import {AutoSizer, InfiniteLoader, List, WindowScroller} from "react-virtualized";
import {Auth} from "../../../store/auth_store";
import {
  FullPlaylistQuery,
  FullPlaylistQuery_playlistSongsPaginated_songs,
  FullPlaylistQuery_playlistSongsPaginated_songs_track_SimpleTrack_artists
} from "../../../types/FullPlaylistQuery";
import {LeftPart} from "../../playlists/left";

type Created = ChildProps<any, FullPlaylistQuery>;

export const isRowLoaded = ({list}: { list: (FullPlaylistQuery_playlistSongsPaginated_songs | null)[] }) => ({index}: any) => {
  return !!list[index];
};

export const loadMoreRows = ({owner, playID, cursor, pace, fetchMore}: { owner: string, playID: string, pace: number, cursor: number, fetchMore: any }) => () => {
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
          name: fetchMoreResult.playlistSongsPaginated.name,
          total: fetchMoreResult.playlistSongsPaginated.total,
          songs: songs,
        }
      };
    },
  })
};

type Artist = FullPlaylistQuery_playlistSongsPaginated_songs_track_SimpleTrack_artists | null;

export const rowRenderer = ({list}: { list: (FullPlaylistQuery_playlistSongsPaginated_songs | null)[] }) =>
  ({key, index, style}: any) => {
    let listElement = list[index];
    let images = listElement?.track?.album?.images || [];
    return (
      <ListItem key={key} style={style}>
        <ListItemAvatar>
          <Avatar src={images[images.length - 1]?.url || "https://material-ui.com/static/images/avatar/2.jpg"}/>
        </ListItemAvatar>
        <ListItemText
          primary={listElement?.track?.SimpleTrack?.name}
        />
      </ListItem>
    );
  };
type Created1 = {
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
};

type Props = WithWidthProps & Created1 ;

export const flexer = {alignItems: "center", display: "flex", justifyContent: "center"};
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

export const PlayLoveDuoButton = (props: any) => {
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

export const SpotifyLogo = (
  {
    onClick = () => {
      console.log("default")
    }
  }:
    { onClick?: () => void }
  ) => {
    return <IconButton
      style={{paddingTop: 0, paddingBottom: 0, height: 64}}
      onClick={onClick}
      edge="start" color="inherit"
      aria-label="open drawer">
      <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="0 0 50 50" width="50px"
           height="50px">
        <path
          d="M25.009,1.982C12.322,1.982,2,12.304,2,24.991S12.322,48,25.009,48s23.009-10.321,23.009-23.009S37.696,1.982,25.009,1.982z M34.748,35.333c-0.289,0.434-0.765,0.668-1.25,0.668c-0.286,0-0.575-0.081-0.831-0.252C30.194,34.1,26,33,22.5,33.001 c-3.714,0.002-6.498,0.914-6.526,0.923c-0.784,0.266-1.635-0.162-1.897-0.948s0.163-1.636,0.949-1.897 c0.132-0.044,3.279-1.075,7.474-1.077C26,30,30.868,30.944,34.332,33.253C35.022,33.713,35.208,34.644,34.748,35.333z M37.74,29.193 c-0.325,0.522-0.886,0.809-1.459,0.809c-0.31,0-0.624-0.083-0.906-0.26c-4.484-2.794-9.092-3.385-13.062-3.35 c-4.482,0.04-8.066,0.895-8.127,0.913c-0.907,0.258-1.861-0.272-2.12-1.183c-0.259-0.913,0.272-1.862,1.184-2.12 c0.277-0.079,3.854-0.959,8.751-1c4.465-0.037,10.029,0.61,15.191,3.826C37.995,27.328,38.242,28.388,37.74,29.193z M40.725,22.013 C40.352,22.647,39.684,23,38.998,23c-0.344,0-0.692-0.089-1.011-0.275c-5.226-3.068-11.58-3.719-15.99-3.725 c-0.021,0-0.042,0-0.063,0c-5.333,0-9.44,0.938-9.481,0.948c-1.078,0.247-2.151-0.419-2.401-1.495 c-0.25-1.075,0.417-2.149,1.492-2.4C11.729,16.01,16.117,15,21.934,15c0.023,0,0.046,0,0.069,0 c4.905,0.007,12.011,0.753,18.01,4.275C40.965,19.835,41.284,21.061,40.725,22.013z"/>
      </svg>
    </IconButton>;
  }
;

export const MobileList = withWidth()((props: Props) => {
    console.log(props.width)
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
                          width={width}
                          onRowsRendered={onRowsRendered}
                          rowCount={props.songs.length}
                          rowHeight={60}
                          rowRenderer={rowRenderer({list: props.songs})}
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
