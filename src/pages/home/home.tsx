import * as React from "react";
import {ChildProps, Query} from "react-apollo";
import {Auth} from "../../store/auth_store";
import {HomeComponentQuery} from "../../types/HomeComponentQuery";
import {CategoriesList} from "./categories_list";
import {Explanation} from "./explation";
import {query} from "./query";

export const HomeComponent = ({auth}: { auth: Auth }) => {
  return (
    <Query
      <ChildProps<any, HomeComponentQuery>, { state: string }>
      query={query}
      variables={{state: "dashboard"}}
    >
      {({data}) => {
        let categories = data?.categoriesPaginated?.categories || [];
        return (
          <React.Fragment>
            <Explanation auth={auth}onClick={() => window.location.href = data?.login}/>
            <CategoriesList categories={categories}/>
          </React.Fragment>
        )
      }}
    </Query>
  );
};

