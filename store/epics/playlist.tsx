import { Observable } from "rxjs/Observable"
import "rxjs/add/operator/mergeMap"
import "rxjs/add/operator/mapTo"
import "rxjs/add/observable/merge"
import "rxjs/add/observable/of"
import { playPlaylistMap } from "./observables";
import { toastr as toastrFactory } from 'react-redux-toastr'

export const playPlaylistEpic = (action$, store) => {
    return action$.ofType("PLAY_PLAYLIST")
        .mergeMap(playPlaylistMap())
        .catch((err, caught) => {
            return Observable.of(1)
        })
        .mergeMap((now) => {
            console.log(now)
            if (now.response !== undefined) {
                console.log(now)
                return (Observable.merge(
                    Observable.of({ type: "PLAY_PLAYLIST_SUCCESS" })
                ))
            } else {
                console.log("bahhhhhhhhhh")
                toastrFactory.warning("LOGIN AGAIN")
                return (Observable.merge(
                    Observable.of({ type: "HOME" })
                ))
            }
        })
}
