import * as React from "react";
import routes from "./app/routes";
import *  as injectTapEventPlugin from "react-tap-event-plugin";
import {render} from "react-dom";
import BrowserRoot from "./app/browser-root";
import {AppContainer} from "react-hot-loader";
declare let module: any;
declare let require: any;
injectTapEventPlugin();


render(<AppContainer>
    <BrowserRoot routes={routes}/>
</AppContainer>, document.getElementById("container"));


// Hot Module Replacement API
if (module.hot) {
    module.hot.accept("./app/routes", () => {
        const NextApp = require("./app/routes.tsx").default;
        render(<AppContainer>
            <BrowserRoot routes={NextApp}/>
        </AppContainer>, document.getElementById("container"));
    });
}
