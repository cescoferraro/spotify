import { combineReducers } from "redux"
import { reducer as toastrReducer } from "react-redux-toastr"
import { id, playlists, tab, drawer, player, token, artist, songs, user, storage } from "./reducers/drawer"

export let allReducers = (location) => combineReducers({
    location,
    id,
    toastr: toastrReducer,
    songs,
    playlists,
    storage,
    tab,
    player,
    drawer,
    artist,
    user,
    token
});
