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

export const playEpic = (action$, store) => {
    let token
    return action$.ofType("PLAY")
        .mergeMap((action) => {
            token = action.payload.token
            const { player } = store.getState()
            return AJAX("/player/play", JSON.stringify({ token, device: player.current_device }))
        })
        .catch((err, caught) => {
            return Observable.of(1)
        })
        .mergeMap((now) => {
            if (now !== 1) {
                return (Observable.merge(
                    Observable.of({ type: "PLAY_SUCESS" }),
                    Observable.of({ type: PLAYER_STATUS, payload: { token } })
                ))
            } else {
                WarningToast()
                return (Observable.merge(
                    Observable.of({ type: "PLAY_FAILURE" }),
                    Observable.of({ type: "HOME" })
                ))
            }

        })
}
