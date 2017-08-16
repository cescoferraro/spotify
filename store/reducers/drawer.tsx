import {
    DRAWER_TOGGLE_ACTION_NAME,
    DRAWER_ACTION_NAME
} from "../actions/actions";

import { Now } from "./now"

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

export const token = (state = "", action: any = {}) => {
    switch (action.type) {
        case "SET_TOKEN":
            return action.payload
        default:
            return state
    }
}
