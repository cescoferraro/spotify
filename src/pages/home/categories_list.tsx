import {GridList, GridListTile, isWidthUp, withWidth, WithWidthProps} from "@material-ui/core";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import * as React from "react";
import {HomeComponentQuery_categoriesPaginated_categories} from "../../types/HomeComponentQuery";

export const CategoriesList = withWidth()((props: WithWidthProps & { categories: HomeComponentQuery_categoriesPaginated_categories[] }) => {
  return (
    <GridList

      style={{padding: 30}}
      cols={getGridListCols({width: props.width})}
      spacing={30}
      cellHeight={180}
    >
      {props.categories
        .map((f: HomeComponentQuery_categoriesPaginated_categories, i: number) => {
          let icons = f.icons || [];
          let randomIcon = icons[icons.length - 1];
          return (
            <GridListTile key={i}>
              <img src={randomIcon?.url || "image"} alt={f.name || "random"}/>
              <GridListTileBar title={f.name}/>
            </GridListTile>
          );
        })
      }
    </GridList>
  );
});
const getGridListCols = ({width}: WithWidthProps) => {
  const screenWidth = width || "lg";
  if (isWidthUp('xl', screenWidth)) {
    return 6;
  }

  if (isWidthUp('lg', screenWidth)) {
    return 5;
  }

  if (isWidthUp('md', screenWidth)) {
    return 4;
  }
  if (isWidthUp('sm', screenWidth)) {
    return 3;
  }
  return 2;
}
