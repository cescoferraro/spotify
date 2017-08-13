import { Observable } from "rxjs/Observable"
import "rxjs/add/operator/map"
import "rxjs/add/operator/delay"
import "rxjs/add/operator/mapTo"
import "rxjs/add/operator/mergeMap"
import "rxjs/add/operator/filter"
import { API_URL } from "../../shared/api/index";
import { actions as toastrActions } from 'react-redux-toastr'
import { toastr } from 'react-redux-toastr'

export const pingEpic = (action$) =>
    action$.filter((action) => action.type === "PING")
        .map((hey) => (hey))
        .mapTo({ type: "USER", payload: 78878 })

export const loginEpic = (action$) =>
    action$.filter((action) => action.type === "LOGIN")
        .map((hey) => (hey))
        .mapTo({ type: "DASHBOARD" })

const funcMap = (action$, path) => (action) => {
    console.log(action)
    console.log(action$)
    return Observable.ajax({
        url: API_URL() + "/" + path,
        body: action.payload.token,
        method: "POST",
        responseType: 'json',
        crossDomain: true
    }).map((ajax) => {
        toastr.success(path.toUpperCase(),
            "You have just applied " + path.toUpperCase() + " to you Spotify Client")
    }).mapTo({ type: "DONE" })
}

export const stopEpic = (action$, store) => {
    return action$.ofType("PAUSE")
        .mergeMap(funcMap(action$, "pause"))
}

export const nextEpic = (action$, store) => {
    return action$.ofType("NEXT")
        .mergeMap(funcMap(action$, "next"))
}

export const previousEpic = (action$, store) => {
    return action$.ofType("PREVIOUS")
        .mergeMap(funcMap(action$, "previous"))
}
export const playEpic = (action$, store) => {
    return action$.ofType("PLAY")
        .mergeMap(funcMap(action$, "play"))
} 
