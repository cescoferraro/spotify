import { combineReducers } from "redux"
import { reducer as toastrReducer } from "react-redux-toastr"
import { drawer } from "./reducers/drawer";

export let allReducers = (location) => combineReducers({
    location,
    toastr: toastrReducer,
    drawer
})