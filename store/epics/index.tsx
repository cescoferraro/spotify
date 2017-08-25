import { Observable } from "rxjs/Observable"
import "rxjs/add/observable/merge"
import "rxjs/add/observable/of"
import "rxjs/add/operator/mergeMap"
import { WarningToast } from "../../shared/toastr"
import { AJAX } from "../../shared/ajax"

export const volumeEpic = (action$, store) => {
    return action$.ofType("VOLUME")
        .mergeMap((action) => (
            AJAX("/volume/" + action.payload.percent, action.payload.token)
        ))
        .catch((err, caught) => {
            return Observable.of(1)
        })
        .mergeMap((now) => {
            if (now.response !== undefined) {
                return Observable.merge(
                    Observable.of({ type: "VOLUME_SETUP_SUCESS" })
                )
            } else {
                WarningToast()
                return Observable.merge(
                    Observable.of({ type: "HOME" })
                )
            }
        })
}
