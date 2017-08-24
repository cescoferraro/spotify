import { Observable } from "rxjs/Observable"
import "rxjs/add/observable/merge"
import "rxjs/add/observable/of"
import "rxjs/add/operator/map"
import "rxjs/add/operator/delay"
import "rxjs/add/operator/mapTo"
import "rxjs/add/operator/mergeMap"
import "rxjs/add/operator/filter"
import { API_URL } from "../../shared/api/index";
import { toastr as toastrFactory } from 'react-redux-toastr'

export const repeatEpic = (action$, store) => {
    return action$.ofType("REPEAT")
        .mergeMap((action) => {
            let next = action.payload.current === (action.payload.states.length - 1) ?
                0 : action.payload.current + 1
            return Observable.ajax({
                url: API_URL() + "/repeat/" + action.payload.states[next],
                body: action.payload.token,
                method: "POST",
                responseType: 'json',
                crossDomain: true
            }).delay(3333)
        })
        .catch((err, caught) => {
            return Observable.of(1)
        })
        .mergeMap((now) => {
            console.log(now)

            if (now.response !== undefined) {
                console.log(now)
                return (Observable.merge(
                    Observable.of({ type: "NOW", payload: { token: store.getState().token } }),
                    Observable.of({ type: "REPEAT_SUCESS" })
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
