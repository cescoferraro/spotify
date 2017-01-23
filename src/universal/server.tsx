import {allReducersInitial} from "../frontend/reducers/index";
declare let require: any;
import *  as injectTapEventPlugin from "react-tap-event-plugin";
import {createStore} from "redux";
import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import UniversalShell from "./universal.shell";
import createServerRenderContext from "react-router/createServerRenderContext";
import ServerRouter from "react-router/ServerRouter";
import routes from "../frontend/app/routes";
import {allReducers} from "../frontend/reducers/index";
import {Provider} from "react-redux";
injectTapEventPlugin();

declare let global: any;
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from 'material-ui/styles/getMuiTheme';


export default  () => (request, response) => {
    const context = createServerRenderContext();
    let markup = ReactDOMServer.renderToString(
        <MuiThemeProvider muiTheme={getMuiTheme({userAgent: request.headers['user-agent']})}>
            <Provider store={createStore(allReducers,allReducersInitial)}>
                <ServerRouter location={request.url} context={context}>
                    {({location}) => routes()}
                </ServerRouter>
            </Provider>
        </MuiThemeProvider>
    );

    const result = context.getResult();

    if (result.redirect) {
        response.redirect(302, `${result.redirect.pathname}${result.redirect.search}`);
    } else {
        if (result.missed) {
            response.status(404);
        } else {
            response.status(200);
        }
        console.log("skdfsdjkf");
        response.send("<!DOCTYPE html>" +
            ReactDOMServer.renderToStaticMarkup(
                <UniversalShell userAgent={request.headers['user-agent']} content={markup}/>
            ));
    }


};
