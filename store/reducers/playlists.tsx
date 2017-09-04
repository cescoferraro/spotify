
export const playlists = (state = {
    visibility: false,
    genre: "",
    search: "",
    data: [],
    detail: {
        images: [{ url: "https://www.google.com/favicon.ico" }],
        external_urls: { spotify: "https://www.google.com/favicon.ico" },
        album: {
            images: [{ url: "https://www.google.com/favicon.ico" }]
        }
    },
    explicit: true,
    loading: true
}, action: any = {}) => {
    switch (action.type) {
        case "SET_PLAYLISTS":
            return { ...state, data: action.payload }
        case "SET_PLAYLISTS_DETAIL":
            return { ...state, detail: action.payload }
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
