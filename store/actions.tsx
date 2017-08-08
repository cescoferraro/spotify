import { bindActionCreators } from "redux"
export const DRAWER_ACTION_NAME = "DRAWER"

export function DRAWER_ACTION(state) {
    return {
        type: DRAWER_ACTION_NAME,
        payload: state
    }
}

export const DRAWER_TOGGLE_ACTION_NAME = "DRAWER_TOOGLE"
export function DRAWER_TOGGLE_ACTION() {
    return {
        type: DRAWER_TOGGLE_ACTION_NAME
    }
}

export function DASHBOARD_ACTION() {
    return { type: "DASHBOARD" }
}

export function GO_HOME_ACTION(id) {
    return { type: "HOME" }
}

export const APP_ACTIONS = (dispatch) => {
    return bindActionCreators({
        DRAWER_ACTION,
        DASHBOARD_ACTION,
        GO_HOME_ACTION,
        DRAWER_TOGGLE_ACTION,
        dispatch
    }, dispatch)
}
