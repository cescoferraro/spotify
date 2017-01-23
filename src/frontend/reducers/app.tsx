import Action from "./action";
import {handleActions} from "redux-actions";
export type APP_OBJECT = {
    version?: string;
    component?: JSX.Element
}
export const APP_DEFAULT_VALUES = {
    component: null,
    version: "0.0.33"
};


export const SET_APP_VERSION_ACTION_NAME = "SET_APP_VERSION";
export function SET_APP_VERSION(version: string): Action<APP_OBJECT> {
    return {
        type: SET_APP_VERSION_ACTION_NAME,
        payload: {
            version: version
        }
    }
}


export const SET_APP_BAR_MENU_ACTION_NAME = "SET_APP_BAR_MENU";
export function SET_APP_BAR_MENU(component: JSX.Element): Action<APP_OBJECT> {
    return {
        type: SET_APP_BAR_MENU_ACTION_NAME,
        payload: {
            component: component
        }
    }
}


const app = handleActions({
    [SET_APP_VERSION_ACTION_NAME]: function (state: APP_OBJECT = {version: "0.0.0.0"}, action: Action<APP_OBJECT>): APP_OBJECT {
        return {
            component: state.component,
            version: action.payload.version
        };
    },
    [SET_APP_BAR_MENU_ACTION_NAME]: function (state: APP_OBJECT = {version: "0.0.0.0"}, action: Action<APP_OBJECT>): APP_OBJECT {
        return {
            version: state.version,
            component: action.payload.component
        };
    }
}, {});


export default app;
