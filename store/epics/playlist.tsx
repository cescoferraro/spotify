import { Observable } from "rxjs/Observable"
import "rxjs/add/operator/mergeMap"
import "rxjs/add/operator/mapTo"
import "rxjs/add/observable/merge"
import "rxjs/add/observable/of"
import { WarningToast } from "../../shared/toastr"
import { AJAX } from "../../shared/ajax";

export const playPlaylistEpic = (action$, store) => {
    return action$.ofType("PLAY_THESE_SONGS")
        .mergeMap((action) => (
            AJAX(
                "/play/playlist",
                { token: action.payload.token, songs: action.payload.playlist }
            )
        ))
        .catch((err, caught) => {
            return Observable.of(1)
        })
        .mergeMap((now) => {
            if (now.response !== undefined) {
                return (Observable.merge(
                    Observable.of({ type: "PLAY_THESE_SONGS_SUCCESS" })
                ))
            } else {
                WarningToast()
                return (Observable.merge(
                    Observable.of({ type: "HOME" })
                ))
            }
        })
}
