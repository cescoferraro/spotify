import { genericObservable } from "./observables"
import { Observable } from "rxjs/Observable"
import "rxjs/add/observable/of"
import "rxjs/add/observable/merge"
import { WarningToast } from "../../shared/toastr"
import { AJAX } from "../../shared/ajax";

export const logoutEpic = (action$, store) => {
    let token
    return action$.ofType("LOGOUT")

        .mergeMap((action) => {
            token = action.payload.token
            return AJAX("/app/logout", JSON.stringify({ token }))
        })
        .catch((err, caught) => {
            return Observable.of(1)
        })
        .mergeMap((now) => {
            if (now.response !== undefined) {
                return (Observable.merge(
                    Observable.of({ type: "LOGOUT_SUCESS" })
                ))
            } else {
                WarningToast()
                return (Observable.merge(
                    Observable.of({ type: "HOME" })
                ))
            }

        })
}
