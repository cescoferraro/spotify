import { Observable } from "rxjs/Observable"
import "rxjs/add/observable/merge"
import "rxjs/add/observable/of"
import "rxjs/add/operator/mergeMap"
import { volumeMap } from "./observables";
import { toastr as toastrFactory } from 'react-redux-toastr'

export const volumeEpic = (action$, store) => {
    return action$.ofType("VOLUME")
        .mergeMap(volumeMap())
        .catch((err, caught) => {
            return Observable.of(1)
        })
        .mergeMap((now) => {
            console.log(now)
            if (now.response !== undefined) {
                console.log(now)
                return (Observable.merge(
                    Observable.of({ type: "VOLUME_SETUP_SUCESS" })
                ))
            } else {
                console.log("error")
                toastrFactory.warning("LOGIN AGAIN")
                return (Observable.merge(
                    Observable.of({ type: "HOME" })
                ))
            }

        })
}
