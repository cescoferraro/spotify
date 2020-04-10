import "rxjs/add/observable/merge"
import "rxjs/add/observable/of"
import "rxjs/add/operator/delay"
import "rxjs/add/operator/filter"
import "rxjs/add/operator/map"
import "rxjs/add/operator/mapTo"
import "rxjs/add/operator/mergeMap"
import {Observable} from "rxjs/Observable"
import {AJAX} from "../../shared/ajax"
import {WarningToast} from "../../shared/toastr"
import {genericObservable} from "./observables"

export const playSongEpic = (action$: any, store: any) => {
    return action$.ofType("PLAY_SONG")
        .mergeMap((action: any) => (
            AJAX("/play/" + action.payload.song, action.payload.token)
        ))
        .catch((err: any, caught: any) => {
            return Observable.of(1)
        })
        .mergeMap((now: any) => {
            if (now.response !== undefined) {
                return (Observable.merge(
                    Observable.of({type: "PLAY_SONG_SUCESS"})
                ))
            } else {
                WarningToast();
                return (Observable.merge(
                    Observable.of({type: "HOME"})
                ))
            }
        })
};

export const playEpic = (action$: any, store: any) => {
    return action$.ofType("PLAY")
        .mergeMap(genericObservable({path: "play"}))
        .catch((err: any, caught: any) => {
            return Observable.of(1)
        })
        .mergeMap((now: any) => {
            if (now.response !== undefined) {
                return (Observable.merge(
                    Observable.of({type: "PLAY_SUCESS"})
                ))
            } else {
                console.log("bahhhhhhhhhh");
                WarningToast();
                return (Observable.merge(
                    Observable.of({type: "HOME"})
                ))
            }

        })
};
