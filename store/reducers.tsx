import { combineReducers } from "redux"
import { reducer as toastrReducer } from "react-redux-toastr"
import { drawer, player } from "./reducers/drawer";

export let allReducers = (location) => combineReducers({
    location,
    toastr: toastrReducer,
    player,
    drawer
})
