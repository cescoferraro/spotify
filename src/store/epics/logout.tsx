import { genericObservable } from "./observables"
import { Observable } from "rxjs/Observable"
import "rxjs/add/observable/of"
import "rxjs/add/observable/merge"
import { WarningToast } from "../../shared/toastr"

export const logoutEpic = (action$, store) => {
    return action$.ofType("LOGOUT")
        .mergeMap(genericObservable({ path: "logout", toastr: false }))
        .catch((err, caught) => {
            return Observable.of(1)
        })
        .mergeMap((now) => {
            if (now.response !== undefined) {
                return (Observable.merge(
                    Observable.of({ type: "LOGOUT_SUCESS" })
                ))
            } else {
                WarningToast();
                return (Observable.merge(
                    Observable.of({ type: "HOME" })
                ))
            }

        })
};
