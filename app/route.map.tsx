import { dashboardThunk } from "./thunks"

export const routesMap = {
    HOME: {
        path: "/"
    },
    DASHBOARD: {
        path: "/dashboard"
    },
    AUTH: {
        path: "/auth/:code",
        thunk: dashboardThunk
    }
}
