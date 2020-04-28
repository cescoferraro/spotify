import {gql} from "@apollo/client";
import {useEffect} from "react";
import {ChildProps, graphql} from "react-apollo";
import {RouteComponentProps, withRouter} from "react-router";
import {Auth, OAuthToken} from "../../store/auth_store";
import {AuthComponentQuery} from "../../types/AuthComponentQuery";

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
      const path = props.location.pathname.split("/");
      const code = path[2] || "";
      return {variables: {code}}
    }
  })
  (
    (props: AuthProps) => {
      const {data, auth, history, location} = props;
      useEffect(() => {
        const path = location.pathname.split("/");
        if (path.length === 4) {
          if (data?.auth) {
            const code = path[2];
            const state = path[3];
            auth.setCode(code)
            auth.setState(state)
            auth.setOAuth(data?.auth as OAuthToken)
            history.push("/dashboard")
          }
        } else {
          history.push("/")
        }
      }, [data, auth, location, history])
      return null
    }
  )
);

