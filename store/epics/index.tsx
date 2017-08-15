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

const playerMap = ({ path, toastr = true }) => (action) => (
    Observable.ajax({
        url: API_URL() + "/" + path,
        body: action.payload.token,
        method: "POST",
        responseType: 'json',
        crossDomain: true
    }).map((ajax) => {
        if (toastr) { toastrFactory.success(path.toUpperCase()) }
        return ajax
    }).catch((err, caught) => {
        return Observable.of({ type: "HOME" })
    })
)

export const nowEpic = (action$, store) => (
    action$
        .ofType("NOW")
        .mergeMap(playerMap({ path: "now", toastr: false }))
        .mergeMap((now) => {
            console.log(now)
            return (Observable.merge(
                Observable.of({ type: "SET_NOW", payload: now.response }),
                Observable.of({ type: "DONE_NOW" })
            ))
        })
)

export const logoutEpic = (action$, store) => {
    return action$.ofType("LOGOUT")
        .mergeMap(playerMap({ path: "logout", toastr: false }))
        .mergeMap((logout) => {

            return Observable.merge(
                Observable.of({ type: "HOME" })
            )
        })
}

export const repeatEpic = (action$, store) => {
    return action$.ofType("REPEAT")
        .mergeMap(reapeatAjax())
        .mergeMap((logout) => {
            return Observable.merge(
                Observable.of({ type: "NOW", payload: { token: store.getState().token } })
            )
        })
}

const reapeatAjax = () => (action) => {
    let next = action.payload.current === (action.payload.states.length - 1) ?
        0 : action.payload.current + 1
    console.log(action.payload.states[next])
    console.log(action.payload.token)
    return Observable.ajax({
        url: API_URL() + "/repeat/" + action.payload.states[next],
        body: action.payload.token,
        method: "POST",
        responseType: 'json',
        crossDomain: true
    }).catch((err: any, caught: any) => {
        console.log(err)
        return Observable.empty()
    }).delay(3333)
}

export const stopEpic = (action$, store) => {
    return action$.ofType("PAUSE")
        .mergeMap(playerMap({ path: "pause" }))
        .mapTo({ type: "DONE" })
}

export const nextEpic = (action$, store) => {
    return action$.ofType("NEXT")
        .mergeMap(playerMap({ path: "next" }))
        .mapTo({ type: "DONE" })
}

export const previousEpic = (action$, store) => {
    return action$.ofType("PREVIOUS")
        .mergeMap(playerMap({ path: "previous" }))
        .mapTo({ type: "DONE" })
}

export const playEpic = (action$, store) => {
    return action$.ofType("PLAY")
        .mergeMap(playerMap({ path: "play" }))
        .mapTo({ type: "DONE" })
} 
