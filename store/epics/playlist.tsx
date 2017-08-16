import { Observable } from "rxjs/Observable"
import "rxjs/add/operator/mergeMap"
import "rxjs/add/operator/mapTo"
import "rxjs/add/observable/merge"
import "rxjs/add/observable/of"
import { playPlaylistMap } from "./observables";

export const playPlaylistEpic = (action$, store) => {
    return action$.ofType("PLAY_PLAYLIST")
        .mergeMap(playPlaylistMap())
        .mapTo({ type: "DONE" })
}
