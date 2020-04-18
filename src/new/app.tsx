import {HttpLink} from "@apollo/client";
import {InMemoryCache} from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import {ApolloLink} from "apollo-link";
import {setContext} from "apollo-link-context";
import {onError} from "apollo-link-error";
import * as React from "react"
import {ApolloProvider} from 'react-apollo';
import {BrowserRouter as Router, Route, RouteComponentProps, withRouter} from "react-router-dom";
import {API_URL} from "../app/shared/api";
import {AuthComponent} from "./auth";
import {Auth} from "./auth_store";
import {AppBarSpotify} from "./bar";
import {Player} from './dashboard';
import {HomeComponent} from "./home";

const auth = new Auth();

const client = ({history}: { history: any }) => new ApolloClient({
  cache: new InMemoryCache({addTypename: false}),
  link: ApolloLink.from([
      setContext((yay: any, {headers}: any) => {
        return {
          body: auth.token,
          headers: {...headers, Authorization: `${auth.token}`},
        };
      }),
      onError(({graphQLErrors, networkError}) => {
        if(networkError){

          console.log(networkError)
        }
        if (graphQLErrors) {
          console.log(graphQLErrors)
          // auth.setToken("");
          // history.push("/");
          graphQLErrors.map(({message, locations, path}) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
          );
        }

        if (networkError) console.log(`[Network error]: ${networkError}`);
      })
    ]
      .concat(new HttpLink({uri: API_URL() + "/graphql"}) as any)
  ),
});

const HomeContainerStyles: React.CSSProperties = {
  width: "100vw",
  height: "calc( 100vh - 64px )",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const WholeApp = withRouter((props: RouteComponentProps & {}) => {
  const {history} = props;
  return (
    <ApolloProvider client={client({history})}>
      <Route path="/auth">
        <AuthComponent auth={auth}/>
      </Route>
      <Route path="/dashboard">
        <div style={{width: "100vw", height: "calc( 100vh - 64px )"}}><Player auth={auth}/></div>
      </Route>
      <Route path="/" exact={true}>
        <AppBarSpotify auth={auth}/>
        <div style={HomeContainerStyles}>
          <div style={{height: "min-content"}}><HomeComponent auth={auth}/></div>
        </div>
      </Route>
    </ApolloProvider>
  );
});

export const App = (
  (props: {}) => {
    console.log(props);
    return (<Router> <WholeApp/> </Router>);
  });
