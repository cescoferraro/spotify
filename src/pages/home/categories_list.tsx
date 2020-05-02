import {GridList, GridListTile, isWidthUp, withWidth, WithWidthProps} from "@material-ui/core";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import {debounce} from "lodash";
import * as React from "react";
import {useEffect, useState} from "react";
import {RouteComponentProps, withRouter} from "react-router";
import {HomeComponentQuery_categoriesPaginated_categories} from "../../types/HomeComponentQuery";

type FullCategorie = HomeComponentQuery_categoriesPaginated_categories;
type CategoriesListProps = WithWidthProps & RouteComponentProps & { categories: FullCategorie[] };

export const CategoriesList = withRouter(
  withWidth()(
    (props: CategoriesListProps) => {
      const {width, height} = useWindowSize();
      console.log(width, height)
      return (
        <GridList
          cols={getGridListCols22({width})}
          spacing={16}
          cellHeight={274}
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

export const getGridListCols22 = ({width}: { width: number | undefined }) => {
  let width1 = width === undefined ? 0 : width;
  switch (true) {
    case width1 < 420:
      return 1;
    case width1 < 650:
      return 2;
    case width1 < 940:
      return 3;
    case width1 < 1260:
      return 4;
    case width1 < 1500:
      return 5;
  }
  return 1;
}

type NumberUndefined = number | undefined;

// Hook
export function useWindowSize(): { width: NumberUndefined, height: NumberUndefined } {
  const isClient = typeof window === 'object';

  function getSize(): { width: NumberUndefined, height: NumberUndefined } {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', debounce(handleResize, 1000));
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}
