import { bindActionCreators } from "redux"
import {
    DRAWER_ACTION,
    ROUTER_ACTION,
    DRAWER_TOGGLE_ACTION
} from "./actions";

export const APP_ACTIONS = (dispatch) => {
    return bindActionCreators({
        DRAWER_ACTION,
        ROUTER_ACTION,
        DRAWER_TOGGLE_ACTION,
        dispatch
    }, dispatch)
}
