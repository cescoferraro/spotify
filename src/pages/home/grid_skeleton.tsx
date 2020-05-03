import {Skeleton} from "@material-ui/lab";
import * as React from "react";
import {HomeComponentQuery_categoriesPaginated_categories} from "../../types/HomeComponentQuery";

const blackCategorie: HomeComponentQuery_categoriesPaginated_categories = {
  name: "cesco",
  icons: [{
    url: "https://i.scdn.co/image/ab67706f000000029ed927af72b644ee065cc980",
    __typename: "Image"
  }],
  id: "sdf",
  __typename: "Category"
};
export const fakeCategorieList = [blackCategorie, blackCategorie, blackCategorie, blackCategorie, blackCategorie, blackCategorie, blackCategorie, blackCategorie, blackCategorie, blackCategorie];

export const FakeGridSkeleton = () => {
  return (
    <React.Fragment>
      <Skeleton variant="circle" width={40} height={40}/>
      <Skeleton variant={"text"} animation={"wave"}/>
      <Skeleton variant={"text"} animation={"wave"}/>
      <Skeleton variant={"text"} animation={"wave"}/>
      <Skeleton variant={"text"} animation={"wave"}/>
      <Skeleton variant={"text"} animation={"wave"}/>
      <Skeleton variant={"text"} animation={"wave"}/>
      <Skeleton variant={"text"} animation={"wave"}/>
      <Skeleton variant={"text"} animation={"wave"}/>
      <Skeleton variant={"text"} animation={"wave"}/>
      <Skeleton variant={"text"} animation={"wave"}/>
      <Skeleton variant={"text"} animation={"wave"}/>
    </React.Fragment>
  );
};
