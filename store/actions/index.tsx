import { bindActionCreators } from "redux"
import {
    ROUTER_ACTION,
    DRAWER_TOGGLE_ACTION,
    DRAWER_ACTION,
    LABEL_TOP_ARTISTS_ACTION,
    DISPATCH
} from "./actions";

export const APP_ACTIONS = (dispatch) => {
    return bindActionCreators({
        DISPATCH,
        LABEL_TOP_ARTISTS_ACTION,
        DRAWER_ACTION,
        ROUTER_ACTION,
        DRAWER_TOGGLE_ACTION,
        dispatch
    }, dispatch)
}
