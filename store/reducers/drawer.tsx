import {
    DRAWER_TOGGLE_ACTION_NAME,
    DRAWER_ACTION_NAME,
    SET_SONG_GENRE_FILTER
} from "../actions/actions"

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

export const artist = (state = {}, action: any = {}) => {
    switch (action.type) {
        case "SET_ARTIST":
            return action.payload
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


export const songs = (state = [], action: any = {}) => {
    switch (action.type) {
        case "SET_SONGS":
            return action.payload
        default:
            return state
    }
}

export const songsFilter = (state = { genre: "" }, action: any = {}) => {
    switch (action.type) {
        case SET_SONG_GENRE_FILTER:
            return { ...state, genre: action.payload }
        default:
            return state
    }
}
