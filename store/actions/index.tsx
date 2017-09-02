import { bindActionCreators } from "redux"
import {
    ROUTER_ACTION,
    DRAWER_TOGGLE_ACTION,
    DRAWER_ACTION,
    LABEL_TOP_ARTISTS_ACTION,
    SET_SONG_EXPLICIT_FILTER_ACTION,
    SET_SONG_LOADING_FILTER_ACTION,
    SET_SONG_SEARCH_FILTER_ACTION,
    SET_SONG_VISIBILITY_FILTER_ACTION,
    SET_SONG_GENRE_FILTER_ACTION,
    DISPATCH
} from "./actions";

export const APP_ACTIONS = (dispatch) => {
    return bindActionCreators({
        DISPATCH,
        SET_SONG_GENRE_FILTER_ACTION,
        SET_SONG_VISIBILITY_FILTER_ACTION,
        SET_SONG_SEARCH_FILTER_ACTION,
        SET_SONG_LOADING_FILTER_ACTION,
        SET_SONG_EXPLICIT_FILTER_ACTION,
        LABEL_TOP_ARTISTS_ACTION,
        DRAWER_ACTION,
        ROUTER_ACTION,
        DRAWER_TOGGLE_ACTION,
        dispatch
    }, dispatch)
}
