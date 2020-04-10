import "rxjs/add/observable/dom/ajax"
import "rxjs/add/operator/map"
import "rxjs/add/operator/take"
import {Observable} from "rxjs/Observable"
import {bodyUrl} from "../shared/ajax"
import {API_URL} from "../shared/api"

export const artistThunk = (dispatch: any, getState: any) => {
    const {token, state, user} = getState().location.payload;
    if (state) {
        const two = state.split("@");
        Observable.ajax(bodyUrl(API_URL() + "/" + two[1] + "/" + two[0], token))
            .take(1)
            .map((http) => {
                dispatch({type: "SET_ARTIST", payload: {...http.response, move: two[1], user}})
            })
            .subscribe((success) => {
                console.log("done")
            })
    }
};
