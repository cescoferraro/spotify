import * as React from "react";
import routes from "./app/routes";
import *  as injectTapEventPlugin from "react-tap-event-plugin";
import {render} from "react-dom";
import BrowserRoot from "./app/browser-root";
import {AppContainer} from "react-hot-loader";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {allReducers, allReducersInitial} from "./reducers/index";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
declare let module: any;
declare let require: any;
declare let window: any;
injectTapEventPlugin();
declare let USER: string;
let store = createStore(allReducers, allReducersInitial, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
let theme = getMuiTheme({}, {userAgent: navigator.userAgent});


render(
    <AppContainer>
        <MuiThemeProvider muiTheme={theme}>
            <Provider store={store}>
                <BrowserRoot routes={routes}/>
            </Provider>
        </MuiThemeProvider>
    </AppContainer>, document.getElementById("container"));


// Hot Module Replacement API
if (module.hot) {

    module.hot.accept("./app/browser-routes", () => {
        const NextApp = require("./app/browser-routes.tsx").default;
        render(
            <AppContainer>
                <MuiThemeProvider muiTheme={getMuiTheme({userAgent:  USER})}>
                    <Provider store={store}>
                        <BrowserRoot routes={NextApp}/>
                    </Provider>
                </MuiThemeProvider>
            </AppContainer>, document.getElementById("container"));
    });
}
