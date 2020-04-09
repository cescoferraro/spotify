import {createBrowserHistory} from "history"
import {isEmpty} from "lodash"
import getMuiTheme from "material-ui/styles/getMuiTheme"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import * as React from "react"
import * as ReactDOM from "react-dom"
import {AppContainer} from "react-hot-loader"
import {Provider as ReduxProvider} from "react-redux"
import * as storage from "redux-storage"
import {BoilTheme} from "./shared/theme"
import {configureStore, engine, isServer} from "./store/createStore"

export const tag = document.getElementById("root");

const history = createBrowserHistory();
const store = configureStore(history);

export const Renderer = (Component: any) => {
    // offlineCheck(store);
    storage.createLoader(engine)(store)
        .then((newState: any) => {
            /* console.log("sending your ass to " + JSON.stringify(newState.location))*/
            if (!isServer()) {
                if (window.matchMedia('(display-mode: fullscreen)').matches) {
                    console.log("This is running as fullscreen.");
                    if (!isEmpty(newState.storage.location)) {
                        store.dispatch(newState.storage.location)
                    }
                }
            }

        });
    /* if ((window as any).__PRODUCTION__) { }*/
    const boilMUI = getMuiTheme(BoilTheme, {userAgent: navigator.userAgent});
    ReactDOM.render(
        <ReduxProvider store={store}>
            <MuiThemeProvider muiTheme={boilMUI}>
                <AppContainer>
                    <Component userAgent={navigator.userAgent}/>
                </AppContainer>
            </MuiThemeProvider>
        </ReduxProvider>, tag)
};
