import "rxjs/add/observable/merge"
import "rxjs/add/observable/of"
import "rxjs/add/operator/delay"
import "rxjs/add/operator/filter"
import "rxjs/add/operator/map"
import "rxjs/add/operator/mapTo"
import "rxjs/add/operator/mergeMap"
import {Observable} from "rxjs/Observable"
import {AJAX} from "../../shared/ajax"
import {WarningToast} from "../../shared/toastr"

export const repeatEpic = (action$: any, store: any) => {
    return action$.ofType("REPEAT")
        .mergeMap((action: any) => {
            const next = action.payload.current === (action.payload.states.length - 1) ?
                0 : action.payload.current + 1;
            return AJAX("/repeat/" + action.payload.states[next], action.payload.token)
                .delay(3333)
        })
        .catch((err: any, caught: any) => {
            return Observable.of(1)
        })
        .mergeMap((now: any) => {
            if (now.response !== undefined) {
                return (Observable.merge(
                    Observable.of({type: "NOW", payload: {token: store.getState().token}}),
                    Observable.of({type: "REPEAT_SUCESS"})
                ))
            } else {
                WarningToast();
                return (Observable.merge(
                    Observable.of({type: "HOME"})
                ))
            }
        })
};
