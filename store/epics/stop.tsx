import { Observable } from "rxjs/Observable"
import "rxjs/add/observable/merge"
import "rxjs/add/observable/of"
import "rxjs/add/operator/map"
import "rxjs/add/operator/delay"
import "rxjs/add/operator/mapTo"
import "rxjs/add/operator/mergeMap"
import "rxjs/add/operator/filter"
import { genericObservable } from "./observables";
import { WarningToast } from "../../shared/toastr";

export const stopEpic = (action$, store) => {
    return action$.ofType("PAUSE")
        .mergeMap(genericObservable({ path: "pause" }))
        .catch((err, caught) => {
            return Observable.of(1)
        })
        .mergeMap((now) => {
            if (now.response !== undefined) {
                return Observable.merge(
                    Observable.of({ type: "STOP_SUCESS" })
                )
            } else {
                WarningToast()
                return Observable.merge(
                    Observable.of({ type: "HOME" })
                )
            }
        })
}
