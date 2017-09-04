export const token = (state = "", action: any = {}) => {
    switch (action.type) {
        case "SET_TOKEN":
            return action.payload
        default:
            return state
    }
}
