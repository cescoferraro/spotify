import { AJAX } from "../../shared/ajax"
import { NAVIGATOR } from "./log"
import { isProduction } from "../../shared/utils"

export const dashboardThunk = (dispatch, getStore) => {
    const { playlists, songs, token, tab, player } = getStore()
    const NAV = NAVIGATOR({ store: getStore(), log: false })
    if (NAV.gotToken) {
        if (songs.loading && (!NAV.reduxSongsExist || !isProduction())) {
            console.info("firing songs request")
            AJAX("/songs", token || NAV.LStoken)
                .map((user) => {
                    dispatch({ type: "SET_SONGS", payload: user.response })
                    dispatch({ type: "SET_SONG_LOADING_FILTER", payload: false })
                }).take(1).subscribe()
        }
        if (playlists.loading && (!NAV.reduxPlaylistsExist || !isProduction())) {
            console.info("firing playlists request")
            AJAX("/playlists", JSON.stringify({ token: token || NAV.LStoken, device: player.current_device }))
                .map((user) => {
                    dispatch({ type: "SET_PLAYLISTS", payload: user.response.items })
                    dispatch({ type: "SET_PLAYLISTS_LOADING_FILTER", payload: false })
                }).take(1).subscribe()
        }
    }
}
