import {allReducersInitial, allReducers} from "./reducers/index";
import *  as injectTapEventPlugin from "react-tap-event-plugin";
import {createStore} from "redux";
import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import UniversalShell from "./components/universal/universal.shell";
import createServerRenderContext from "react-router/createServerRenderContext";
import ServerRouter from "react-router/ServerRouter";
import routes from "./routes";
import {Provider} from "react-redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import WithStylesContext from "./shared/stylesComponent";
import {StyleRoot} from "radium";

import serialize from 'serialize-javascript';
declare let require: any;
injectTapEventPlugin();

import {withAsyncComponents} from 'react-async-component';
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
        let css = []; // CSS for all rendered React components

        let App =
            <WithStylesContext onInsertCss={styles => css.push(styles._getCss())}>
                <MuiThemeProvider muiTheme={getMuiTheme({userAgent: request.headers['user-agent']})}>
                    <Provider store={createStore(allReducers,allReducersInitial)}>
                        <ServerRouter location={request.url} context={context}>
                            {({location}) => routes()}
                        </ServerRouter>
                    </Provider>
                </MuiThemeProvider>
            </WithStylesContext>;


        withAsyncComponents(App)
            .then((result) => {
                const {
                    appWithAsyncComponents,
                    state,
                    STATE_IDENTIFIER
                } = result;

                const markup = ReactDOMServer.renderToString(appWithAsyncComponents);
                console.log(serialize);
                let ser = require('serialize-javascript');
                console.log(ser);
                response.send("<!DOCTYPE html>" +
                    ReactDOMServer.renderToStaticMarkup(
                        <UniversalShell css={css}
                                        state={ser(state)}
                                        STATE_IDENTIFIER={STATE_IDENTIFIER}
                                        userAgent={request.headers['user-agent']}
                                        content={markup}/>
                    ));
            });


    }
};
