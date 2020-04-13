import {InMemoryCache} from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import {ApolloLink} from "apollo-link";
import {setContext} from "apollo-link-context";
import {RestLink} from "apollo-link-rest";
import * as React from "react"
import {ApolloProvider} from 'react-apollo';
import {Fetch, RenderProps} from "react-request";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {API_URL} from "../app/shared/api";
import {NowListening} from "../reactappenv";
import {AuthComponent} from "./auth";
import {Auth} from "./auth_store";
import {AppBarSpotify} from "./bar";
import {Repo} from './dashboard';
import {HomeComponent} from "./home";

const auth = new Auth();

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([
    setContext((yay: any, {headers}: any) => {
      return {
        body: auth.token,
        headers: {...headers, Authorization: `${auth.token}`},
      };
    }),
    new RestLink({uri: API_URL()}) as any,
  ]),
});

function ReactRequest(props: { auth: Auth }) {
  return (
    <Fetch url={API_URL() + "/now"} headers={{Authorization: props.auth.token}} cache={"force-cache"}>
      {({fetching, failed, doFetch, data}: RenderProps<NowListening.Root>) => {
        return (
          <div onClick={() => doFetch().then(() => true)}>
            {fetching && <div>Loading data...</div>}
            {failed && <div>The request did not succeed.</div>}
            {(!fetching && !failed) &&
            (data ? (
                <div>
                  <h2>{data?.device.id}</h2>
                </div>
              ) : (
                <div>
                  <h2>notlistening</h2>
                </div>
              )
            )}
          </div>
        );
      }}
    </Fetch>
  )
}

export const App = (
  (props: {}) => {
    console.log(props);
    return (
      <ApolloProvider client={client}>
        <Router>
          <AppBarSpotify/>
          <Route path="/auth">
            <AuthComponent auth={auth}/>
          </Route>
          <Route path="/dashboard">
            <Repo input={{token: auth.token}}/>
            <Repo input={{token: auth.token}}/>
            <Repo input={{token: auth.token}}/>
            <ReactRequest auth={auth}/>
            <ReactRequest auth={auth}/>
            <ReactRequest auth={auth}/>
            <ReactRequest auth={auth}/>
          </Route>
          <Route path="/" exact={true}>
            <HomeComponent auth={auth}/>
          </Route>
        </Router>
      </ApolloProvider>
    );
  });
