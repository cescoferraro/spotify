import {GridList, GridListTile, isWidthUp, withWidth, WithWidthProps} from "@material-ui/core";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import * as React from "react";
import {RouteComponentProps, withRouter} from "react-router";
import {PlaylistQuery_playlistsPaginated_playlists} from "../../types/PlaylistQuery";

type FullPlaylist = PlaylistQuery_playlistsPaginated_playlists;
type CategoriesListProps = WithWidthProps & RouteComponentProps & { catID: string, playlists: FullPlaylist[] };

export const PlaylistList = withRouter(
  withWidth()(
    (props: CategoriesListProps) => {
      return (
        <GridList
          style={{padding: 30}}
          cols={getGridListCols({width: props.width})}
          spacing={30}
          cellHeight={180}
        >
          {props.playlists
            .map((f: FullPlaylist, i: number) => {
              if (!f) return null
              console.log(f)
              let images = f.images || [];
              let randomIcon = images[images.length - 1];
              return (
                <GridListTile onClick={() => props.history.push("/playlists/" + props.catID + "/" + f.id)} key={i}>
                  <img src={randomIcon?.url || "image"} alt={f.name || "random"}/>
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

const getGridListCols = ({width}: WithWidthProps) => {
  const screenWidth = width || "lg";
  if (isWidthUp('xl', screenWidth)) return 6;
  if (isWidthUp('lg', screenWidth)) return 5;
  if (isWidthUp('md', screenWidth)) return 4;
  if (isWidthUp('sm', screenWidth)) return 3;
  return 2;
}
