import {GridList, GridListTile, withWidth, WithWidthProps} from "@material-ui/core";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import * as React from "react";
import {RouteComponentProps, withRouter} from "react-router";
import {PlaylistQuery_playlistsPaginated_playlists} from "../../types/PlaylistQuery";
import {getGridListCols22, useWindowSize} from "../home/categories_list";

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
      return (
        <GridList
          cols={getGridListCols22({width})}
          spacing={16}
          cellHeight={300}
        >
          {props.loading ?

            [1, 2, 3, 4, 5]
              .map((_, i) => {
                return (
                  <GridListTile
                    key={i}>
                    <GridListTileBar title={""}/>
                  </GridListTile>

                )
              })
            :

            innerPlaylists
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

