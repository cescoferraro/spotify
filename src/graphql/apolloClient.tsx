import {HttpLink} from "@apollo/client";
import {InMemoryCache} from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import {ApolloLink} from "apollo-link";
import {setContext} from "apollo-link-context";
import {onError} from "apollo-link-error";
import {Auth} from "../store/auth_store";
import DebounceLink from "apollo-link-debounce";

export const API_URL = () => {
  if (document.location.protocol === "https:") {
    return "https://spotifyapi.cescoferraro.xyz"
  }
  return document.location.protocol + "//" + document.location.hostname + ":8080"
};
const DEFAULT_DEBOUNCE_TIMEOUT = 500;
export const apolloClient = ({history, auth}: { auth: Auth, history: any }) => new ApolloClient({
  cache: new InMemoryCache({addTypename: false}),
  link: ApolloLink.from([
    new DebounceLink(DEFAULT_DEBOUNCE_TIMEOUT),
      setContext((yay: any, {headers}: any) => {
        return {
          body: auth.code,
          headers: {
            ...headers,
            "Access-Token": `${auth.access_token}`,
            "Refresh-Token": `${auth.refresh_token}`,
            "Code": `${auth.code}`,
            "State": `${auth.state}`,
            "Expiry": `${auth.expiry}`,
            "Token-Type": `${auth.token_type}`,

          },
        };
      }),
      onError(({graphQLErrors, networkError}) => {
        if (networkError) {
          console.log(
            `[NetworkError error]: Message: ${networkError.message}, Stack: ${networkError.stack}, Name: ${networkError.name}`,
          )
          history.push("/")
        }
        if (graphQLErrors) {
          graphQLErrors.map(({message, locations, path}) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
          );
          history.push("/")
        }
      })
    ]
      .concat(new HttpLink({uri: API_URL() + "/graphql"}) as any)
  ),
});
