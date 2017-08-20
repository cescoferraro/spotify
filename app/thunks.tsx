import { redirect } from 'redux-first-router'
import { Observable } from "rxjs/Observable"
import "rxjs/add/operator/map"
import "rxjs/add/operator/take"
import "rxjs/add/observable/dom/ajax"
import { isServer } from "../store/createStore"
import { API_URL } from "../shared/api/index";



export const homeThunk = (dispatch, getState) => {
    dispatch({ type: "SET_TOKEN", payload: "" })
    dispatch({ type: "SET_NOW", payload: {} })
}
