import * as React from "react";
import {useEffect} from "react";
import {RouteComponentProps, withRouter} from "react-router";
import "rxjs/add/observable/dom/ajax"
import "rxjs/add/operator/map"
import "rxjs/add/operator/take"
import {Observable} from "rxjs/Observable";
import {bodyUrl} from "../app/shared/ajax";
import {API_URL} from "../app/shared/api";
import {Auth} from "./auth_store";

export const AuthComponent = withRouter(({auth, ...other}: RouteComponentProps<{}> & { auth: Auth }) => {
    const token = other.location.pathname
        .replace("/auth/", "")
        .replace("/dashboard", "");
    console.log(other);
    useEffect(() => {
        Observable.ajax(bodyUrl(API_URL() + "/me", token))
            .take(1)
            .catch((e, obs) => {
                    console.log(e);
                    other.history.push("/");
                    return Observable.empty();
                }
            )
            .subscribe((e) => {
                auth.setToken(token);
                auth.setProfile(e.response as SpotifyProfile.RootObject);
                other.history.push("/dashboard")
            });
    }, [token]);
    return null;
});

