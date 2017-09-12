import { Observable } from "rxjs/Observable"
import "rxjs/add/operator/map"
import "rxjs/add/operator/take"
import "rxjs/add/observable/dom/ajax"
import { API_URL } from "../../shared/api/index"
import { bodyUrl, AJAX } from "../../shared/ajax"

export const artistThunk = (dispatch, getState) => {
    const { token, state, user } = getState().location.payload
    if (state) {
        const two = state.split("@")
        AJAX("/artist/" + two[1] + "/" + two[0], { token })
            .take(1)
            .map((http) => {
                dispatch({ type: "SET_ARTIST", payload: { ...http.response, move: two[1], user } })
            })
            .subscribe((success) => { console.log("done") })
    }
}
