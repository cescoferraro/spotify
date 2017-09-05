export const drawer = (state = false, action: any = {}) => {
    switch (action.type) {
        case "DRAWER_TOGGLE":
            return !state
        case "DRAWER": return action.payload
        default:
            return state
    }
}
