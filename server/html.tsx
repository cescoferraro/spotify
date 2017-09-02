import * as React from "react"
import {
    getScripts, getStyles, Helmator, Manifest,
    OneSignalCDN, OneSignalInit, App, Dll, Javascript, BaseStyle, Spinner
} from "./helpers"
import { flushedAssets } from "./flush"
import { ToastrCSS } from "../shared/components/toastrCSS"
import * as serialize from "serialize-javascript"

export const HTML = (
    { clientStats, userAgent, serverStats, outputPath, production, content, store }
) => {
    const assets = flushedAssets(clientStats, outputPath, production)
    const { preload, scripts } = getScripts(assets.scripts, outputPath, production)
    const styles = getStyles(assets.stylesheets, outputPath, production)
    const MyHelmet = Helmator()
    const inner = {
        __html: `window.__PRODUCTION__ = ${serialize(production)}`
    }
    const cssChunks = {
        __html: `window.__CSS_CHUNKS__ = ${serialize(assets.cssHashRaw)}`
    }
    return (
        <html {...MyHelmet.html}>
            <head >
                <Manifest production={production} />
                {MyHelmet.title}
                {MyHelmet.meta}
                {MyHelmet.link}
                {styles}
                {preload}
                <BaseStyle />
                <ToastrCSS />
                <script dangerouslySetInnerHTML={inner} />
                <script dangerouslySetInnerHTML={cssChunks} />
                <Spinner userAgent={userAgent} />
                <OneSignalCDN production={production} />
                <OneSignalInit production={production} />
                <link rel="stylesheet" href="https://raw.githubusercontent.com/bvaughn/react-virtualized/master/source/styles.css" />
            </head>
            <body {...MyHelmet.html}>
                <App content={content} />
                <Dll outputPath={outputPath} />
                <Javascript scripts={scripts} />
            </body>
        </html>
    )
}
