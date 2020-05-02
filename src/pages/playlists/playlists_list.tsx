import {GridList, GridListTile, withWidth, WithWidthProps} from "@material-ui/core";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import * as React from "react";
import {RouteComponentProps, withRouter} from "react-router";
import {PlaylistQuery_playlistsPaginated_playlists} from "../../types/PlaylistQuery";
import {getGridListCols} from "../home/categories_list";

type FullPlaylist = PlaylistQuery_playlistsPaginated_playlists;
type CategoriesListProps = WithWidthProps & RouteComponentProps & { catID: string, playlists: FullPlaylist[] };

export const PlaylistList = withRouter(
  withWidth()(
    (props: CategoriesListProps) => {
      return (
        <GridList
          cols={getGridListCols({width: props.width})}
          spacing={16}
          cellHeight={180}
        >
          {props.playlists
            .filter((f: FullPlaylist) => !!f)
            .map((f: FullPlaylist, i: number) => {
              let images = f.images || [];
              let randomIcon = images[images.length - 1];
              return (
                <GridListTile
                  onClick={() => props.history.push("/playlists/" + props.catID + "/" + f.owner?.id + "/" + f.id)}
                  key={i}>
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

