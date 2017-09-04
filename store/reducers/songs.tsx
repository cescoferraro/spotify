import {
    SET_SONG_GENRE_FILTER,
    SET_SONG_EXPLICIT_FILTER,
    SET_SONG_VISIBILITY_FILTER,
    SET_SONG_LOADING_FILTER,
    SET_SONG_SEARCH_FILTER
} from "../actions/actions";

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
