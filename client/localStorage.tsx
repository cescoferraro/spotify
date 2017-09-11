import * as storage from "redux-storage"
import * as isEmpty from "lodash/isEmpty"
import { engine } from "../store/middlewares"
import { isPWA } from "../shared/utils"

export const LoadFROMLocalStorage = (store) => {
    if ((window as any).__PRODUCTION__.production) {
        console.log((window as any).__PRODUCTION__.production)
        storage.createLoader(engine)(store)
            .then((newState) => {
                const reduxStorage = JSON.parse(localStorage.getItem("spotify"))
                console.log("==========================================")
                console.log("======LOADING FROM LOCALSTORAGE===========")
                console.log("==========================================")
                console.log("REDUX LOADED:", newState)
                console.log("LOCALSTORAGE:", reduxStorage)
                if (isPWA()) {
                    if (!isEmpty(newState.storage)) {
                        if ((window as any).__PRODUCTION__) {
                            console.log("sending oyu ass to: ", newState.storage.pathname)
                            store.dispatch(newState.storage)
                        }
                    }
                }
                console.log("==========================================")
            })
            .catch((error) => {
                console.log("==========================================")
                console.log("======LOADING FROM LOCALSTORAGE===========")
                console.log("==========================================")
                console.log("Failed to load previous state")
                console.log("==========================================")
                console.log(error)
            })
    }
}
