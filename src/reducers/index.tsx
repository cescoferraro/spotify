import {combineReducers} from "redux";
import app from "./app";
import {APP_OBJECT} from "./app";
import {DASH_OBJECT, default as dashboard, DASHBOARD_DEFAULT_VALUES} from "./dashboard";
import {APP_DEFAULT_VALUES} from "./app";

interface allReducersType {
    app: APP_OBJECT;
    dashboard: DASH_OBJECT
}

export const allReducers = combineReducers({
    app: app,
    dashboard: dashboard
});

export const allReducersInitial: allReducersType = {
    app: APP_DEFAULT_VALUES,
    dashboard: DASHBOARD_DEFAULT_VALUES
};

