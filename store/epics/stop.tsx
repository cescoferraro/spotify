import { Observable } from "rxjs/Observable"
import "rxjs/add/observable/merge"
import "rxjs/add/observable/of"
import "rxjs/add/operator/map"
import "rxjs/add/operator/delay"
import "rxjs/add/operator/mapTo"
import "rxjs/add/operator/mergeMap"
import "rxjs/add/operator/filter"
import { genericObservable } from "./observables";
import { toastr as toastrFactory } from 'react-redux-toastr'

export const stopEpic = (action$, store) => {
    return action$.ofType("PAUSE")
        .mergeMap(genericObservable({ path: "pause" }))
        .catch((err, caught) => {
            return Observable.of(1)
        })
        .mergeMap((now) => {
            console.log(now)

            if (now.response !== undefined) {
                console.log(now)
                return (Observable.merge(
                    Observable.of({ type: "STOP_SUCESS" })
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
