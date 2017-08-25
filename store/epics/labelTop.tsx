import { Observable } from "rxjs/Observable"
import "rxjs/add/observable/merge"
import "rxjs/add/observable/of"
import "rxjs/add/operator/map"
import "rxjs/add/operator/delay"
import "rxjs/add/operator/mapTo"
import "rxjs/add/operator/mergeMap"
import "rxjs/add/operator/filter"
import "rxjs/add/operator/catch"
import { API_URL } from "../../shared/api/index"
import { LABEL_TOP_ARTISTS } from "../actions/actions"
import 'rxjs/add/observable/empty'
import { WarningToast } from "../../shared/toastr";


export const labelTopEpic = (action$, store) => {
    return action$.ofType(LABEL_TOP_ARTISTS)
        .mergeMap((action) => (
            Observable.ajax({
                url: API_URL() + "/label/" + action.payload,
                method: "POST",
                responseType: 'json',
                crossDomain: true
            })
        ))
        .catch((err, caught) => {
            return Observable.of(1)
        })
        .mergeMap((now) => {
            if (now.response !== undefined) {
                return (Observable.merge(
                    Observable.of({ type: "LABEL_TOP_SUCESS" })
                ))
            } else {
                WarningToast()
                return (Observable.merge(
                    Observable.of({ type: "HOME" })
                ))
            }

        })
}
