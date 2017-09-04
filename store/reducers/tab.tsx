export const tab = (state = "loading", action: any = {}) => {
    switch (action.type) {
        case "DASHBOARD":
        case "DASHBOARD_DETAIL":
        case "SET_TAB":
            return action.payload.tab
        default:
            return state
    }
}
