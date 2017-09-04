import { Now } from "./now"

export const player = (state = { now: Now, volume: 30 }, action: any = {}) => {
    switch (action.type) {
        case "SET_NOW":
            return { ...state, now: action.payload }
        case "SET_VOLUME":
            return { ...state, volume: action.payload }
        default:
            return state
    }
}
