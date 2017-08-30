import { combineReducers } from "redux"
import { reducer as toastrReducer } from "react-redux-toastr"
import { drawer, player, token, artist, songs, songsFilter } from "./reducers/drawer"

export let allReducers = (location) => combineReducers({
    location,
    toastr: toastrReducer,
    songsFilter,
    player,
    drawer,
    artist,
    songs,
    token
})
