import {GridList, GridListTile, withWidth, WithWidthProps} from "@material-ui/core";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import makeStyles from "@material-ui/core/styles/makeStyles";
import * as React from "react";
import {RouteComponentProps, withRouter} from "react-router";
import {PlaylistQuery_playlistsPaginated_playlists} from "../../types/PlaylistQuery";
import {getGridListCols22, useWindowSize} from "../home/categories_list";
import {FakeGridSkeleton, fakePlaylistList} from "./grid_skeleton";

type FullPlaylist = PlaylistQuery_playlistsPaginated_playlists;
type CategoriesListProps =
  WithWidthProps
  & RouteComponentProps
  & { loading: boolean, catID: string, playlists: FullPlaylist[] };

export const PlaylistList = withRouter(
  withWidth()(
    (props: CategoriesListProps) => {
      const {width} = useWindowSize();
      const innerPlaylists = props.playlists.filter((f: FullPlaylist) => !!f);
      const styles = makeStyles({root: {background: "#313131"}})();
      return (
        <GridList
          cols={getGridListCols22({width})}
          spacing={16}
          cellHeight={300}
        >
          {
            (props.loading ? fakePlaylistList : innerPlaylists)
              .map((f: FullPlaylist, i: number) => {
                let images = f.images || [];
                let randomIcon = images[images.length - 1];
                return (
                  <GridListTile
                    onClick={() => props.history.push("/playlists/" + props.catID + "/" + f.owner?.id + "/" + f.id)}
                    classes={{tile: styles.root}}
                    key={i}
                  >
                    {props.loading && <FakeGridSkeleton/>}
                    {!props.loading && <img src={randomIcon?.url || "image"} alt={f.name || "random"}/>}
                    <GridListTileBar title={f.name}/>
                  </GridListTile>
                );
              })
          }
        </GridList>
      );
    }
  )
);
export const bb = (url: string) => (
  {
    backgroundImage: "url(" + url + ")",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "absolute", width: "100%", height: "100%"
  }
);
