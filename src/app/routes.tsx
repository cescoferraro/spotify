import * as React from "react";
import Match from "react-router/Match";
import Shell from "../components/shell/shell";
import Def from "../components/def/def";

const routes = () => {
    return (<div>
            <Match exactly pattern="/" component={Shell}/>
            <Match pattern="/hello" component={Def}/>
        </div>
    );
};

export default routes;
