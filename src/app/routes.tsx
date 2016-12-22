import * as React from "react";
import Match from "react-router/Match";
import Shell from "../components/shell/shell";

const routes = () => {
    return (
        <Match pattern="/" component={Shell} />
    );
};

export default routes;
