import {gql} from "@apollo/client";
import * as React from "react";
import {useEffect} from "react";
import {ChildProps, graphql} from "react-apollo";
import {RouteComponentProps, withRouter} from "react-router";
import {Auth, OAuthToken} from "../store/auth_store";
import {AuthComponentQuery} from "../types/AuthComponentQuery";

const query = gql`
  query AuthComponentQuery($code:String){
    auth(code:$code){
      access_token
      refresh_token
      token_type
      expiry
    }
  }
`;

type AuthProps = ChildProps<{ auth: Auth } & RouteComponentProps, AuthComponentQuery>;
export const AuthComponent = withRouter(
  graphql<AuthProps>(query, {
    options: (props: AuthProps) => {
      const code = props.location.pathname
        .replace("/auth/", "")
        .replace("/dashboard", "");
      return {
        variables: {
          code
        }
      }
    }
  })(
    (props: AuthProps) => {
      const {data} = props;
      useEffect(() => {

        if (data?.auth) {
          const code = props.location.pathname
            .replace("/auth/", "")
            .replace("/dashboard", "");
          props.auth.setToken(code)
          props.auth.setOAuth(data?.auth as OAuthToken)
          props.history.push("/dashboard")
        }
      }, [data, props.auth])
      return (
        <React.Fragment>
          <div>
            <h2> acess-token </h2>{props.auth?.access_token}
          </div>
          <div>
            <h2> token </h2> {props.auth?.token}
          </div>
        </React.Fragment>
      )
    }
  )
);

