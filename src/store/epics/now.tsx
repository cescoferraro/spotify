import "rxjs/add/observable/merge"
import "rxjs/add/observable/of"
import {Observable} from "rxjs/Observable"
import {WarningToast} from "../../shared/toastr"
import {genericObservable} from "./observables"

export const nowEpic = (action$: any, store: any) => (
    action$
        .ofType("NOW")
        .mergeMap(genericObservable({path: "now", toastr: false}))
        .catch((err: any, caught: any) => {
            return Observable.of(1)
        })
        .mergeMap((now: any) => {
            console.log(now);
            if (now.response !== undefined) {
                const {response} = now;
                return (Observable.merge(
                    Observable.of({
                        type: "SET_VOLUME",
                        payload: response.device.volume_percent
                    }),
                    Observable.of({type: "SET_NOW", payload: response}),
                    Observable.of({type: "DONE_NOW"})
                ))
            } else {
                WarningToast();
                return (Observable.merge(
                    Observable.of({type: "HOME"})
                ))
            }
        })
);
