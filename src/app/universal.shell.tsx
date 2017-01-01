import * as React from "react";

export default class UniversalShell extends React.Component <any, any> {

    render() {
        return (<html lang="en">
        <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>Untitled</title>
            <link rel="stylesheet" href="css/styles.css" />
        </head>
        <body>
        { /* insert the content as a string so that it can be rendered separate with its own checksum for proper server-side rendering */ }
        <div id="container" dangerouslySetInnerHTML={ {__html: this.props.content} } />
        <script src="js/app.bundle.js"></script>
        </body>
        </html>);
    }

}

