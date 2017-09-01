import { genericObservable } from "./observables"
import { Observable } from "rxjs/Observable"
import "rxjs/add/observable/of"
import "rxjs/add/observable/merge"
import { WarningToast } from "../../shared/toastr"

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
                const { response } = now
                return (Observable.merge(
                    Observable.of({
                        type: "SET_VOLUME",
                        payload: response.device.volume_percent
                    }),
                    Observable.of({ type: "SET_NOW", payload: response }),
                    Observable.of({ type: "DONE_NOW" })
                ))
            } else {
                WarningToast()
                return (Observable.merge(
                    Observable.of({ type: "HOME" })
                ))
            }
        })
)
