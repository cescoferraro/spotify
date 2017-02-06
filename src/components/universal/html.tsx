import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import {HEAD} from "./head";
import {BODY} from "./body";


export let HTML = ({css, result,userAgent}) => {

    return <html lang="en">
    <HEAD title={"Spotify API"} userAgent={userAgent} css={css}/>
    <BODY state={require('serialize-javascript')(result.state)}
          STATE_IDENTIFIER={result.STATE_IDENTIFIER}
          content={ReactDOMServer.renderToString(result.appWithAsyncComponents)}/>
    </html>
};

