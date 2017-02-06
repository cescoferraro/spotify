import * as React from "react";
import {ssrBehavior} from "react-md-spinner";

export let HEAD = ({title, css, userAgent}) => {
    return (<head>
        <meta charSet="utf-8"/>
        <link rel="manifest" href="/icons/manifest.json"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>{title}</title>
        <style type="text/css"
               dangerouslySetInnerHTML={ {__html: ssrBehavior.getStylesheetString(userAgent)} }></style>
        <style type="text/css"
               dangerouslySetInnerHTML={ {__html: css.join('')} }></style>

    </head>)
};
