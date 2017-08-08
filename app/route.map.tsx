import { redirect } from 'redux-first-router'
import { Observable } from "rxjs/Observable"
import "rxjs/add/operator/map"
import "rxjs/add/operator/delay"
import "rxjs/add/observable/dom/ajax"
import "rxjs/add/observable/of"
import "rxjs/add/observable/if"
import { isServer } from "../store/logger"
import { API_URL } from "../shared/api/index";

const dashboardThunk = (dispatch, getState) => {
    const { code } = getState().location.payload
    Observable.ajax({
        url: API_URL() + "/me",
        body: code,
        method: "POST",
        responseType: 'json',
        crossDomain: true
    })
        .map((user) => {
            console.log(user.response)
            dispatch(redirect({
                type: 'DASHBOARD',
                payload: {
                    user: user.response
                }
            }))
        })
        .subscribe((success) => {
            console.log("done")
        })

}

export const routesMap = {
    HOME: { path: "/" },
    DASHBOARD: { path: "/dashboard" },
    AUTH: {
        path: "/auth/:code",
        thunk: dashboardThunk
    }
}
