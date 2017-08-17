import { redirect } from 'redux-first-router'
import { Observable } from "rxjs/Observable"
import "rxjs/add/operator/map"
import "rxjs/add/operator/take"
import "rxjs/add/observable/dom/ajax"
import { isServer } from "../store/createStore"
import { API_URL } from "../shared/api/index";

const AT = (state) => {
    return state.indexOf("@") > -1 ? true : false
}
export const anittaThunk = (dispatch, getState) => {
    const { token, state }: { state: string, token: string } = getState().location.payload
    if (state) {
        const two = state.split("@")
        Observable.ajax({
            url: API_URL() + "/" + two[1] + "/" + two[0],
            body: token,
            method: "POST",
            responseType: 'json',
            crossDomain: true
        }).take(1)
            .map((user) => {
                console.log("logout")
                dispatch({ type: "SET_ARTIST", payload: { ...user.response, move: two[1] } })
            }).subscribe((success) => { console.log("done") })
    }

}


export const authThunk = (dispatch, getState) => {
    const { token, state }:
        { state: string, token: string } = getState().location.payload
    console.info(token)
    console.info(state)
    Observable.ajax({
        url: API_URL() + "/me",
        body: token,
        method: "POST",
        responseType: 'json',
        crossDomain: true
    }).take(1)
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

        }).subscribe((success) => { console.log("done") })

}


export const homeThunk = (dispatch, getState) => {
    dispatch({ type: "SET_TOKEN", payload: "" })
    dispatch({ type: "SET_NOW", payload: {} })
}
