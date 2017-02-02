import * as React from "react";


export let BODY = ({content, STATE_IDENTIFIER, state}) => {
    let async = "window." + STATE_IDENTIFIER + "=" + state + ";";
    let type = "text/javascript";
    return <body>
    <div id="container" dangerouslySetInnerHTML={ {__html: content} }/>
    <script type={type} dangerouslySetInnerHTML={{__html:async}}/>
    <script src="vendor.js"/>
    <script src="js/app.bundle.js"/>
    </body>
};
