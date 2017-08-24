import { genericObservable } from "./observables";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of"
import "rxjs/add/observable/merge"
import { toastr as toastrFactory } from 'react-redux-toastr'

export const nowEpic = (action$, store) => (
    action$
        .ofType("NOW")
        .mergeMap(genericObservable({ path: "now", toastr: false }))
        .catch((err, caught) => {
            return Observable.of(1)
        })
        .mergeMap((now) => {
            console.log(now)
            if (now.response !== undefined) {
                console.log(now)
                return (Observable.merge(
                    Observable.of({ type: "SET_VOLUME", payload: now.response.device.volume_percent }),
                    Observable.of({ type: "SET_NOW", payload: now.response }),
                    Observable.of({ type: "DONE_NOW" })
                ))
            } else {
                console.log("bahhhhhhhhhh")
                toastrFactory.warning("LOGIN AGAIN")
                return (Observable.merge(
                    Observable.of({ type: "HOME" })
                ))
            }
        })
)
