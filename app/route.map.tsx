import { homeThunk } from "./thunks"
import { authThunk } from "./thunks/auth"
import { artistThunk } from "./thunks/artist";

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
        thunk: artistThunk
    },
    AUTH: {
        path: "/auth/:token/:state",
        thunk: authThunk
    }
}
