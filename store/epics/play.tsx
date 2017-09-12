import { Observable } from "rxjs/Observable"
import "rxjs/add/observable/merge"
import "rxjs/add/observable/of"
import "rxjs/add/operator/map"
import "rxjs/add/operator/delay"
import "rxjs/add/operator/mapTo"
import "rxjs/add/operator/mergeMap"
import "rxjs/add/operator/filter"
import { WarningToast } from "../../shared/toastr"
import { AJAX, getTokenFromRequestBody } from "../../shared/ajax"
import { PLAYER_STATUS } from "../constants"


export const playEpic = (action$, store) => {
    return action$.ofType("PLAY")
        .mergeMap((action) => (
            AJAX("/player/play", {
                token: action.payload.token,
                device: store.getState().player.current_device
            })))
        .catch((error, caught) => (Observable.of({ error })))
        .mergeMap((now) => {
            if (now.response) {
                return (Observable.merge(
                    Observable.of({ type: "PLAY_SUCESS" }),
                    Observable.of({
                        type: PLAYER_STATUS,
                        payload: { token: getTokenFromRequestBody(now) }
                    })
                ))
            } else {
                WarningToast()
                console.log(now.error)
                return (Observable.merge(
                    Observable.of({ type: "PLAY_FAILURE" }),
                    Observable.of({ type: "HOME" })
                ))
            }

        })
}
