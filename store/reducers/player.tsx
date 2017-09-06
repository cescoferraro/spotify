import { PlayerPrimerState } from "./now"

export const player = (state = PlayerPrimerState, action: any = {}) => {
    switch (action.type) {
        case "SET_NOW":
            return { ...action.payload }
        case "SET_DEVICE":
            return { ...state, current_device: action.payload }
        default:
            return state
    }
}
