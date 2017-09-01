import { homeThunk } from "./thunks"
import { authThunk } from "./thunks/auth"
import { artistThunk } from "./thunks/artist"
import { AJAX } from "../shared/ajax";

const dashboardThunk = (dispatch, getStore) => {
    const { songs, token, tab } = getStore()
    const reduxStorage = JSON.parse(localStorage.getItem("my-save-key"))
    const LStoken = token || reduxStorage.token
    const LStab = reduxStorage.tab || tab
    const gotToken = LStoken !== ""
    const reduxSongsExist = reduxStorage.songs.data.length === 0
    /* dispatch({ type: "SET_TAB", payload: LStab })*/
    console.log(tab)
    console.log(reduxStorage.tab)
    console.log(LStab)
    if (songs.loading && gotToken && reduxSongsExist) {
        AJAX("/songs", LStoken)
            .map((user) => {
                dispatch({ type: "SET_SONGS", payload: user.response })
                dispatch({ type: "SET_SONG_LOADING_FILTER", payload: false })
            }).take(1).subscribe()
    }
}


export const routesMap = {
    HOME: {
        path: "/",
        thunk: homeThunk
    },
    DASHBOARD: {
        path: "/dashboard/:tab",
        thunk: dashboardThunk
    },
    DASHBOARD_DETAIL: {
        path: "/dashboard/:tab/:id",
        thunk: dashboardThunk
    },
    ARTIST: {
        path: "/artist",
        thunk: artistThunk
    },
    AUTH: {
        path: "/auth/:token/:state",
        thunk: authThunk
    }
}
