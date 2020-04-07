import "rxjs/add/observable/merge"
import "rxjs/add/observable/of"
import "rxjs/add/operator/delay"
import "rxjs/add/operator/filter"
import "rxjs/add/operator/map"
import "rxjs/add/operator/mapTo"
import "rxjs/add/operator/mergeMap"
import {Observable} from "rxjs/Observable"
import {WarningToast} from "../../shared/toastr"
import {genericObservable} from "./observables"

export const previousEpic = (action$: any, store: any) => {
    return action$.ofType("PREVIOUS")
        .mergeMap(genericObservable({path: "previous"}))
        .catch((err: any, caught: any) => {
            return Observable.of(1)
        })
        .mergeMap((now: any) => {
            if (now.response !== undefined) {
                return (Observable.merge(
                    Observable.of({type: "PREVIOUS_SUCESS"})
                ))
            } else {
                WarningToast();
                return (Observable.merge(
                    Observable.of({type: "HOME"})
                ))
            }

        })
};
