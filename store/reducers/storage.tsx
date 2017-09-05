import * as log from "loglevel"
import { LOAD, SAVE } from 'redux-storage'
import { routesMap } from "../../app/route.map"
import { isServer } from '../../shared/utils';

const DASH = (action) => {
    const { tab, prev } = action.payload
    return ({
        kind: "push",
        pathname: "/dashboard/" + tab,
        payload: { tab },
        routesMap: routesMap,
        prev: prev,
        type: "DASHBOARD"
    })
}
const DASH_DET = (action) => {
    const { tab, prev, id } = action.payload
    return {
        kind: "push",
        pathname: "/dashboard/" + tab + "/" + id,
        payload: { tab, id },
        prev: prev,
        routesMap: routesMap,
        type: "DASHBOARD_DETAIL"
    }

}
export const storage = (state = {
}, action) => {
    switch (action.type) {
        case LOAD:
            return { ...state }
        case "DASHBOARD_DETAIL":
            PERFORM(DASH_DET(action))
            return DASH_DET(action)
        case "DASHBOARD":
            PERFORM(DASH(action))
            return DASH(action)
        default:
            return { ...state }
    }
}
const PERFORM = (thing) => {
    if (!isServer()) {
        const reduxStorage = JSON.parse(localStorage.getItem("spotify")) || {}
        reduxStorage.storage = thing
        console.log(9999999999999999999999999)
        log.debug(reduxStorage.storage)
        localStorage["spotify"] = JSON.stringify(reduxStorage)
    }
}
