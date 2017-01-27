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
declare const module: any;
declare const require: any;
declare const window: any;
injectTapEventPlugin();
declare const USER: string;
const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(allReducers, allReducersInitial, reduxDevTools);
const theme = getMuiTheme({}, {userAgent: navigator.userAgent});


const BrowserRouter = ({router}) => (<Router>{router}</Router>);


render(
    <AppContainer>
        <MuiThemeProvider muiTheme={theme}>
            <Provider store={store}>
                <BrowserRouter router={routes}/>
            </Provider>
        </MuiThemeProvider>
    </AppContainer>, document.getElementById("container"));

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept("./app/routes", () => {
        const NextApp = require("./app/routes.tsx").default;
        render(
            <AppContainer>
                <MuiThemeProvider muiTheme={getMuiTheme({userAgent:  USER})}>
                    <Provider store={store}>
                        <BrowserRouter router={NextApp}/>
                    </Provider>
                </MuiThemeProvider>
            </AppContainer>, document.getElementById("container"));
    });
}
