import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import {gql} from "apollo-boost";
import * as React from "react";
import {ChildProps, Query} from "react-apollo";
import {RouteComponentProps, withRouter} from "react-router";
import {Auth} from "../../store/auth_store";
import {AuthQuery} from "../../types/AuthQuery";
import {HomeComponentQuery} from "../../types/HomeComponentQuery";
import {CategoriesList} from "./categories_list";
import {Explanation} from "./explation";
import {query} from "./query";

export const SpotifyAuthUrl = withRouter(({location, children}: RouteComponentProps & { children: any }) => {
  return (
    <Query
      <ChildProps<any, AuthQuery>, { state: string }>
      query={gql`query AuthQuery($state:String) { login(state:$state) }`}
      variables={{state: btoa(location.pathname)}}
    >
      {({data}) => children(data?.login)}
    </Query>

  )
})
export const HomeComponent = ({auth}: { auth: Auth }) => {
  return (
    <Query
      <ChildProps<any, HomeComponentQuery>, { state: string }>
      query={query}
    >
      {({data}) => {
        return (
          <React.Fragment>
            <Explanation auth={auth}/>
            <Container>
              <Box py={3}>
                <CategoriesList categories={data?.categoriesPaginated?.categories || []}/>
              </Box>
            </Container>
          </React.Fragment>
        )
      }}
    </Query>
  );
};

