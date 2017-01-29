declare const module, require, window, USER: any;
import * as React from "react";
import routes from "./app/routes";
import {AppContainer} from "react-hot-loader";
import * as injectTapEventPlugin from "react-tap-event-plugin";
import {render} from "react-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {allReducers, allReducersInitial} from "./reducers/index";
import Router from "react-router/BrowserRouter";
import WithStylesContext from "./shared/stylesComponent";
import {StyleRoot} from "radium";

injectTapEventPlugin();
const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(allReducers, allReducersInitial, reduxDevTools);
const theme = getMuiTheme({}, {userAgent: navigator.userAgent});
const BrowserRouter = ({router}) => (<Router>{router}</Router>);
const rootEl = document.getElementById("container");

const app = NextApp => {
    return (
        <AppContainer>
            <WithStylesContext onInsertCss={styles => styles._insertCss()}>
                <MuiThemeProvider muiTheme={theme}>
                    <Provider store={store}>
                        <BrowserRouter router={NextApp}/>
                    </Provider>
                </MuiThemeProvider>
            </WithStylesContext>
        </AppContainer>
    )
};

render(app(routes), rootEl);

if (module.hot) {
    module.hot.accept("./app/routes", () => {
        const NextApp = require("./app/routes.tsx").default;
        render(app(NextApp), rootEl);
    });
}
