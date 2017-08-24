import { Observable } from "rxjs/Observable"
import "rxjs/add/observable/merge"
import "rxjs/add/observable/of"
import "rxjs/add/operator/map"
import "rxjs/add/operator/delay"
import "rxjs/add/operator/mapTo"
import "rxjs/add/operator/mergeMap"
import "rxjs/add/operator/filter"
import { API_URL } from "../../shared/api/index";
import { toastr as toastrFactory } from 'react-redux-toastr'

export const genericObservable = ({ path, toastr = true }) => (action) => {
    console.log(action.payload.token)
    return (
        Observable.ajax({
            url: API_URL() + "/" + path,
            body: action.payload.token,
            method: "POST",
            responseType: 'json',
            crossDomain: true
        }).map((ajax) => {
            if (toastr) {
                toastrFactory.success(path.toUpperCase(), "", {
                    position: "bottom-center"
                })
            }
            return ajax
        }))
}

export const playPlaylistMap = () => (action) => {
    console.log(action)
    return (
        Observable.ajax({
            url: API_URL() + "/play/playlist",
            body: { token: action.payload.token, songs: action.payload.playlist },
            method: "POST",
            responseType: 'json',
            crossDomain: true
        }).catch((err, caught) => {
            return Observable.of({ type: "HOME" })
        })
    )
}

export const playSongMap = () => (action) => (
    Observable.ajax({
        url: API_URL() + "/play/" + action.payload.song,
        body: action.payload.token,
        method: "POST",
        responseType: 'json',
        crossDomain: true
    }).catch((err, caught) => {
        return Observable.of({ type: "HOME" })
    })
)


export const volumeMap = () => (action) => (
    Observable.ajax({
        url: API_URL() + "/volume/" + action.payload.percent,
        body: action.payload.token,
        method: "POST",
        responseType: 'json',
        crossDomain: true
    }).catch((err, caught) => {
        return Observable.of({ type: "HOME" })
    })
)

