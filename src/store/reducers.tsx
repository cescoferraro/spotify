import {reducer as toastrReducer} from "react-redux-toastr"
import {combineReducers} from "redux"
import {artist, drawer, id, player, playlists, songs, storage, tab, token, user} from "./reducers/drawer"

export let allReducers = (location: any) => combineReducers({
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
