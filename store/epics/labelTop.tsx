import { Observable } from "rxjs/Observable"
import "rxjs/add/observable/merge"
import "rxjs/add/observable/of"
import "rxjs/add/operator/map"
import "rxjs/add/operator/delay"
import "rxjs/add/operator/mapTo"
import "rxjs/add/operator/mergeMap"
import "rxjs/add/operator/filter"
import "rxjs/add/operator/catch"
import { API_URL } from "../../shared/api/index";
import { LABEL_TOP_ARTISTS } from "../actions/actions";
import 'rxjs/add/observable/empty';

const labelTopAjax = () => (action) => {
    return Observable.ajax({
        url: API_URL() + "/label/" + action.payload,
        method: "POST",
        responseType: 'json',
        crossDomain: true
    }).catch((err: any, caught: any) => {
        console.log(err)
        return Observable.empty()
    })
}

export const labelTopEpic = (action$, store) => {
    return action$.ofType(LABEL_TOP_ARTISTS)
        .mergeMap(labelTopAjax())
        .mergeMap((logout) => {
            return Observable.merge(
                Observable.of({ type: "DONE" })
            )
        })
}
