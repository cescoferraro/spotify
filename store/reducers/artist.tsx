export const artist = (state = {}, action: any = {}) => {
    switch (action.type) {
        case "SET_ARTIST":
            return action.payload
        default:
            return state
    }
}
