import * as React from "react"
import * as ReactDOM from "react-dom"
import { AppContainer } from "react-hot-loader"
import getMuiTheme from "material-ui/styles/getMuiTheme"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import { Provider as ReduxProvider } from "react-redux"
import { configureStore } from "../store/createStore"
import { BoilTheme } from "../shared/theme"
import { offlineCheck } from "./offline"
import { LoadFROMLocalStorage } from "./localStorage"

export const tag = document.getElementById("root")


export const Renderer = (Component, store) => {
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
