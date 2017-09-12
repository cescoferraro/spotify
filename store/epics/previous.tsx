import { Observable } from "rxjs/Observable"
import "rxjs/add/observable/merge"
import "rxjs/add/observable/of"
import "rxjs/add/operator/map"
import "rxjs/add/operator/delay"
import "rxjs/add/operator/mapTo"
import "rxjs/add/operator/mergeMap"
import "rxjs/add/operator/filter"
import { WarningToast } from "../../shared/toastr"
import { AJAX } from "../../shared/ajax";

export const previousEpic = (action$, store) => {
    let token
    return action$.ofType("PREVIOUS")
        .mergeMap((action) => {
            token = action.payload.token
            return AJAX("/player/previous", { token })
        })
        .catch((err, caught) => {
            return Observable.of(1)
        })
        .mergeMap((now) => {
            if (now.response !== undefined) {
                return (Observable.merge(
                    Observable.of({ type: "PREVIOUS_SUCESS" })
                ))
            } else {
                WarningToast()
                return (Observable.merge(
                    Observable.of({ type: "HOME" })
                ))
            }

        })
}
