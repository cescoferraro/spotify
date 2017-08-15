import { dashboardThunk, homeThunk } from "./thunks"

export const routesMap = {
    HOME: {
        path: "/",
        thunk: homeThunk
    },
    DASHBOARD: {
        path: "/dashboard"
    },
    AUTH: {
        path: "/auth/:code/:state",
        thunk: dashboardThunk
    }
}
