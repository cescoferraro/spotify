import "rxjs/add/observable/merge"
import "rxjs/add/observable/of"
import "rxjs/add/operator/mergeMap"
import {Observable} from "rxjs/Observable"
import {AJAX} from "../../shared/ajax"
import {WarningToast} from "../../shared/toastr"

export const volumeEpic = (action$: any, store: any) => {
    return action$.ofType("VOLUME")
        .mergeMap((action: any) => (
            AJAX("/volume/" + action.payload.percent, action.payload.token)
        ))
        .catch((err: any, caught: any) => {
            return Observable.of(1)
        })
        .mergeMap((now: any) => {
            if (now.response !== undefined) {
                return Observable.merge(
                    Observable.of({type: "VOLUME_SETUP_SUCESS"})
                )
            } else {
                WarningToast();
                return Observable.merge(
                    Observable.of({type: "HOME"})
                )
            }
        })
};
