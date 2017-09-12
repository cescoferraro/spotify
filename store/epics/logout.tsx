import { Observable } from "rxjs/Observable"
import "rxjs/add/observable/of"
import "rxjs/add/observable/merge"
import { WarningToast } from "../../shared/toastr"
import { AJAX } from "../../shared/ajax";
import { LOGOUT } from "../constants";

export const logoutEpic = (action$, store) => {
    let token
    return action$.ofType(LOGOUT)
        .mergeMap((action) =>
            (AJAX("/app/logout", { token: action.payload.token })))
        .catch((err, caught) => Observable.of({ error: err }))
        .mergeMap((now) => {
            if (now.response) {
                return (Observable.merge(
                    Observable.of({ type: "LOGOUT_SUCESS" })
                ))
            } else {
                WarningToast()
                console.log(now.error)
                return (Observable.merge(
                    Observable.of({ type: "HOME" })
                ))
            }

        })
}
