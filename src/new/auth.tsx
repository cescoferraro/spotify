import * as React from "react";
import {useEffect} from "react";
import "rxjs/add/observable/dom/ajax"
import "rxjs/add/operator/map"
import "rxjs/add/operator/take"
import {Observable} from "rxjs/Observable";
import {bodyUrl} from "../shared/ajax";
import {API_URL} from "../shared/api";
import {Auth} from "./auth_store";

export const AuthComponent = ({auth}: { auth: Auth }) => {
    const token = document.location.pathname
        .replace("/auth/", "")
        .replace("/dashboard", "");
    useEffect(() => {

        auth.setToken(token)
        Observable.ajax(bodyUrl(API_URL() + "/me", token))
            .take(1)
            .subscribe((e) => {
                console.log(e.response);

            });
    }, [token]);
    return (
        <div>
            <h2>abour</h2>
        </div>
    );
};
