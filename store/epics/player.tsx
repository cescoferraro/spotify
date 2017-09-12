import { Observable } from "rxjs/Observable"
import "rxjs/add/observable/of"
import "rxjs/add/observable/merge"
import { WarningToast } from "../../shared/toastr"
import { PLAYER_STATUS } from "../constants";
import { AJAX } from "../../shared/ajax";

export const playerEpic = (action$, store) => {
    let token
    return (
        action$
            .ofType(PLAYER_STATUS)
            .mergeMap((action) => {
                token = action.payload.token
                const { song } = action.payload
                const { player } = store.getState()
                return AJAX("/player", { token, device: player.current_device })
            })
            .catch((err, caught) => { return Observable.of(1) })
            .mergeMap((now) => {
                const current_device = store.getState().player.current_device
                if (now.response !== undefined) {
                    const { player } = store.getState()
                    const activeDevice = player.devices.filter((device) => { return device.is_active })
                    const payload = {
                        devices: now.response.devices,
                        ...now.response.state,
                        current_device:
                        now.response.state.device.id ?
                            now.response.state.device.id
                            : ""
                    }
                    return (Observable.merge(
                        Observable.of({ type: "SET_NOW", payload }),
                        Observable.of({ type: "NOW_SUCCESS" })
                    ))
                } else {
                    WarningToast()
                    return (Observable.merge(
                        Observable.of({ type: "HOME" })
                    ))
                }
            })
    )
}
