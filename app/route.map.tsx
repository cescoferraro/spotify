import { homeThunk } from "./thunks"
import { authThunk } from "./thunks/auth"
import { artistThunk } from "./thunks/artist"
import { AJAX } from "../shared/ajax";

export const routesMap = {
    HOME: {
        path: "/",
        thunk: homeThunk
    },
    DASHBOARD: {
        path: "/dashboard/:tab",
        thunk: (dispatch, getStore) => {

            const { songs, token } = getStore()
            console.log(21398767893634)
            console.log(getStore())
            if (songs.loading) {
                AJAX("/songs", token)
                    .map((user) => {
                        dispatch({ type: "SET_SONGS", payload: user.response })
                        dispatch({ type: "SET_SONG_LOADING_FILTER", payload: false })
                    }).take(1).subscribe()
            }
            /* console.log(getStore().location.payload)*/
            /* console.log(getStore().token)*/
        }
    },
    DASHBOARD_DETAIL: {
        path: "/dashboard/:tab/:id"
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
