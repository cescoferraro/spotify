export const id = (state = "sdkfb", action: any = {}) => {
    switch (action.type) {
        case "DASHBOARD_DETAIL":
            return action.payload.id
        default:
            return state
    }
}
