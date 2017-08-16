import { Observable } from "rxjs/Observable"
import "rxjs/add/observable/merge"
import "rxjs/add/observable/of"
import "rxjs/add/operator/map"
import "rxjs/add/operator/delay"
import "rxjs/add/operator/mapTo"
import "rxjs/add/operator/mergeMap"
import "rxjs/add/operator/filter"
import { genericObservable } from "./observables";

export const nextEpic = (action$, store) => {
    return action$.ofType("NEXT")
        .mergeMap(genericObservable({ path: "next" }))
        .mapTo({ type: "DONE" })
}
