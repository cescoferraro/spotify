import { combineReducers } from "redux"
import { reducer as toastr } from "react-redux-toastr"
import { drawer } from "./reducers/drawer"
import { artist } from "./reducers/artist"
import { token } from "./reducers/token"
import { tab } from "./reducers/tab"
import { id } from "./reducers/id"
import { user } from "./reducers/user"
import { playlists } from "./reducers/playlists"
import { songs } from "./reducers/songs"
import { player } from "./reducers/player"
import { storage } from "./reducers/storage"
import { app } from "./reducers/app"

export let appReducers = (location) => combineReducers({
    app,
    location,
    id,
    toastr,
    songs,
    playlists,
    storage,
    tab,
    player,
    drawer,
    artist,
    user,
    token
})
