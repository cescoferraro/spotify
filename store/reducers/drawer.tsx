import {
    DRAWER_TOGGLE_ACTION_NAME,
    DRAWER_ACTION_NAME
} from "../actions/actions";

export const drawer = (state = false, action: any = {}) => {
    switch (action.type) {
        case DRAWER_TOGGLE_ACTION_NAME:
            return !state
        case DRAWER_ACTION_NAME:
            return action.payload
        default:
            return state
    }
}
