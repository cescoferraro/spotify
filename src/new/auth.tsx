import * as React from "react";
import {useEffect} from "react";
import {RouteComponentProps, withRouter} from "react-router";
import {Auth} from "../store/auth_store";

export const AuthComponent = withRouter(
  ({auth, ...other}: RouteComponentProps<{}> & { auth: Auth }) => {
    const token = other.location.pathname
      .replace("/auth/", "")
      .replace("/dashboard", "");
    useEffect(() => {
      auth.setToken(token);
      other.history.push("/dashboard")
    }, [token, auth, other]);
    return <React.Fragment></React.Fragment>;
  });

