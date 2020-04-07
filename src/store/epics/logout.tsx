import "rxjs/add/observable/merge"
import "rxjs/add/observable/of"
import {Observable} from "rxjs/Observable"
import {WarningToast} from "../../shared/toastr"
import {genericObservable} from "./observables"

export const logoutEpic = (action$: any, store: any) => {
    return action$.ofType("LOGOUT")
        .mergeMap(genericObservable({path: "logout", toastr: false}))
        .catch((err: any, caught: any) => {
            return Observable.of(1)
        })
        .mergeMap((now: any) => {
            if (now.response !== undefined) {
                return (Observable.merge(
                    Observable.of({type: "LOGOUT_SUCESS"})
                ))
            } else {
                WarningToast();
                return (Observable.merge(
                    Observable.of({type: "HOME"})
                ))
            }

        })
};
