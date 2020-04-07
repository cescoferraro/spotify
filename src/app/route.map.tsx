import { homeThunk } from "./thunks/home"
import { authThunk } from "./thunks/auth"
import { artistThunk } from "./thunks/artist"
import { dashboardThunk } from "./thunks/dashboard"

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
};
