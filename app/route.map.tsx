import { authThunk, homeThunk, anittaThunk } from "./thunks"

export const routesMap = {
    HOME: {
        path: "/",
        thunk: homeThunk
    },
    DASHBOARD: {
        path: "/dashboard"
    },
    ARTIST: {
        path: "/artist",
        thunk: anittaThunk
    },
    AUTH: {
        path: "/auth/:token/:state",
        thunk: authThunk
    }
}
