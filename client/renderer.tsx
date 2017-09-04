import * as React from "react"
import * as ReactDOM from "react-dom"
import { AppContainer } from "react-hot-loader"
import getMuiTheme from "material-ui/styles/getMuiTheme"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import { Provider as ReduxProvider } from "react-redux"
import { configureStore, engine, isServer } from "../store/createStore"
import { createBrowserHistory } from "history"
import { BoilTheme } from "../shared/theme"
import { offlineCheck } from "./offline"
import * as storage from "redux-storage"
export const tag = document.getElementById("root")
import * as isEmpty from "lodash/isEmpty"
const history = createBrowserHistory()
const store = configureStore(history)

export const Renderer = (Component) => {
    offlineCheck(store)
    storage.createLoader(engine)(store)
        .then((newState) => {
            /* console.log("sending your ass to " + JSON.stringify(newState.location))*/
            const reduxStorage = JSON.parse(localStorage.getItem("spotify"))
            console.log("==========================================")
            console.log("======LOADING FROM LOCALSTORAGE===========")
            console.log("==========================================")
            console.log("REDUX LOADED:", newState)
            console.log("LOCALSTORAGE:", reduxStorage)
            if (!isServer()) {
                /* if (window.matchMedia('(display-mode: fullscreen)').matches) {*/
                if (!isEmpty(newState.storage)) {
                    if ((window as any).__PRODUCTION__) {
                        store.dispatch(newState.storage)
                    }
                }
            }
            console.log("==========================================")
        })
        .catch((error) => {
            console.log("Failed to load previous state")
            console.log(error)
        })
    const boilMUI = getMuiTheme(BoilTheme, { userAgent: navigator.userAgent })
    ReactDOM.render(
        <ReduxProvider store={store}>
            <MuiThemeProvider muiTheme={boilMUI} >
                <AppContainer>
                    <Component userAgent={navigator.userAgent} />
                </AppContainer>
            </MuiThemeProvider>
        </ReduxProvider>, tag)
}
