import {GridList, GridListTile, isWidthUp, withWidth, WithWidthProps} from "@material-ui/core";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import * as React from "react";
import {RouteComponentProps, withRouter} from "react-router";
import {HomeComponentQuery_categoriesPaginated_categories} from "../../types/HomeComponentQuery";

type FullCategorie = HomeComponentQuery_categoriesPaginated_categories;
type CategoriesListProps = WithWidthProps & RouteComponentProps & { categories: FullCategorie[] };

export const CategoriesList = withRouter(
  withWidth()(
    (props: CategoriesListProps) => {
      return (
        <GridList
          cols={getGridListCols({width: props.width})}
          spacing={16}
          cellHeight={180}
        >
          {props.categories
            .map((f: FullCategorie, i: number) => {
              if (!f) return null
              let icons = f.icons || [];
              let randomIcon = icons[icons.length - 1];
              return (
                <GridListTile onClick={() => props.history.push("/playlists/" + f.id)} key={i}>
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

export const getGridListCols = ({width}: WithWidthProps) => {
  const screenWidth = width || "lg";
  if (isWidthUp('xl', screenWidth)) return 6;
  if (isWidthUp('lg', screenWidth)) return 5;
  if (isWidthUp('md', screenWidth)) return 4;
  if (isWidthUp('sm', screenWidth)) return 3;
  return 2;
}
