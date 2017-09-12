import { Observable } from "rxjs/Observable"
import "rxjs/add/observable/merge"
import "rxjs/add/observable/of"
import "rxjs/add/operator/map"
import "rxjs/add/operator/delay"
import "rxjs/add/operator/mapTo"
import "rxjs/add/operator/mergeMap"
import "rxjs/add/operator/filter"
import { genericObservable } from "./observables"
import { WarningToast } from "../../shared/toastr"
import { AJAX } from "../../shared/ajax"
import { PLAYER_STATUS } from "../constants"

export const playSongEpic = (action$, store) => {
    let token
    return action$.ofType("PLAY_SONG")
        .mergeMap((action) => {
            token = action.payload.token
            const { song } = action.payload
            const { player } = store.getState()
            return AJAX("/player/play/" + song, JSON.stringify({ token, device: player.current_device }))
        })
        .catch((err, caught) => {
            return Observable.of(1)
        })
        .mergeMap((now) => {
            if (now.response !== undefined) {
                return (Observable.merge(
                    Observable.of({ type: "PLAY_SONG_SUCESS" }),
                    Observable.of({ type: PLAYER_STATUS, payload: { token } })
                ))
            } else {
                WarningToast()
                return (Observable.merge(
                    Observable.of({ type: "HOME" })
                ))
            }
        })
}

