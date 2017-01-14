declare let global: any;
declare let require: any;
import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import UniversalShell from "./universal.shell";
import createServerRenderContext from "react-router/createServerRenderContext";
import ServerRouter from "react-router/ServerRouter";
import routes from "../frontend/app/routes";


export default function extracted(request) {
    global.navigator = {
        userAgent: request.headers["user-agent"]
    };
    const context = createServerRenderContext();
    const body = ReactDOMServer.renderToString(
        <ServerRouter location={request.url} context={context}>
            {({location}) => routes()}
        </ServerRouter>
    );
    return "<!DOCTYPE html>" +
        ReactDOMServer.renderToStaticMarkup(
            <UniversalShell content={body}>
            </UniversalShell>
        );
}
