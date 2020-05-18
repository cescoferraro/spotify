import * as React from "react";
import {ApolloProvider} from "react-apollo";
import {Route, RouteComponentProps, withRouter} from "react-router-dom";
import {apolloClient} from "../graphql/apolloClient";
import {PlayerComponentDrawer} from "../player/player";
import {Auth} from "../store/auth_store";
import {Player} from "../store/player_store";
import {AuthComponent} from "./auth/auth";
import {PlayerComponentDashboard} from "./dashboard/dashboard";
import {HomeComponent} from "./home/home";
import {PlaylistPage} from "./playlist/playlist_index";
import {PlaylistsPage} from "./playlists/playlists_index";

export const RoutesComponent = withRouter((props: RouteComponentProps & { player: Player, auth: Auth }) => {
  const {history, auth, player} = props;
  return (
    <ApolloProvider client={apolloClient({history, auth})}>
      <Route path="/auth">
        <AuthComponent player={player} auth={auth}/>
      </Route>
      <Route path="/" exact={true}>
        <HomeComponent auth={auth}/>
      </Route>
      <Route path="/dashboard">
        <PlayerComponentDashboard auth={auth}/>
      </Route>
      <Route path="/playlists/:catID" exact={true}>
        <PlaylistsPage auth={auth}/>
      </Route>
      <Route
        path="/playlists/:catID/:owner/:playID" exact={true}>
        <PlaylistPage player={player} auth={auth}/>
      </Route>
      <PlayerComponentDrawer player={player}/>
    </ApolloProvider>
  );
});
