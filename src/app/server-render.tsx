declare let require: any;
import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import UniversalShell from "./universal.shell";
import createServerRenderContext from "react-router/createServerRenderContext";
import ServerRouter from "react-router/ServerRouter";
import routes from "./routes";

export default function extracted(url) {
    const context = createServerRenderContext();
    const body = ReactDOMServer.renderToString(
        <ServerRouter
            location={url}
            context={context}>
            {({location}) => routes()}
        </ServerRouter>);
    return "<!DOCTYPE html>" +
        ReactDOMServer
            .renderToStaticMarkup(
                <UniversalShell content={body}>
                </UniversalShell>);
}
