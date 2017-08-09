export const DRAWER_ACTION_NAME = "DRAWER"
export function DRAWER_ACTION(state) {
    return {
        type: DRAWER_ACTION_NAME,
        payload: state
    }
}

export const DRAWER_TOGGLE_ACTION_NAME = "DRAWER_TOOGLE"
export const DRAWER_TOGGLE_ACTION = () => {
    return {
        type: DRAWER_TOGGLE_ACTION_NAME
    }
}

export const ROUTER_ACTION = (type) => {
    return { type: type }
}