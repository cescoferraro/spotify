import { Observable } from "rxjs/Observable"
import "rxjs/add/observable/merge"
import "rxjs/add/observable/of"
import "rxjs/add/operator/mergeMap"
import { volumeMap } from "./observables";
import { WarningToast } from "../../shared/toastr";

export const volumeEpic = (action$, store) => {
    return action$.ofType("VOLUME")
        .mergeMap(volumeMap())
        .catch((err, caught) => {
            return Observable.of(1)
        })
        .mergeMap((now) => {
            if (now.response !== undefined) {
                return (Observable.merge(
                    Observable.of({ type: "VOLUME_SETUP_SUCESS" })
                ))
            } else {
                WarningToast()
                return (Observable.merge(
                    Observable.of({ type: "HOME" })
                ))
            }

        })
}
