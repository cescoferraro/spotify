import * as React from "react";
import { render } from "react-dom";
import * as debug from "debug";
import { AppContainer } from "react-hot-loader";
import routes from "./app/routes";
import Root from "./app/root";
import *  as injectTapEventPlugin from "react-tap-event-plugin";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
declare let module: any;
declare let require: any;
injectTapEventPlugin();


require("./main.scss");
debug.enable("cesco");
debug("cesco")("HELLO");
console.log("hello");

const renderApp = appRoutes => {
    render(
        <AppContainer>
            <MuiThemeProvider>
                <Root routes={appRoutes}/>

            </MuiThemeProvider>
        </AppContainer>,
        document.getElementById("container")
    );
};

renderApp(routes);


// Hot Module Replacement API
if (module.hot) {
    module.hot.accept("./app/routes", () => {
        const NextApp = require("./app/routes").default;
        renderApp(NextApp);
    });
}
