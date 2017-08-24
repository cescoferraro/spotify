import { genericObservable } from "./observables";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of"
import "rxjs/add/observable/merge"
import { toastr as toastrFactory } from 'react-redux-toastr'


export const logoutEpic = (action$, store) => {
    return action$.ofType("LOGOUT")
        .mergeMap(genericObservable({ path: "logout", toastr: false }))
        .catch((err, caught) => {
            return Observable.of(1)
        })
        .mergeMap((now) => {
            console.log(now)

            if (now.response !== undefined) {
                console.log(now)
                return (Observable.merge(
                    Observable.of({ type: "LOGOUT_SUCESS" })
                ))
            } else {
                console.log("bahhhhhhhhhh")
                toastrFactory.warning("LOGIN AGAIN")
                return (Observable.merge(
                    Observable.of({ type: "HOME" })
                ))
            }

        })
}
