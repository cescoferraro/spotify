import "rxjs/add/observable/empty"
import "rxjs/add/observable/merge"
import "rxjs/add/observable/of"
import "rxjs/add/operator/catch"
import "rxjs/add/operator/delay"
import "rxjs/add/operator/filter"
import "rxjs/add/operator/map"
import "rxjs/add/operator/mapTo"
import "rxjs/add/operator/mergeMap"
import {Observable} from "rxjs/Observable"
import {AJAX} from "../../shared/ajax"
import {WarningToast} from "../../shared/toastr"
import {LABEL_TOP_ARTISTS} from "../actions/actions"

export const labelTopEpic = (action$: any, store: any) => {
    return action$.ofType(LABEL_TOP_ARTISTS)
        .mergeMap((action: any) => (AJAX("/label/" + action.payload, "")))
        .catch((err: any, caught: any) => {
            return Observable.of(1)
        })
        .mergeMap((now: any) => {
            if (now.response !== undefined) {
                return (Observable.merge(
                    Observable.of({type: "LABEL_TOP_SUCESS"})
                ))
            } else {
                WarningToast();
                return (Observable.merge(
                    Observable.of({type: "HOME"})
                ))
            }
        })
};
