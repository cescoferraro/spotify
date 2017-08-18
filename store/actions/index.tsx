import { bindActionCreators } from "redux"
import {
    DRAWER_ACTION,
    ROUTER_ACTION,
    DRAWER_TOGGLE_ACTION,
    LABEL_TOP_ARTISTS_ACTION
} from "./actions";

export const APP_ACTIONS = (dispatch) => {
    return bindActionCreators({
        LABEL_TOP_ARTISTS_ACTION,
        DRAWER_ACTION,
        ROUTER_ACTION,
        DRAWER_TOGGLE_ACTION,
        dispatch
    }, dispatch)
}
