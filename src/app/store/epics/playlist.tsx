import "rxjs/add/observable/merge"
import "rxjs/add/observable/of"
import "rxjs/add/operator/mapTo"
import "rxjs/add/operator/mergeMap"
import {Observable} from "rxjs/Observable"
import {AJAX} from "../../shared/ajax"
import {WarningToast} from "../../shared/toastr"

export const playPlaylistEpic = (action$: any, store: any) => {
    return action$.ofType("PLAY_THESE_SONGS")
        .mergeMap((action: any) => (
            AJAX(
                "/play/playlist",
                {token: action.payload.token, songs: action.payload.playlist}
            )
        ))
        .catch((err: any, caught: any) => {
            return Observable.of(1)
        })
        .mergeMap((now: any) => {
            if (now.response !== undefined) {
                return (Observable.merge(
                    Observable.of({type: "PLAY_THESE_SONGS_SUCCESS"})
                ))
            } else {
                WarningToast();
                return (Observable.merge(
                    Observable.of({type: "HOME"})
                ))
            }
        })
};
