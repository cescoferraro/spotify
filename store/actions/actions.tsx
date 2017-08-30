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

export const ROUTER_ACTION = (type, payload = {}) => {
    return { type, payload }
}

export const LABEL_TOP_ARTISTS = "LABEL_TOP_ARTISTS"
export function LABEL_TOP_ARTISTS_ACTION(state) {
    return {
        type: LABEL_TOP_ARTISTS,
        payload: state
    }
}

export const SET_SONG_GENRE_FILTER = " SET_SONG_GENRE_FILTER"
export function SET_SONG_GENRE_FILTER_ACTION(state) {
    return {
        type: SET_SONG_GENRE_FILTER,
        payload: state
    }
}


export const SET_SONG_EXPLICIT_FILTER = "SET_SONG_EXPLICIT_FILTER"
export function SET_SONG_EXPLICIT_FILTER_ACTION(state) {
    return {
        type: SET_SONG_EXPLICIT_FILTER,
        payload: state
    }
}

export const SET_SONG_LOADING_FILTER = "SET_SONG_LOADING_FILTER"
export function SET_SONG_LOADING_FILTER_ACTION(state) {
    return {
        type: SET_SONG_LOADING_FILTER,
        payload: state
    }
}
