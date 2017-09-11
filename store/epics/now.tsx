import { genericObservable } from "./observables"
import { Observable } from "rxjs/Observable"
import "rxjs/add/observable/of"
import "rxjs/add/observable/merge"
import { WarningToast } from "../../shared/toastr"
import { PLAYER_ACTION } from "../constants";

export const playerEpic = (action$, store) => (
    action$
        .ofType(PLAYER_ACTION)
        .mergeMap(genericObservable({ path: "now", toastr: false }))
        .catch((err, caught) => {
            return Observable.of(1)
        })
        .mergeMap((now) => {
            console.log(now)
            console.log(store.getState())
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
                console.log(payload)
                console.log(store.getState())
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
