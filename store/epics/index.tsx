import { Observable } from "rxjs/Observable"
import "rxjs/add/observable/merge"
import "rxjs/add/observable/of"
import "rxjs/add/operator/map"
import "rxjs/add/operator/delay"
import "rxjs/add/operator/mapTo"
import "rxjs/add/operator/mergeMap"
import "rxjs/add/operator/filter"
import { API_URL } from "../../shared/api/index";
import { actions as toastrActions } from 'react-redux-toastr'
import { toastr as toastrFactory } from 'react-redux-toastr'

const funcMap = ({ path, toastr = true }) => (action) => (
    Observable.ajax({
        url: API_URL() + "/" + path,
        body: action.payload.token,
        method: "POST",
        responseType: 'json',
        crossDomain: true
    }).map((ajax) => {
        if (toastr) { toastrFactory.success(path.toUpperCase()) }
        return ajax
    })
)

export const nowEpic = (action$, store) => (
    action$
        .ofType("NOW")
        .mergeMap(funcMap({ path: "now", toastr: false }))
        .mergeMap((now) => {
            return (Observable.merge(
                Observable.of({ type: "SET_NOW", payload: now.response }),
                Observable.of({ type: "DONE_NOW" })
            ))
        })
)

export const stopEpic = (action$, store) => {
    return action$.ofType("PAUSE")
        .mergeMap(funcMap({ path: "pause" }))
        .mapTo({ type: "DONE" })
}

export const nextEpic = (action$, store) => {
    return action$.ofType("NEXT")
        .mergeMap(funcMap({ path: "next" }))
        .mapTo({ type: "DONE" })
}

export const previousEpic = (action$, store) => {
    return action$.ofType("PREVIOUS")
        .mergeMap(funcMap({ path: "previous" }))
        .mapTo({ type: "DONE" })
}

export const playEpic = (action$, store) => {
    return action$.ofType("PLAY")
        .mergeMap(funcMap({ path: "play" }))
        .mapTo({ type: "DONE" })
} 
