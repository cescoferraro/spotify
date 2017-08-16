import { genericObservable } from "./observables";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of"
import "rxjs/add/observable/merge"

export const nowEpic = (action$, store) => (
    action$
        .ofType("NOW")
        .mergeMap(genericObservable({ path: "now", toastr: false }))
        .mergeMap((now) => {
            console.log(now)
            return (Observable.merge(
                Observable.of({ type: "SET_VOLUME", payload: now.response.device.volume_percent }),
                Observable.of({ type: "SET_NOW", payload: now.response }),
                Observable.of({ type: "DONE_NOW" })
            ))
        })
)
