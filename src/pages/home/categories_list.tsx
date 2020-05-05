import {GridList, withWidth, WithWidthProps} from "@material-ui/core";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import {debounce} from "lodash";
import * as React from "react";
import {useCallback, useEffect, useState} from "react";
import {RouteComponentProps, withRouter} from "react-router";
import {HomeComponentQuery_categoriesPaginated_categories} from "../../types/HomeComponentQuery";
import {FakeGridSkeleton} from "../playlists/grid_skeleton";
import {fakeCategorieList} from "./grid_skeleton";

type FullCategorie = HomeComponentQuery_categoriesPaginated_categories;
type CategoriesListProps = WithWidthProps & RouteComponentProps & { loading: boolean, categories: FullCategorie[] };

export const CategoriesList = withRouter(
  withWidth()(
    (props: CategoriesListProps) => {
      const {width} = useWindowSize();
     return (
        <GridList
          cols={getGridListCols22({width})}
          spacing={16}
          cellHeight={274}
        >
          {(props.loading ? fakeCategorieList : props.categories)
            .map((f: FullCategorie, i: number) => {
              if (!f) return null
              let icons = f.icons || [];
              let randomIcon = icons[icons.length - 1];
              return (
                <GridListTile onClick={() => props.history.push("/playlists/" + f.id)} key={i}>

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

export const getGridListCols22 = ({width}: { width: number | undefined }) => {
  let width1 = width === undefined ? 0 : width;
  switch (true) {
    case width1 < 420:
      return 1;
    case width1 < 650:
      return 2;
    case width1 < 1100:
      return 3;
    case width1 < 1460:
      return 4;
    case width1 < 1500:
      return 5;
  }
  return 1;
}

type NumberUndefined = number | undefined;
type UseWindowProps = { width: NumberUndefined, height: NumberUndefined };

export const useWindowSize = (delay?: number): UseWindowProps => {
  const isClient = typeof window === 'object';
  const getSize = useCallback((): UseWindowProps => ({
    width: isClient ? window.innerWidth : undefined,
    height: isClient ? window.innerHeight : undefined
  }), [isClient]);
  const [windowSize, setWindowSize] = useState(getSize);
  useEffect(() => {
    if (!isClient) return;
    const handleResize = () => setWindowSize(getSize());
    window.addEventListener('resize', debounce(handleResize, delay || 1000));
    return () => window.removeEventListener('resize', handleResize);
  }, [isClient, getSize, delay]);
  return windowSize;
}
