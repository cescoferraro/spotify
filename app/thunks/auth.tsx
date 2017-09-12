import { Observable } from "rxjs/Observable"
import "rxjs/add/operator/map"
import "rxjs/add/operator/take"
import "rxjs/add/observable/dom/ajax"
import { API_URL } from "../../shared/api/index"
import { isArtistState } from "./shared"
import { bodyUrl, AJAX } from "../../shared/ajax"
import { PLAYER_STATUS } from "../../store/constants";

export const authThunk = (dispatch, getState) => {
    const { token, state } = getState().location.payload
    AJAX("/profile", JSON.stringify({ token }))
        .take(1)
        .map((user) => {
            dispatch({ type: "SET_TAB", payload: { tab: "player" } })
            dispatch({ type: "SET_TOKEN", payload: token })
            dispatch({ type: "SET_USER", payload: user.response })
            return user
        })
        .map((user) => {
            if (isArtistState(state)) {
                dispatch(({ type: "ARTIST", payload: { token, state, user: user.response } }))
            } else {
                const { prev } = getState().location
                dispatch(({ type: state.toUpperCase(), payload: { tab: "player", prev } }))
                dispatch({ type: PLAYER_STATUS, payload: { token } })
            }

        })
        .subscribe()
}
