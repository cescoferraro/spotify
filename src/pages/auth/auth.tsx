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

const extract = ({path}: { path: string }) => {
  const spath = path.split("/");
  return {
    path: spath,
    code: spath[2] || "",
    state: spath[3] || ""
  }
};

export const AuthComponent = withRouter(
  graphql<AuthProps>(query, {
    options: (props: AuthProps) => {
      const {code} = extract({path: props.location.pathname})
      return {variables: {code}}
    }
  })
  (
    (props: AuthProps) => {
      const {data, auth, history, location} = props;
      useEffect(() => {
        const {path, state, code} = extract({path: location?.pathname})
        if (path.length === 4) {
          if (data?.auth) {
            auth.setCode(code)
            auth.setOAuth(data?.auth as OAuthToken)
            history.push(atob(state))
          }
        } else {
          history.push("/")
        }
      }, [data, auth, location, history])
      return null
    }
  )
);

