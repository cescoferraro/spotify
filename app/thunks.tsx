import { redirect } from 'redux-first-router'
import { Observable } from "rxjs/Observable"
import "rxjs/add/operator/map"
import "rxjs/add/operator/take"
import "rxjs/add/observable/dom/ajax"
import { isServer } from "../store/createStore"
import { API_URL } from "../shared/api/index";


export const dashboardThunk = (dispatch, getState) => {
    const { code } = getState().location.payload
    Observable.ajax({
        url: API_URL() + "/me",
        body: code,
        method: "POST",
        responseType: 'json',
        crossDomain: true
    }).take(1)
        .map((user) => {
            dispatch({ type: "SET_TOKEN", payload: code })
            dispatch(redirect({
                type: 'DASHBOARD',
                payload: {
                    token: code,
                    user: user.response
                }
            }))
        }).subscribe((success) => { console.log("done") })

}


export const homeThunk = (dispatch, getState) => {
    dispatch({ type: "SET_TOKEN", payload: "" })
    dispatch({ type: "SET_NOW", payload: {} })
}
