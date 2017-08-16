import { Observable } from "rxjs/Observable"
import "rxjs/add/observable/merge"
import "rxjs/add/observable/of"
import "rxjs/add/operator/mergeMap"
import { volumeMap } from "./observables";

export const volumeEpic = (action$, store) => {
    return action$.ofType("VOLUME")
        .mergeMap(volumeMap())
        .mergeMap((logout) => {
            return Observable.merge(
                Observable.of({ type: "VOLUME_SETUP" })
            )
        })
}
