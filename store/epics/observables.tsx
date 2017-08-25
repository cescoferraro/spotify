import { SuccessToast } from "../../shared/toastr"
import { AJAX } from "../../shared/ajax"

export const genericObservable = ({ path, toastr = true }) => (action) => {
    console.log(action.payload.token)
    return AJAX("/" + path, action.payload.token)
        .map((ajax) => {
            if (toastr) { SuccessToast(path.toUpperCase(), "") }
            return ajax
        })
}

export const playPlaylistMap = () => (action) => {
    console.log(action)
    return AJAX(
        "/play/playlist",
        { token: action.payload.token, songs: action.payload.playlist }
    )
}

export const playSongMap = () => (action) => (
    AJAX("/play/" + action.payload.song, action.payload.token)
)

export const volumeMap = () => (action) => (
    AJAX("/volume/" + action.payload.percent, action.payload.token)
)
