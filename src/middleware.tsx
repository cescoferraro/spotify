import {allReducersInitial, allReducers} from "./reducers/index";
import *  as injectTapEventPlugin from "react-tap-event-plugin";
import {createStore} from "redux";
import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import UniversalShell from "./components/universal/universal.shell";
import createServerRenderContext from "react-router/createServerRenderContext";
import ServerRouter from "react-router/ServerRouter";
import routes from "./app/routes";
import {Provider} from "react-redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
declare let require: any;
injectTapEventPlugin();

declare let global: any;


export default  () => (request, response) => {
    const context = createServerRenderContext();
    const result = context.getResult();
    if (result.redirect) {
        response.redirect(302, `${result.redirect.pathname}${result.redirect.search}`);
    } else {

        if (result.missed) {
            response.status(404);
        } else {
            response.status(200);
        }
        let markup = ReactDOMServer.renderToString(
            <MuiThemeProvider muiTheme={getMuiTheme({userAgent: request.headers['user-agent']})}>
                <Provider store={createStore(allReducers,allReducersInitial)}>
                    <ServerRouter location={request.url} context={context}>
                        {({location}) => routes()}
                    </ServerRouter>
                </Provider>
            </MuiThemeProvider>
        );
        response.send("<!DOCTYPE html>" +
            ReactDOMServer.renderToStaticMarkup(
                <UniversalShell userAgent={request.headers['user-agent']} content={markup}/>
            ));
    }
};
