import { Observable } from "rxjs/Observable"
import "rxjs/add/observable/merge"
import "rxjs/add/observable/of"
import "rxjs/add/operator/map"
import "rxjs/add/operator/delay"
import "rxjs/add/operator/mapTo"
import "rxjs/add/operator/mergeMap"
import "rxjs/add/operator/filter"
import { genericObservable } from "./observables";

export const previousEpic = (action$, store) => {
    return action$.ofType("PREVIOUS")
        .mergeMap(genericObservable({ path: "previous" }))
        .mapTo({ type: "DONE" })
}
