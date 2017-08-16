import { genericObservable } from "./observables";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of"
import "rxjs/add/observable/merge"


export const logoutEpic = (action$, store) => {
    return action$.ofType("LOGOUT")
        .mergeMap(genericObservable({ path: "logout", toastr: false }))
        .mergeMap((logout) => {

            return Observable.merge(
                Observable.of({ type: "HOME" })
            )
        })
}
