import {
    DRAWER_TOGGLE_ACTION_NAME,
    DRAWER_ACTION_NAME,
    SET_SONG_GENRE_FILTER,
    SET_SONG_EXPLICIT_FILTER,
    SET_SONG_LOADING_FILTER,
    SET_SONG_VISIBILITY_FILTER,
    SET_SONG_SEARCH_FILTER
} from "../actions/actions"

import { Now } from "./now"

export const drawer = (state = false, action: any = {}) => {
    switch (action.type) {
        case DRAWER_TOGGLE_ACTION_NAME:
            return !state
        case DRAWER_ACTION_NAME: return action.payload
        default:
            return state
    }
}
import { LOAD, SAVE } from 'redux-storage';

export const storage = (state = { loaded: false, location: {} }, action) => {
    switch (action.type) {
        case LOAD:
            return { ...state, loaded: true };
        case SAVE:
            console.log('Something has changed and written to disk!');
            return { ...state, location: action.payload.location };
        default:
            return state;
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

const blankUser = {
    display_name: "dsf",
    followers: { total: 234 },
    external_urls: { spotify: "https://www.google.com/favicon.ico" },
    images: [{ url: "https://www.google.com/favicon.ico" }]
}

export const user = (state = blankUser, action: any = {}) => {
    switch (action.type) {
        case "SET_USER":
            return action.payload
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


export const tab = (state = "loading", action: any = {}) => {
    switch (action.type) {
        case "SET_TAB":
            return action.payload
        default:
            return state
    }
}


export const playlists = (state = {
    visibility: false,
    genre: "",
    search: "",
    data: [],
    explicit: true,
    loading: true
}, action: any = {}) => {
    switch (action.type) {
        case "SET_PLAYLISTS":
            return { ...state, data: action.payload }
        case "SET_PLAYLISTS_GENRE_FILTER":
            return { ...state, genre: action.payload }
        case "SET_PLAYLISTS_EXPLICIT_FILTER":
            return { ...state, explicit: action.payload }
        case "SET_PLAYLISTS_VISIBILITY_FILTER":
            return { ...state, visibility: action.payload }
        case "SET_PLAYLISTS_LOADING_FILTER":
            return { ...state, loading: action.payload }
        case "SET_PLAYLISTS_SEARCH_FILTER":
            return { ...state, search: action.payload }
        default:
            return state
    }
}

export const songs = (state = {
    visibility: false,
    genre: "",
    search: "",
    data: [],
    detail: {
        external_urls: { spotify: "https://www.google.com/favicon.ico" },
        album: {
            images: [{ url: "https://www.google.com/favicon.ico" }]
        }
    },
    explicit: true,
    loading: true
}, action: any = {}) => {
    switch (action.type) {
        case "SET_SONGS":
            return { ...state, data: action.payload }
        case "SET_SONGS_DETAIL":
            return { ...state, detail: action.payload }
        case SET_SONG_GENRE_FILTER:
            return { ...state, genre: action.payload }
        case SET_SONG_EXPLICIT_FILTER:
            return { ...state, explicit: action.payload }
        case SET_SONG_VISIBILITY_FILTER:
            return { ...state, visibility: action.payload }
        case SET_SONG_LOADING_FILTER:
            return { ...state, loading: action.payload }
        case SET_SONG_SEARCH_FILTER:
            return { ...state, search: action.payload }
        default:
            return state
    }
}
