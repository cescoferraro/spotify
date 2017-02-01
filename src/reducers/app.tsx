import Action from "./action";
import {handleActions} from "redux-actions";
export type APP_OBJECT = {
    version?: string;
    sidebar?: boolean;
    component?: JSX.Element
}
export const APP_DEFAULT_VALUES = {
    component: null,
    sidebar: false,
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

export const TOOGLE_SIDE_BAR_ACTION_NAME = "TOOGLE_SIDE_BAR";
export function TOOGLE_SIDE_BAR(): Action<APP_OBJECT> {
    console.log("TOOGLE_SIDE_BAR INVOKED");
    return {
        type: TOOGLE_SIDE_BAR_ACTION_NAME,
        payload: {}
    }
}


const app = handleActions({
    [SET_APP_VERSION_ACTION_NAME]: function (state: APP_OBJECT, action): APP_OBJECT {
        return {
            component: state.component,
            sidebar: state.sidebar,
            version: action.payload.version
        };
    },
    [SET_APP_BAR_MENU_ACTION_NAME]: function (state: APP_OBJECT, action): APP_OBJECT {
        return {
            version: state.version,
            sidebar: state.sidebar,
            component: action.payload.component
        };
    },
    [TOOGLE_SIDE_BAR_ACTION_NAME]: function (state: APP_OBJECT, action): APP_OBJECT {
        return {
            component: state.component,
            version: state.version,
            sidebar: !state.sidebar
        };
    }
}, {});


export default app;
