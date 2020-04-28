import * as React from "react";
import {ApolloProvider} from "react-apollo";
import {Route, RouteComponentProps, withRouter} from "react-router-dom";
import {apolloClient} from "../graphql/apolloClient";
import {Auth} from "../store/auth_store";
import {AuthComponent} from "./auth/auth";
import {Player} from "./dashboard/dashboard";
import {HomeComponent} from "./home/home";

export const RoutesComponent = withRouter((props: RouteComponentProps & { auth: Auth }) => {
  const {history, auth} = props;
  return (
    <ApolloProvider client={apolloClient({history, auth})}>
      <Route path="/auth"> <AuthComponent auth={auth}/> </Route>
      <Route path="/" exact={true}> <HomeComponent auth={auth}/> </Route>
      <Route path="/dashboard"> <Player auth={auth}/> </Route>
    </ApolloProvider>
  );
});
