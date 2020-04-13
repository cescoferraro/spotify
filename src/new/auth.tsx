import * as React from "react";
import {useEffect} from "react";
import {RouteComponentProps, withRouter} from "react-router";
import {EMPTY} from "rxjs";
import {ajax} from "rxjs/ajax";
import {catchError} from "rxjs/operators";
import {API_URL} from "../app/shared/api";
import {Auth} from "./auth_store";

export const AuthComponent = withRouter(({auth, ...other}: RouteComponentProps<{}> & { auth: Auth }) => {
  const token = other.location.pathname
    .replace("/auth/", "")
    .replace("/dashboard", "");
  console.log("cecscooooo");
  console.log(other);
  useEffect(() => {
    ajax
      .post(API_URL() + "/me", token)
      .pipe(
        catchError((e, obs) => {
          console.log(e);
          other.history.push("/");
          return EMPTY;
        }),
      )
      .subscribe(
        (e) => {
          console.log("yyyyyyy");
          auth.setToken(token);
          auth.setProfile(e.response as SpotifyProfile.RootObject);
          other.history.push("/dashboard")
        }
      );
  }, [token]);
  return null;
});

