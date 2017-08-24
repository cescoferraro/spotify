import { Observable } from "rxjs/Observable"
import "rxjs/add/operator/map"
import "rxjs/add/operator/take"
import "rxjs/add/observable/dom/ajax"
import { API_URL } from "../../shared/api/index"
import { AT } from "./shared"
import { bodyUrl } from "../../shared/ajax"

export const authThunk = (dispatch, getState) => {
    const { token, state } = getState().location.payload
    Observable.ajax(bodyUrl(API_URL() + "/me", token))
        .take(1)
        .map((user) => {
            dispatch({ type: "SET_TOKEN", payload: token })
            return user
        })
        .map((user) => {
            dispatch(({
                type: AT(state) ? "ARTIST" : state.toUpperCase(),
                payload: {
                    token,
                    state,
                    user: user.response
                }
            }))

        })
        .subscribe((success) => { console.log("done") })
}