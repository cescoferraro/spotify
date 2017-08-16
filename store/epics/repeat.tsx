import { Observable } from "rxjs/Observable"
import "rxjs/add/observable/merge"
import "rxjs/add/observable/of"
import "rxjs/add/operator/map"
import "rxjs/add/operator/delay"
import "rxjs/add/operator/mapTo"
import "rxjs/add/operator/mergeMap"
import "rxjs/add/operator/filter"
import { API_URL } from "../../shared/api/index";


const reapeatAjax = () => (action) => {
    let next = action.payload.current === (action.payload.states.length - 1) ?
        0 : action.payload.current + 1
    console.log(action.payload.states[next])
    console.log(action.payload.token)
    return Observable.ajax({
        url: API_URL() + "/repeat/" + action.payload.states[next],
        body: action.payload.token,
        method: "POST",
        responseType: 'json',
        crossDomain: true
    }).catch((err: any, caught: any) => {
        console.log(err)
        return Observable.empty()
    }).delay(3333)
}

export const repeatEpic = (action$, store) => {
    return action$.ofType("REPEAT")
        .mergeMap(reapeatAjax())
        .mergeMap((logout) => {
            return Observable.merge(
                Observable.of({ type: "NOW", payload: { token: store.getState().token } })
            )
        })
}
