import {allReducersInitial, allReducers} from "./reducers/index";
import *  as injectTapEventPlugin from "react-tap-event-plugin";
import {createStore} from "redux";
import * as React from "react";
import SpotifyApp from "./app";
import * as ReactDOMServer from "react-dom/server";
import UniversalShell from "./components/universal/universal.shell";
import createServerRenderContext from "react-router/createServerRenderContext";
import ServerRouter from "react-router/ServerRouter";
import {Provider} from "react-redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import WithStylesContext from "./shared/stylesComponent";
import {StyleRoot} from "radium";
import {withAsyncComponents} from "react-async-component";
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
        let css = []; // CSS for all rendered React components

        let App =
            <WithStylesContext onInsertCss={styles => css.push(styles._getCss())}>
                <MuiThemeProvider muiTheme={getMuiTheme({userAgent: request.headers['user-agent']})}>
                    <Provider store={createStore(allReducers,allReducersInitial)}>
                        <ServerRouter location={request.url} context={context}>
                            {({location}) => SpotifyApp()}
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
                let SerialState = require('serialize-javascript')(state);
                console.log(SerialState);
                response.send("<!DOCTYPE html>" +
                    ReactDOMServer.renderToStaticMarkup(
                        <UniversalShell css={css}
                                        state={SerialState}
                                        STATE_IDENTIFIER={STATE_IDENTIFIER}
                                        userAgent={request.headers['user-agent']}
                                        content={markup}/>
                    ));
            });


    }
};
