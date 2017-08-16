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
import { playPlaylistMap, playSongMap } from "./observables";
import { genericObservable } from "./observables";

export const playSongEpic = (action$, store) => {
    return action$.ofType("PLAY_SONG")
        .mergeMap(playSongMap())
        .mapTo({ type: "DONE" })
}

export const playEpic = (action$, store) => {
    return action$.ofType("PLAY")
        .mergeMap(genericObservable({ path: "play" }))
        .mapTo({ type: "DONE" })
} 
